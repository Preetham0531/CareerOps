'use client';

import {
  ReactFlow,
  Background,
  Controls,
  type Edge,
  type Node,
  type NodeProps,
  Position,
  Handle,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { cn } from '@/lib/cn';
import type { ReferrersResponse, ReferrerNode } from '@careerops/api-client';

/**
 * ReferralPathGraph per docs/frontend/23-referral-hijack.md.
 * Custom palette-strict nodes; physics-stable layout (positions are server-set).
 */

interface ReferralGraphProps {
  data: ReferrersResponse;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

// Node renderers — palette-strict, no shadcn defaults
function YouNode({ data }: NodeProps<Node<{ name: string }>>) {
  return (
    <div className="relative flex h-12 w-12 items-center justify-center rounded-pill border-2 border-accent bg-brand text-fg-inverse shadow-md">
      <span className="text-caption font-bold">YOU</span>
      <Handle type="source" position={Position.Bottom} className="!bg-transparent !border-none" />
      <Handle type="target" position={Position.Top} className="!bg-transparent !border-none" />
      <span className="absolute -bottom-5 whitespace-nowrap text-caption text-fg-secondary">
        {data.name}
      </span>
    </div>
  );
}

function MutualNode({ data }: NodeProps<Node<{ name: string; role?: string }>>) {
  return (
    <div className="relative flex h-10 w-10 items-center justify-center rounded-pill border border-border-default bg-bg-surface text-fg-primary">
      <span className="text-caption font-semibold">
        {data.name
          .split(' ')
          .map((p) => p[0])
          .join('')
          .slice(0, 2)
          .toUpperCase()}
      </span>
      <Handle type="source" position={Position.Bottom} className="!bg-transparent !border-none" />
      <Handle type="target" position={Position.Top} className="!bg-transparent !border-none" />
      <span className="absolute -bottom-5 whitespace-nowrap text-caption text-fg-muted">
        {data.name.split(' ')[0]}
      </span>
    </div>
  );
}

function TargetReachableNode({
  data,
  selected,
}: NodeProps<Node<{ name: string; role?: string; score?: number }>>) {
  return (
    <div
      className={cn(
        'relative flex h-12 w-12 items-center justify-center rounded-pill border-2 border-brand bg-accent text-neutral-950 transition-transform',
        selected && 'scale-110 ring-2 ring-accent ring-offset-2 ring-offset-bg-app',
      )}
    >
      <span className="text-caption font-bold">
        {data.name
          .split(' ')
          .map((p) => p[0])
          .join('')
          .slice(0, 2)
          .toUpperCase()}
      </span>
      <Handle type="source" position={Position.Bottom} className="!bg-transparent !border-none" />
      <Handle type="target" position={Position.Top} className="!bg-transparent !border-none" />
      {data.score !== undefined && (
        <span className="absolute -bottom-5 whitespace-nowrap text-caption font-medium tabular text-brand">
          {(data.score * 100).toFixed(0)}
        </span>
      )}
    </div>
  );
}

function TargetUnreachableNode({ data }: NodeProps<Node<{ name: string }>>) {
  return (
    <div className="relative flex h-10 w-10 items-center justify-center rounded-pill border border-dashed border-fg-muted bg-bg-app text-fg-muted">
      <span className="text-caption font-semibold opacity-60">
        {data.name
          .split(' ')
          .map((p) => p[0])
          .join('')
          .slice(0, 2)
          .toUpperCase()}
      </span>
      <Handle type="target" position={Position.Top} className="!bg-transparent !border-none" />
    </div>
  );
}

const nodeTypes = {
  you: YouNode,
  mutual: MutualNode,
  'target-reachable': TargetReachableNode,
  'target-unreachable': TargetUnreachableNode,
};

function toReactFlowNodes(nodes: ReferrerNode[]): Node[] {
  return nodes.map((n) => ({
    id: n.id,
    type: n.kind,
    position: n.position,
    data: { name: n.name, role: n.role, score: n.score },
    selectable: n.kind === 'target-reachable',
  }));
}

function toReactFlowEdges(edges: ReferrersResponse['edges']): Edge[] {
  return edges.map((e) => ({
    id: e.id,
    source: e.source,
    target: e.target,
    style: {
      stroke: 'currentColor',
      strokeWidth: Math.max(1, e.strength * 4),
      strokeDasharray: e.kind === 'dashed' ? '4 4' : undefined,
    },
    className: 'text-border-default',
    label: e.label,
    labelStyle: { fontSize: 10 },
  }));
}

export function ReferralGraph({ data, selectedId, onSelect }: ReferralGraphProps) {
  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={toReactFlowNodes(data.nodes).map((n) => ({
          ...n,
          selected: n.id === selectedId,
        }))}
        edges={toReactFlowEdges(data.edges)}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2, maxZoom: 1.2 }}
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
        nodesConnectable={false}
        onNodeClick={(_e, node) => {
          if (node.type === 'target-reachable') onSelect(node.id);
        }}
        className="bg-bg-app"
      >
        <Background gap={24} size={1} className="!opacity-40" />
        <Controls
          showInteractive={false}
          className="!bg-bg-surface !border !border-border-subtle !rounded-md !shadow-md"
        />
      </ReactFlow>
    </div>
  );
}
