"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { Icons, type APYXIcon } from "@/components/ui/icons";
import { Caption, Text } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { Surface } from "@/components/ui/surface";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Listbox } from "@/components/ui/listbox";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldErrorMessage,
  FieldWarningMessage,
  FieldSuccessMessage,
  InputControl,
  useField,
} from "@/components/ui/input";

// ────────────────────────────────────────────────────────────────────────────
// TYPES
// ────────────────────────────────────────────────────────────────────────────

export type ComboboxOption = {
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

export interface ComboboxProps {
  // Data
  options: ComboboxOption[];
  value?: string | string[]; // Single or Multiple
  defaultValue?: string | string[];
  onChange?: (value: any) => void;
  onSearchChange?: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  
  // Behavior
  selectionMode?: "single" | "multiple";
  searchable?: boolean;
  clearable?: boolean;
  disabled?: boolean;
  status?: "idle" | "loading" | "empty" | "error" | "success";
  filterStrategy?: "client" | "server" | "custom";
  creatable?: boolean;
  
  // Virtualization (Prepared for future)
  virtualized?: boolean;
  itemHeight?: number;
  overscan?: number;
  
  // UI
  placeholder?: string;
  emptyMessage?: string;
  groupBy?: boolean;
  
  // Renderers
  renderEmpty?: () => React.ReactNode;
  renderOption?: (option: ComboboxOption, selected: boolean) => React.ReactNode;
  renderValue?: (selectedOptions: ComboboxOption[]) => React.ReactNode;
  
  // Aesthetics
  variant?: "default" | "filled" | "glass" | "outline";
  size?: "sm" | "md" | "lg";
  leftIcon?: APYXIcon;
  
  // Field Props
  label?: string;
  description?: string;
  validationState?: "default" | "success" | "warning" | "error";
  error?: string | boolean;
  success?: string | boolean;
  warning?: string | boolean;
  required?: boolean;
  fullWidth?: boolean;
  className?: string;
}

// ────────────────────────────────────────────────────────────────────────────
// COMBOBOX COMPONENT
// ────────────────────────────────────────────────────────────────────────────

export const Combobox = ({
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  onSearchChange,
  onKeyDown,
  selectionMode = "single",
  searchable = true,
  clearable = false,
  disabled = false,
  status = "idle",
  filterStrategy = "client",
  creatable = false,
  virtualized = false,
  itemHeight = 40,
  overscan = 5,
  placeholder = "Select an option...",
  emptyMessage = "No results found.",
  groupBy = false,
  renderEmpty,
  renderOption,
  renderValue,
  variant = "default",
  size = "md",
  leftIcon,
  label,
  description,
  validationState,
  error,
  success,
  warning,
  required,
  fullWidth = true,
  className,
  ref,
  ...props
}: ComboboxProps & { ref?: React.Ref<HTMLInputElement> }) => {
    // 1. State Management
    const [open, setOpen] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState("");
    const [internalValue, setInternalValue] = React.useState<string | string[]>(
      controlledValue !== undefined 
        ? controlledValue 
        : defaultValue !== undefined 
          ? defaultValue 
          : selectionMode === "multiple" ? [] : ""
    );
    const [activeId, setActiveId] = React.useState<string | null>(null);

    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : internalValue;

    const containerRef = React.useRef<HTMLDivElement>(null);
    const listboxRef = React.useRef<HTMLDivElement>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);

    // Sync ref
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    // 2. Filtering Options
    const filteredOptions = React.useMemo(() => {
      if (!searchable || !searchValue || filterStrategy !== "client") return options;
      const lowerSearch = searchValue.toLowerCase();
      return options.filter(
        (opt) =>
          opt.label.toLowerCase().includes(lowerSearch) ||
          opt.value.toLowerCase().includes(lowerSearch) ||
          opt.description?.toLowerCase().includes(lowerSearch) ||
          opt.keywords?.some((k) => k.toLowerCase().includes(lowerSearch))
      );
    }, [options, searchable, searchValue, filterStrategy]);

    // 3. Grouping Options
    const groupedOptions = React.useMemo(() => {
      if (!groupBy) return { "": filteredOptions };
      const groups: Record<string, ComboboxOption[]> = {};
      filteredOptions.forEach((opt) => {
        const group = opt.group || "";
        if (!groups[group]) groups[group] = [];
        groups[group].push(opt);
      });
      return groups;
    }, [filteredOptions, groupBy]);

    // Flat list of visible options for keyboard navigation
    const visibleOptions = React.useMemo(() => {
      return Object.values(groupedOptions).flat();
    }, [groupedOptions]);

    // Reset active item when search changes or opens
    React.useEffect(() => {
      if (open && visibleOptions.length > 0) {
        // If single select, try to focus selected item, else first item
        const selectedOpt = selectionMode !== "multiple" && currentValue 
          ? visibleOptions.find((o) => o.value === currentValue) 
          : null;
        setActiveId(selectedOpt ? selectedOpt.id : visibleOptions[0].id);
      } else {
        setActiveId(null);
      }
    }, [open, searchValue, visibleOptions, currentValue, selectionMode]);

    // Click Outside
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // 4. Handlers
    const handleSelect = React.useCallback(
      (opt: ComboboxOption) => {
        if (opt.disabled) return;
        let newValue: string | string[];

        if (selectionMode === "multiple") {
          const currentArr = (currentValue as string[]) || [];
          if (currentArr.includes(opt.value)) {
            newValue = currentArr.filter((v) => v !== opt.value);
          } else {
            newValue = [...currentArr, opt.value];
          }
        } else {
          newValue = opt.value;
          setOpen(false);
        }

        if (!isControlled) {
          setInternalValue(newValue);
        }
        onChange?.(newValue);
        setSearchValue("");
        
        // Keep focus on input for multiple selections
        if (selectionMode === "multiple") {
          inputRef.current?.focus();
        }
      },
      [currentValue, selectionMode, isControlled, onChange]
    );

    const handleClear = () => {
      const newValue = selectionMode === "multiple" ? [] : "";
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
      setSearchValue("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(e);
      if (e.defaultPrevented) return;

      if (disabled) return;
      
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          if (!open) {
            setOpen(true);
            return;
          }
          if (visibleOptions.length > 0) {
            const idx = activeId ? visibleOptions.findIndex((o) => o.id === activeId) : -1;
            const nextIdx = idx < visibleOptions.length - 1 ? idx + 1 : 0;
            setActiveId(visibleOptions[nextIdx].id);
            listboxRef.current?.querySelector(`#${visibleOptions[nextIdx].id}`)?.scrollIntoView({ block: "nearest" });
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          if (!open) {
            setOpen(true);
            return;
          }
          if (visibleOptions.length > 0) {
            const idx = activeId ? visibleOptions.findIndex((o) => o.id === activeId) : 0;
            const prevIdx = idx > 0 ? idx - 1 : visibleOptions.length - 1;
            setActiveId(visibleOptions[prevIdx].id);
            listboxRef.current?.querySelector(`#${visibleOptions[prevIdx].id}`)?.scrollIntoView({ block: "nearest" });
          }
          break;
        case "Enter":
          e.preventDefault();
          if (open && activeId) {
            const opt = visibleOptions.find((o) => o.id === activeId);
            if (opt) handleSelect(opt);
          } else if (!open) {
            setOpen(true);
          }
          break;
        case "Escape":
          e.preventDefault();
          setOpen(false);
          setSearchValue("");
          break;
        case "Backspace":
          if (selectionMode === "multiple" && !searchValue && Array.isArray(currentValue) && currentValue.length > 0) {
            // Remove last selected item
            const newValue = [...currentValue];
            newValue.pop();
            if (!isControlled) setInternalValue(newValue);
            onChange?.(newValue);
          }
          break;
      }
    };

    // 5. Render Helpers
    const selectedOptions = React.useMemo(() => {
      if (selectionMode === "multiple") {
        const arr = (currentValue as string[]) || [];
        return arr.map((v) => options.find((o) => o.value === v)).filter(Boolean) as ComboboxOption[];
      } else {
        const opt = options.find((o) => o.value === currentValue);
        return opt ? [opt] : [];
      }
    }, [currentValue, selectionMode, options]);

    const inputValue = React.useMemo(() => {
      if (searchable && open) return searchValue;
      if (selectionMode !== "multiple" && selectedOptions.length > 0) return selectedOptions[0].label;
      return "";
    }, [searchable, open, searchValue, selectionMode, selectedOptions]);

    const prefix = React.useMemo(() => {
      if (selectionMode === "multiple" && selectedOptions.length > 0) {
        return (
          <div className="flex items-center gap-1.5 max-w-[200px] overflow-x-auto no-scrollbar pointer-events-auto shrink-0">
            {selectedOptions.map((opt) => (
              <Badge 
                key={opt.id} 
                variant="brand" 
                size="sm" 
                className="whitespace-nowrap"
                removable={!disabled}
                onRemove={(e) => { 
                  e.stopPropagation(); 
                  handleSelect(opt); 
                }}
              >
                {opt.label}
              </Badge>
            ))}
          </div>
        );
      }
      return null;
    }, [selectionMode, selectedOptions, handleSelect, disabled]);

    return (
      <Field error={error} success={success} warning={warning} validationState={validationState} className={className}>
        {label && <FieldLabel required={required}>{label}</FieldLabel>}
        
        <div ref={containerRef} className={cn("relative", fullWidth ? "w-full" : "w-auto")}>
          <div onClick={() => !disabled && setOpen(true)} className="cursor-text">
            <InputControl
              ref={inputRef}
              type="text"
              variant={variant}
              size={size}
              fullWidth={fullWidth}
              disabled={disabled}
              loading={status === "loading"}
              placeholder={selectionMode === "multiple" && selectedOptions.length > 0 ? "" : placeholder}
              leftIcon={leftIcon}
              rightIcon={open ? "chevronUp" : "chevronDown"}
              prefix={prefix}
              value={inputValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                onSearchChange?.(e.target.value);
                if (!open) setOpen(true);
              }}
              onKeyDown={handleKeyDown}
              readOnly={!searchable}
              clearable={clearable && (selectedOptions.length > 0 || !!searchValue)}
              onClear={handleClear}
              role="combobox"
              aria-expanded={open}
              aria-controls="combobox-listbox"
              aria-activedescendant={activeId || undefined}
            />
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: 4, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute z-50 mt-2 w-full origin-top"
              >
                {variant === "glass" ? (
                  <GlassPanel className="p-1 max-h-[300px] overflow-y-auto" id="combobox-listbox" ref={listboxRef} role="listbox">
                    <Listbox 
                      options={visibleOptions} 
                      activeId={activeId} 
                      selectedValues={(currentValue ? Array.isArray(currentValue) ? currentValue : [currentValue] : []) as string[]}
                      onSelect={handleSelect}
                      emptyMessage={emptyMessage}
                      renderEmpty={renderEmpty}
                      renderOption={renderOption}
                      status={status}
                      virtualized={virtualized}
                      itemHeight={itemHeight}
                      overscan={overscan}
                      selectionMode={selectionMode}
                    />
                  </GlassPanel>
                ) : (
                  <Surface variant="elevated" className="p-1 max-h-[300px] overflow-y-auto border border-apyx-border" id="combobox-listbox" ref={listboxRef} role="listbox">
                    <Listbox 
                      options={visibleOptions} 
                      activeId={activeId} 
                      selectedValues={(currentValue ? Array.isArray(currentValue) ? currentValue : [currentValue] : []) as string[]}
                      onSelect={handleSelect}
                      emptyMessage={emptyMessage}
                      renderEmpty={renderEmpty}
                      renderOption={renderOption}
                      status={status}
                      virtualized={virtualized}
                      itemHeight={itemHeight}
                      overscan={overscan}
                      selectionMode={selectionMode}
                    />
                  </Surface>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <FieldErrorMessage />
        <FieldWarningMessage />
        <FieldSuccessMessage />
        {description && <FieldDescription>{description}</FieldDescription>}
      </Field>
    );
  };
Combobox.displayName = "Combobox";
