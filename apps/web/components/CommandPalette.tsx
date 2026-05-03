'use client';

import { useRouter } from 'next/navigation';
import {
  Home,
  Search,
  Settings,
  Sun,
  Moon,
  LogOut,
  Briefcase,
  FileText,
  IndianRupee,
  Calendar,
} from 'lucide-react';
import { ReferralPath, StealthMask } from '@careerops/icons';
import {
  Combobox,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Dialog,
} from '@careerops/ui';

import { useTheme } from '@/lib/use-theme';
import { useAuth } from '@/lib/auth';

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();
  const { toggle: toggleTheme } = useTheme();
  const { signOut } = useAuth();

  const go = (href: string) => {
    onOpenChange(false);
    router.push(href);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content
        size="md"
        showCloseButton={false}
        className="top-[20%] translate-y-0 p-0"
      >
        <Dialog.Title className="sr-only">Command palette</Dialog.Title>
        <Combobox label="Command palette" loop className="border-0 shadow-none">
          <CommandInput placeholder="Search jobs, settings, actions…" autoFocus />
          <CommandList>
            <CommandEmpty>No results.</CommandEmpty>

            <CommandGroup heading="Pages">
              <CommandItem onSelect={() => go('/dashboard')}>
                <Home className="h-4 w-4" /> Home
              </CommandItem>
              <CommandItem onSelect={() => go('/discover')}>
                <Search className="h-4 w-4" /> Discover jobs
              </CommandItem>
              <CommandItem onSelect={() => go('/referrers')}>
                <ReferralPath size={16} /> Referrers
              </CommandItem>
              <CommandItem onSelect={() => go('/evidence')}>
                <FileText className="h-4 w-4" /> Evidence graph
              </CommandItem>
              <CommandItem onSelect={() => go('/salary')}>
                <IndianRupee className="h-4 w-4" /> Salary intel
              </CommandItem>
              <CommandItem onSelect={() => go('/interviews')}>
                <Calendar className="h-4 w-4" /> Interviews
              </CommandItem>
              <CommandItem onSelect={() => go('/negotiations')}>
                <Briefcase className="h-4 w-4" /> Negotiations
              </CommandItem>
            </CommandGroup>

            <CommandGroup heading="Actions">
              <CommandItem
                onSelect={() => {
                  onOpenChange(false);
                  toggleTheme();
                }}
              >
                <Sun className="h-4 w-4 dark:hidden" />
                <Moon className="hidden h-4 w-4 dark:block" />
                Toggle theme
              </CommandItem>
              <CommandItem onSelect={() => go('/settings/stealth')}>
                <StealthMask size={16} /> Toggle stealth mode
              </CommandItem>
              <CommandItem onSelect={() => go('/settings')}>
                <Settings className="h-4 w-4" /> Open settings
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  signOut();
                  go('/');
                }}
              >
                <LogOut className="h-4 w-4" /> Sign out
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Combobox>
      </Dialog.Content>
    </Dialog>
  );
}
