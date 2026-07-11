"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { Icons } from "@/components/ui/icons";
import { Caption } from "@/components/ui/typography";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldErrorMessage,
  FieldWarningMessage,
  FieldSuccessMessage,
  useField,
} from "@/components/ui/input";

// ────────────────────────────────────────────────────────────────────────────
// TEXTAREA CONTROL
// ────────────────────────────────────────────────────────────────────────────

const textareaWrapperVariants = cva(
  "flex relative overflow-hidden rounded-xl group transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-apyx-surface border border-apyx-border focus-within:border-apyx-border-alt hover:border-apyx-border-alt",
        filled: "bg-apyx-bg-alt/50 border border-transparent focus-within:bg-apyx-surface focus-within:border-apyx-border hover:bg-apyx-bg-alt",
        glass: "bg-apyx-surface/30 backdrop-blur-md border border-apyx-border/50",
        outline: "bg-transparent border border-apyx-border hover:border-apyx-border-alt",
      },
      size: {
        sm: "px-3 py-2 text-sm",
        md: "px-4 py-3 text-base",
        lg: "px-4 py-4 text-base",
      },
      state: {
        idle: "focus-within:ring-2 focus-within:ring-apyx-purple focus-within:ring-offset-2 focus-within:ring-offset-apyx-bg",
        warning: "border-apyx-amber focus-within:ring-2 focus-within:ring-apyx-amber/50 focus-within:border-apyx-amber",
        error: "border-apyx-rose focus-within:ring-2 focus-within:ring-apyx-rose/50 focus-within:border-apyx-rose",
        success: "border-apyx-emerald focus-within:ring-2 focus-within:ring-apyx-emerald/50 focus-within:border-apyx-emerald",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed bg-apyx-bg-alt pointer-events-none",
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      state: "idle",
      fullWidth: true,
    },
  }
);

export interface TextareaControlProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  variant?: "default" | "filled" | "glass" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  loadingPosition?: "end" | "overlay";
  fullWidth?: boolean;
  counter?: "none" | "characters" | "words";
  autoResize?: boolean;
  resize?: "none" | "vertical" | "both";
  minRows?: number;
  maxRows?: number;
}

export const TextareaControl = React.forwardRef<HTMLTextAreaElement, TextareaControlProps>(
  (
    {
      className,
      variant,
      size = "md",
      loading,
      loadingPosition = "end",
      fullWidth = true,
      counter = "none",
      autoResize,
      resize = "vertical",
      minRows = 3,
      maxRows,
      maxLength,
      disabled,
      readOnly,
      id: providedId,
      onChange,
      value,
      defaultValue,
      rows,
      ...props
    },
    ref
  ) => {
    const field = useField();
    const generatedId = React.useId();
    const id = providedId || field?.id || generatedId;

    const errorState = props["aria-invalid"] || field?.validationState === "error" || field?.error;
    const warningState = field?.validationState === "warning" || field?.warning;
    const successState = field?.validationState === "success" || field?.success;
    const state = errorState ? "error" : warningState ? "warning" : successState ? "success" : "idle";

    // Manage internal value for character/word count if not fully controlled
    const [internalValue, setInternalValue] = React.useState<string>(
      (value as string) || (defaultValue as string) || ""
    );

    const internalRef = React.useRef<HTMLTextAreaElement>(null);

    const mergedRef = React.useCallback(
      (node: HTMLTextAreaElement) => {
        internalRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLTextAreaElement>).current = node;
        }
      },
      [ref]
    );

    const handleAutoResize = React.useCallback(() => {
      if (!autoResize || !internalRef.current) return;
      const el = internalRef.current;
      
      // Reset height to compute actual scrollHeight
      el.style.height = "auto";
      
      const computedStyle = window.getComputedStyle(el);
      const paddingTop = parseFloat(computedStyle.paddingTop);
      const paddingBottom = parseFloat(computedStyle.paddingBottom);
      const lineHeight = parseFloat(computedStyle.lineHeight) || (size === "sm" ? 20 : 24);
      
      const minHeight = (minRows * lineHeight) + paddingTop + paddingBottom;
      const maxHeight = maxRows ? (maxRows * lineHeight) + paddingTop + paddingBottom : Infinity;
      
      const nextHeight = Math.min(Math.max(el.scrollHeight, minHeight), maxHeight);
      
      el.style.height = `${nextHeight}px`;
      el.style.overflowY = el.scrollHeight > maxHeight ? "auto" : "hidden";
    }, [autoResize, minRows, maxRows, size]);

    React.useEffect(() => {
      if (autoResize) {
        handleAutoResize();
      }
    }, [internalValue, autoResize, handleAutoResize]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInternalValue(e.target.value);
      onChange?.(e);
    };
    
    // Determine the resize class based on the 'resize' prop and 'autoResize'
    const resizeClass = autoResize 
      ? "resize-none" 
      : resize === "none" 
        ? "resize-none" 
        : resize === "vertical" 
          ? "resize-y" 
          : "resize";

    return (
      <div className={cn("flex flex-col gap-1.5", fullWidth ? "w-full" : "w-auto", className)}>
        <div
          className={textareaWrapperVariants({
            variant,
            size,
            state,
            disabled,
            fullWidth,
          })}
        >
          <textarea
            {...props}
            id={id}
            ref={mergedRef}
            disabled={disabled}
            readOnly={readOnly || loading}
            maxLength={maxLength}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            rows={rows || minRows}
            className={cn(
              "flex-1 w-full bg-transparent text-apyx-text outline-none placeholder:text-apyx-text-muted disabled:text-apyx-text-muted transition-colors duration-300",
              resizeClass
            )}
            aria-invalid={Boolean(errorState)}
            aria-describedby={cn(field ? `${field.id}-description ${field.id}-error ${field.id}-warning` : undefined)}
          />

          {loading && loadingPosition === "end" && (
            <div className="absolute right-3 top-3 text-apyx-purple">
              <Icon icon={Icons.spinner} size="sm" animate="spin" decorative />
            </div>
          )}
          
          {loading && loadingPosition === "overlay" && (
            <div className="absolute inset-0 flex items-center justify-center bg-apyx-surface/50 backdrop-blur-[2px] rounded-xl z-10 transition-all duration-300">
              <Icon icon={Icons.spinner} size="md" animate="spin" className="text-apyx-purple" decorative />
            </div>
          )}
        </div>

        {/* Counter */}
        {counter !== "none" && (
          <div className="flex justify-end mt-0.5">
            <Caption color="muted">
              {counter === "characters" ? (
                maxLength ? `${internalValue.length} / ${maxLength}` : `${internalValue.length} characters`
              ) : (
                `${internalValue.trim().split(/\\s+/).filter(Boolean).length} words`
              )}
            </Caption>
          </div>
        )}
      </div>
    );
  }
);
TextareaControl.displayName = "TextareaControl";

// ────────────────────────────────────────────────────────────────────────────
// CONVENIENCE WRAPPER
// ────────────────────────────────────────────────────────────────────────────

export interface TextareaProps extends TextareaControlProps {
  label?: string;
  description?: string;
  error?: string | boolean;
  success?: string | boolean;
  warning?: string | boolean;
  validationState?: "default" | "success" | "warning" | "error";
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      description,
      error,
      success,
      warning,
      validationState,
      required,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <Field error={error} success={success} warning={warning} validationState={validationState} className={className}>
        {label && <FieldLabel required={required}>{label}</FieldLabel>}
        <TextareaControl ref={ref} required={required} {...props} />
        <FieldErrorMessage />
        <FieldWarningMessage />
        <FieldSuccessMessage />
        {description && <FieldDescription>{description}</FieldDescription>}
      </Field>
    );
  }
);
Textarea.displayName = "Textarea";
