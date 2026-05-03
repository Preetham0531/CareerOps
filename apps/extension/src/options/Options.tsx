import { useEffect, useState } from 'react';

type Settings = {
  autoShowSidebar: 'always' | 'on-detected' | 'off';
  position: 'right' | 'left';
  theme: 'system' | 'light' | 'dark';
  stealthIntegration: boolean;
  domains: { allow: string[]; block: string[] };
};

const DEFAULTS: Settings = {
  autoShowSidebar: 'on-detected',
  position: 'right',
  theme: 'system',
  stealthIntegration: true,
  domains: {
    allow: ['naukri.com', 'linkedin.com', 'indeed.com', 'foundit.in', 'instahyre.com'],
    block: [],
  },
};

export function Options() {
  const [settings, setSettings] = useState<Settings>(DEFAULTS);

  useEffect(() => {
    chrome.storage?.local.get('careerops:settings', (r) => {
      const stored = r['careerops:settings'] as Settings | undefined;
      if (stored) setSettings(stored);
    });
  }, []);

  function patch(p: Partial<Settings>) {
    const next = { ...settings, ...p };
    setSettings(next);
    chrome.storage?.local.set({ 'careerops:settings': next });
  }

  return (
    <main>
      <h1 style={{ fontFamily: 'Fraunces, serif' }}>CareerOps · Extension settings</h1>
      <p style={{ color: '#6F6B62' }}>
        Sidebar behavior, position, theme. Domain whitelist is the source of truth for content
        injection.
      </p>

      <section>
        <h2>Sidebar</h2>
        <label style={{ display: 'block', marginBottom: 8 }}>
          When to show
          <select
            value={settings.autoShowSidebar}
            onChange={(e) => patch({ autoShowSidebar: e.target.value as Settings['autoShowSidebar'] })}
            style={{ marginLeft: 8 }}
          >
            <option value="always">Always</option>
            <option value="on-detected">On detected job pages (default)</option>
            <option value="off">Off (manual toggle only)</option>
          </select>
        </label>
        <label>
          Position
          <select
            value={settings.position}
            onChange={(e) => patch({ position: e.target.value as 'right' | 'left' })}
            style={{ marginLeft: 8 }}
          >
            <option value="right">Right edge</option>
            <option value="left">Left edge</option>
          </select>
        </label>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>Stealth integration</h2>
        <label>
          <input
            type="checkbox"
            checked={settings.stealthIntegration}
            onChange={(e) => patch({ stealthIntegration: e.target.checked })}
          />{' '}
          Honor Stealth mode (gold border on sidebar, hide on current employer's domain)
        </label>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>Whitelisted domains</h2>
        <p style={{ color: '#6F6B62', fontSize: 13 }}>
          Sidebar only injects on these. Add more from the popup's "Use here too" prompt.
        </p>
        <ul>
          {settings.domains.allow.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>Permissions</h2>
        <p style={{ color: '#6F6B62', fontSize: 13 }}>
          activeTab · storage · scripting. Never bookmarks, never history, never cookies.
        </p>
      </section>
    </main>
  );
}
