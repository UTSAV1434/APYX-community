"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { Icons, type APYXIcon } from "@/components/ui/icons";
import { Caption, Text } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";

export type ListboxOption = {
  id: string;
  label: string;
  value: string;
  description?: string;
  icon?: APYXIcon;
  badge?: string;
  disabled?: boolean;
  group?: string;
  keywords?: string[];
};

export interface ListboxProps {
  options: ListboxOption[];
  selectionMode?: "single" | "multiple";
  selectedValues?: string[]; // Array of selected values
  onSelect?: (option: ListboxOption) => void;
  
  // States
  activeId?: string | null;
  status?: "idle" | "loading" | "empty" | "error" | "success";
  emptyMessage?: string;
  
  // Grouping
  groupBy?: boolean;
  
  // Render overrides
  renderOption?: (option: ListboxOption, selected: boolean) => React.ReactNode;
  renderEmpty?: () => React.ReactNode;
  
  // Virtualization (Prepared)
  virtualized?: boolean;
  itemHeight?: number;
  overscan?: number;
}

export const Listbox = ({
  options,
  selectionMode = "single",
  selectedValues = [],
  onSelect,
  activeId,
  status = "idle",
  emptyMessage = "No results found.",
  groupBy = false,
  renderOption,
  renderEmpty,
  virtualized = false,
  itemHeight = 40,
  overscan = 5,
}: ListboxProps) => {
  // Simple grouping logic
  const groupedOptions = React.useMemo(() => {
    if (!groupBy) return { "": options };
    
    return options.reduce((acc, opt) => {
      const g = opt.group || "";
      if (!acc[g]) acc[g] = [];
      acc[g].push(opt);
      return acc;
    }, {} as Record<string, ListboxOption[]>);
  }, [options, groupBy]);

  if (status === "loading") {
    return (
      <div className="py-6 flex justify-center text-apyx-text-muted">
        <Icon icon={Icons.spinner} className="animate-spin" />
      </div>
    );
  }
  
  if (status === "error") {
    return (
      <div className="py-6 text-center text-apyx-red">
        <Caption>An error occurred.</Caption>
      </div>
    );
  }

  const hasOptions = options.length > 0;

  if (!hasOptions || status === "empty") {
    return (
      <div className="py-6 text-center text-apyx-text-muted">
        <Caption>{emptyMessage}</Caption>
      </div>
    );
  }

  return (
    <>
      {Object.entries(groupedOptions).map(([group, opts]) => (
        <div key={group || "ungrouped"} className="mb-1 last:mb-0">
          {group && (
            <div className="px-2 py-1.5 text-xs font-semibold text-apyx-text-muted tracking-wider uppercase">
              {group}
            </div>
          )}
          {opts.map((opt) => {
            const isSelected = selectedValues.includes(opt.value);
            const isActive = activeId === opt.id;

            return (
              <div
                key={opt.id}
                id={opt.id}
                role="option"
                aria-selected={isSelected}
                aria-disabled={opt.disabled}
                onClick={() => onSelect?.(opt)}
                className={cn(
                  "relative flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg cursor-pointer transition-colors duration-200 select-none",
                  isActive ? "bg-apyx-surface-alt text-apyx-text" : "text-apyx-text-muted hover:text-apyx-text hover:bg-apyx-surface-alt/50",
                  opt.disabled && "opacity-50 cursor-not-allowed pointer-events-none",
                  isSelected && "bg-apyx-purple/10 text-apyx-purple hover:bg-apyx-purple/20 hover:text-apyx-purple"
                )}
              >
                {renderOption ? (
                  renderOption(opt, isSelected)
                ) : (
                  <div className="flex items-center gap-2.5 flex-1 overflow-hidden">
                    {opt.icon && <Icon icon={Icons[opt.icon]} size="sm" decorative className={isSelected ? "text-apyx-purple" : "text-apyx-text-muted"} />}
                    <div className="flex flex-col flex-1 truncate">
                      <Text variant="body-sm" className={cn("truncate", isSelected && "font-medium")}>
                        {opt.label}
                      </Text>
                      {opt.description && (
                        <Caption color="muted" className="truncate">
                          {opt.description}
                        </Caption>
                      )}
                    </div>
                    {opt.badge && (
                      <Badge variant="glass" size="sm" className="ml-auto">
                        {opt.badge}
                      </Badge>
                    )}
                  </div>
                )}
                
                {isSelected && (
                  <Icon icon={Icons.checkCircle} size="sm" decorative className="text-apyx-purple shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
};
