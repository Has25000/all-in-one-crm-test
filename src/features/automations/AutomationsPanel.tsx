import { Card, SectionHeader } from "../../components/ui/Card";
import { Toggle } from "../../components/ui/Toggle";
import { useDemoState } from "../../state/DemoState";
import { automationCategoryLabel, automations } from "../../data/automations";
import type { AutomationCategory } from "../../data/types";

const ORDER: AutomationCategory[] = ["cadence", "capture", "meetings", "signals"];

/**
 * The work the system does between conversations.
 *
 * Everything here is a rule Sydney would otherwise be holding in her head — so
 * the panel reads as a list of things she no longer has to remember.
 */
export function AutomationsPanel() {
  const { automationState, toggleAutomation } = useDemoState();
  const activeCount = automations.filter((a) => automationState[a.id]).length;

  return (
    <Card>
      <SectionHeader
        title="Running in the background"
        subtitle={`${activeCount} of ${automations.length} on — the admin you no longer have to remember.`}
      />

      <div className="mt-4 space-y-5">
        {ORDER.map((category) => {
          const group = automations.filter((a) => a.category === category);
          if (group.length === 0) return null;

          return (
            <section key={category}>
              <h3 className="eyebrow mb-2">{automationCategoryLabel[category]}</h3>
              <ul className="space-y-2">
                {group.map((automation) => {
                  const on = automationState[automation.id];
                  return (
                    <li
                      key={automation.id}
                      className="flex items-start gap-3 rounded-[11px] border border-line px-3.5 py-3"
                      style={{ opacity: on ? 1 : 0.62 }}
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-[13.5px] font-semibold text-ink">{automation.name}</p>
                        <p className="mt-0.5 text-[12.5px] leading-snug text-charcoal">
                          {automation.description}
                        </p>
                        <p className="mt-1.5 text-[11.5px] text-muted">{automation.rule}</p>
                        {on && (
                          <p className="mt-1 text-[11.5px] text-[color:var(--asbm-success)]">
                            {automation.status}
                          </p>
                        )}
                      </div>
                      <Toggle
                        checked={on}
                        onChange={() => toggleAutomation(automation.id)}
                        label={automation.name}
                      />
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>

      <p className="mt-4 border-t border-line pt-3 text-[11.5px] text-muted">
        Toggles change this session only. Nothing runs in the concept demo.
      </p>
    </Card>
  );
}
