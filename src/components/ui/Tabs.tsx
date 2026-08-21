import * as RadixTabs from "@radix-ui/react-tabs";
import type { ReactNode } from "react";

export function Tabs({
  tabs,
  defaultValue,
  children,
}: {
  tabs: { value: string; label: string }[];
  defaultValue: string;
  children: ReactNode;
}) {
  return (
    <RadixTabs.Root defaultValue={defaultValue} className="flex min-h-0 flex-1 flex-col">
      <RadixTabs.List className="flex shrink-0 gap-1 border-b border-line px-6">
        {tabs.map((tab) => (
          <RadixTabs.Trigger
            key={tab.value}
            value={tab.value}
            className="relative -mb-px border-b-2 border-transparent px-3 py-2.5 text-[13px] font-medium text-muted transition-colors duration-200 hover:text-ink data-[state=active]:border-[color:var(--asbm-gold)] data-[state=active]:text-ink"
          >
            {tab.label}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
      {children}
    </RadixTabs.Root>
  );
}

export const TabPanel = RadixTabs.Content;
