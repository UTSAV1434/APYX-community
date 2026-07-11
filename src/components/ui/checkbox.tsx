"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { Icons } from "@/components/ui/icons";
import { Field, FieldLabel, FieldDescription, FieldErrorMessage, FieldSuccessMessage } from "@/components/ui/input";

export interface CheckboxProps extends Omit<React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, "type" | "checked"> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  validationState?: "default" | "success" | "warning" | "error";
  readOnly?: boolean;
  checked?: boolean | "indeterminate";
}

export const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, label, description, validationState, disabled, readOnly, id, checked, ...props }, ref) => {
    
    // Auto-generate ID if none is provided, needed for linking label
    const generatedId = React.useId();
    const finalId = id || generatedId;
    
    const control = (
      <CheckboxPrimitive.Root
        ref={ref}
        id={finalId}
        disabled={disabled}
        aria-readonly={readOnly}
        checked={checked}
        onClick={(e) => {
          if (readOnly) e.preventDefault();
        }}
        onKeyDown={(e) => {
          if (readOnly && e.key === " ") e.preventDefault();
        }}
        className={cn(
          "peer h-5 w-5 shrink-0 rounded-[6px] border border-apyx-border bg-apyx-surface shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apyx-purple focus-visible:ring-offset-2 focus-visible:ring-offset-apyx-bg disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-apyx-purple data-[state=checked]:border-apyx-purple data-[state=indeterminate]:bg-apyx-purple data-[state=indeterminate]:border-apyx-purple transition-colors duration-200",
          validationState === "error" && "border-apyx-rose focus-visible:ring-apyx-rose",
          validationState === "success" && "border-apyx-emerald focus-visible:ring-apyx-emerald",
          validationState === "warning" && "border-apyx-amber focus-visible:ring-apyx-amber",
          readOnly && "opacity-70 cursor-default",
          className
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-white")}>
          <Icon icon={Icons.check} size="xs" decorative className="hidden peer-data-[state=checked]:block" />
          <Icon icon={Icons.minus} size="xs" decorative className="hidden peer-data-[state=indeterminate]:block" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );

    if (!label && !description) {
      return control;
    }

    return (
      <Field className="flex-row items-start gap-3 w-auto" validationState={validationState}>
        <div className="mt-0.5">{control}</div>
        <div className="flex flex-col gap-1.5 leading-none">
          {label && (
            <FieldLabel
              htmlFor={finalId}
              className={cn("mb-0 cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50")}
            >
              {label}
            </FieldLabel>
          )}
          {description && <FieldDescription>{description}</FieldDescription>}
          <FieldErrorMessage />
          <FieldSuccessMessage />
        </div>
      </Field>
    );
  }
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
