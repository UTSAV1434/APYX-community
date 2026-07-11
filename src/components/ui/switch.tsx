"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";
import { Field, FieldLabel, FieldDescription, FieldErrorMessage, FieldSuccessMessage } from "@/components/ui/input";

import { cva, type VariantProps } from "class-variance-authority";

const switchVariants = cva(
  "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apyx-purple focus-visible:ring-offset-2 focus-visible:ring-offset-apyx-bg disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-apyx-purple data-[state=unchecked]:bg-apyx-surface-alt",
  {
    variants: {
      size: {
        sm: "h-4 w-7",
        md: "h-6 w-11",
        lg: "h-8 w-14",
      },
      validationState: {
        default: "",
        success: "focus-visible:ring-apyx-emerald",
        warning: "focus-visible:ring-apyx-amber",
        error: "focus-visible:ring-apyx-rose",
      }
    },
    defaultVariants: {
      size: "md",
      validationState: "default",
    }
  }
);

const thumbVariants = cva(
  "pointer-events-none block rounded-full bg-white shadow-sm ring-0 transition-transform data-[state=unchecked]:translate-x-0",
  {
    variants: {
      size: {
        sm: "h-3 w-3 data-[state=checked]:translate-x-3",
        md: "h-5 w-5 data-[state=checked]:translate-x-5",
        lg: "h-7 w-7 data-[state=checked]:translate-x-6",
      }
    },
    defaultVariants: {
      size: "md",
    }
  }
);

export interface SwitchProps extends Omit<React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>, "type">, VariantProps<typeof switchVariants> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  validationState?: "default" | "success" | "warning" | "error";
  readOnly?: boolean;
}

export const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitives.Root>, SwitchProps>(
  ({ className, size, label, description, validationState = "default", disabled, readOnly, id, ...props }, ref) => {
    
    // Auto-generate ID if none is provided, needed for linking label
    const generatedId = React.useId();
    const finalId = id || generatedId;
    
    const control = (
      <SwitchPrimitives.Root
        ref={ref}
        id={finalId}
        disabled={disabled}
        aria-readonly={readOnly}
        onClick={(e) => {
          if (readOnly) e.preventDefault();
        }}
        onKeyDown={(e) => {
          if (readOnly && e.key === " ") e.preventDefault();
        }}
        className={cn(
          switchVariants({ size, validationState }),
          readOnly && "opacity-70 cursor-default",
          className
        )}
        {...props}
      >
        <SwitchPrimitives.Thumb
          className={cn(thumbVariants({ size }))}
        />
      </SwitchPrimitives.Root>
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
Switch.displayName = SwitchPrimitives.Root.displayName;
