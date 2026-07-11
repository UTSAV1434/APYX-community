"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { APYXIcon } from "@/components/ui/icons";
import { Field, InputControl } from "@/components/ui/input";
import { Combobox, ComboboxOption } from "@/components/ui/combobox";

// ────────────────────────────────────────────────────────────────────────────
// TYPES
// ────────────────────────────────────────────────────────────────────────────

export type SearchSuggestion = string | { label: string; value: string };

export interface SearchInputProps {
  // Data
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  onSearchStart?: () => void;
  onSearchComplete?: () => void;
  onSearchError?: (err?: any) => void;
  
  debounceDelay?: number;
  loading?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  clearable?: boolean;
  autoFocus?: boolean;
  
  // Aesthetics
  fullWidth?: boolean;
  variant?: "default" | "filled" | "glass" | "minimal";
  size?: "sm" | "md" | "lg";
  leftIcon?: APYXIcon;
  rightIcon?: APYXIcon;
  className?: string;
  
  // Keyboard & Actions
  shortcut?: React.ReactNode;
  showShortcut?: boolean;
  openCommandPalette?: () => void;
  
  // Suggestions
  suggestions?: SearchSuggestion[];
  recentSearches?: SearchSuggestion[];
  showSuggestions?: boolean;
  showRecentSearches?: boolean;
  renderEmpty?: () => React.ReactNode;
  renderOption?: (option: ComboboxOption, selected: boolean) => React.ReactNode;
  selectionMode?: "single" | "multiple";
}

// ────────────────────────────────────────────────────────────────────────────
// HOOKS
// ────────────────────────────────────────────────────────────────────────────

function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    if (delay === undefined || delay <= 0) {
      setDebouncedValue(value);
      return;
    }
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// ────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ────────────────────────────────────────────────────────────────────────────

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      placeholder = "Search...",
      value,
      defaultValue,
      onChange,
      onSearch,
      onClear,
      onSearchStart,
      onSearchComplete,
      onSearchError,
      debounceDelay = 0,
      loading,
      disabled,
      readOnly,
      clearable = true,
      autoFocus,
      fullWidth = true,
      variant = "default",
      size = "md",
      leftIcon = "search",
      rightIcon,
      className,
      shortcut,
      showShortcut,
      openCommandPalette,
      suggestions = [],
      recentSearches = [],
      showSuggestions = false,
      showRecentSearches = false,
      renderEmpty,
      renderOption,
      selectionMode = "single",
    },
    ref
  ) => {
    const internalRef = React.useRef<HTMLInputElement>(null);
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = React.useState(
      value !== undefined ? value : defaultValue !== undefined ? defaultValue : ""
    );

    const currentValue = isControlled ? value : internalValue;
    const debouncedValue = useDebounce(currentValue, debounceDelay);

    // Track previous debounced value to trigger onSearch
    const prevDebouncedRef = React.useRef(debouncedValue);
    React.useEffect(() => {
      if (debounceDelay > 0 && debouncedValue !== prevDebouncedRef.current) {
        prevDebouncedRef.current = debouncedValue;
        if (debouncedValue) {
          onSearchStart?.();
          try {
            onSearch?.(debouncedValue);
            onSearchComplete?.();
          } catch (e) {
            onSearchError?.(e);
          }
        }
      }
    }, [debouncedValue, debounceDelay, onSearch, onSearchStart, onSearchComplete, onSearchError]);

    // Notice: Global keyboard listeners for shortcuts are now handled by the parent
    // to provide maximum flexibility since `shortcut` is just a ReactNode.
    const mergedRef = React.useCallback(
      (node: HTMLInputElement) => {
        internalRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLInputElement>).current = node;
        }
      },
      [ref]
    );

    const handleInputChange = (val: string) => {
      if (!isControlled) setInternalValue(val);
      onChange?.(val);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && currentValue) {
        e.preventDefault();
        onSearchStart?.();
        try {
          onSearch?.(currentValue);
          onSearchComplete?.();
        } catch (error) {
          onSearchError?.(error);
        }
      }
    };

    const handleClear = () => {
      if (!isControlled) setInternalValue("");
      onChange?.("");
      onClear?.();
      onSearch?.("");
      internalRef.current?.focus();
    };

    const hasSuggestions = showSuggestions && suggestions.length > 0;
    const hasRecent = showRecentSearches && recentSearches.length > 0;
    const useCombobox = hasSuggestions || hasRecent;

    // Build Prefix/Suffix for Shortcut
    const shortcutSuffix = showShortcut && shortcut ? (
      <div className="hidden sm:flex items-center justify-center px-1.5 h-5 rounded border border-apyx-border bg-apyx-surface-alt text-[10px] font-medium text-apyx-text-muted select-none mr-1">
        {shortcut}
      </div>
    ) : null;

    if (useCombobox) {
      // Map suggestions and recent searches to ComboboxOptions
      const formatOptions = (items: SearchSuggestion[], groupName: string): ComboboxOption[] => 
        items.map((item) => {
          if (typeof item === "string") {
            return { id: `${groupName}-${item}`, label: item, value: item, group: groupName };
          }
          return { id: `${groupName}-${item.value}`, label: item.label, value: item.value, group: groupName };
        });

      const options = [
        ...(hasRecent ? formatOptions(recentSearches, "Recent Searches") : []),
        ...(hasSuggestions ? formatOptions(suggestions, "Suggestions") : [])
      ];

      return (
        <Combobox
          ref={mergedRef}
          options={options}
          groupBy={true}
          value={currentValue}
          onChange={(val: string) => {
             // Fired when an option is selected from dropdown
             handleInputChange(val);
             onSearchStart?.();
             try {
               onSearch?.(val);
               onSearchComplete?.();
             } catch (e) {
               onSearchError?.(e);
             }
          }}
          onSearchChange={handleInputChange}
          onKeyDown={handleKeyDown}
          searchable={true}
          clearable={clearable && !disabled && !readOnly}
          status={loading ? "loading" : "idle"}
          disabled={disabled}
          placeholder={placeholder}
          renderEmpty={renderEmpty}
          renderOption={renderOption}
          selectionMode={selectionMode}
          variant={variant as any}
          size={size}
          leftIcon={leftIcon}
          fullWidth={fullWidth}
          className={className}
        />
      );
    }

    // Standard InputControl
    return (
      <Field className={className} style={{ width: fullWidth ? "100%" : "auto" }}>
        <InputControl
          ref={mergedRef}
          type="text"
          role="searchbox"
          value={currentValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          variant={variant as any}
          size={size}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          clearable={clearable && !!currentValue && !disabled && !readOnly}
          onClear={handleClear}
          loading={loading}
          disabled={disabled}
          readOnly={readOnly}
          autoFocus={autoFocus}
          placeholder={placeholder}
          fullWidth={fullWidth}
          suffix={shortcutSuffix}
        />
      </Field>
    );
  }
);
SearchInput.displayName = "SearchInput";
