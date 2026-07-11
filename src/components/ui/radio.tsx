"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";
import { Field, FieldLabel, FieldDescription, FieldErrorMessage, FieldSuccessMessage } from "@/components/ui/input";

// ────────────────────────────────────────────────────────────────────────────
// RADIO GROUP
// ────────────────────────────────────────────────────────────────────────────

export interface RadioGroupProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {}

export const RadioGroup = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Root>, RadioGroupProps>(
  ({ className, ...props }, ref) => {
    return (
      <RadioGroupPrimitive.Root
        className={cn("grid gap-2", className)}
        {...props}
        ref={ref}
      />
    );
  }
);
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

// ────────────────────────────────────────────────────────────────────────────
// RADIO ITEM
// ────────────────────────────────────────────────────────────────────────────

export interface RadioProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  validationState?: "default" | "success" | "warning" | "error";
  readOnly?: boolean;
}

export const Radio = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Item>, RadioProps>(
  ({ className, label, description, validationState, disabled, readOnly, id, ...props }, ref) => {
    
    // Auto-generate ID if none is provided, needed for linking label
    const generatedId = React.useId();
    const finalId = id || generatedId;
    
    const control = (
      <RadioGroupPrimitive.Item
        ref={ref}
        id={finalId}
        disabled={disabled}
        aria-readonly={readOnly}
        onClick={(e) => {
          if (readOnly) e.preventDefault();
        }}
        onKeyDown={(e) => {
          if (readOnly && (e.key === " " || e.key.startsWith("Arrow"))) e.preventDefault();
        }}
        className={cn(
          "peer h-5 w-5 shrink-0 rounded-full border border-apyx-border bg-apyx-surface shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apyx-purple focus-visible:ring-offset-2 focus-visible:ring-offset-apyx-bg disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-apyx-purple transition-all duration-200 flex justify-center items-center",
          validationState === "error" && "border-apyx-rose focus-visible:ring-apyx-rose",
          validationState === "success" && "border-apyx-emerald focus-visible:ring-apyx-emerald",
          validationState === "warning" && "border-apyx-amber focus-visible:ring-apyx-amber",
          readOnly && "opacity-70 cursor-default",
          className
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
          {/* Inner circle scaling for premium interaction */}
          <div className="h-2.5 w-2.5 rounded-full bg-apyx-purple animate-in zoom-in-50 duration-200" />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
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
Radio.displayName = RadioGroupPrimitive.Item.displayName;
