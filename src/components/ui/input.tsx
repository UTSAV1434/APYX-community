"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { Icons, type APYXIcon } from "@/components/ui/icons";
import { Label, Caption, Text } from "@/components/ui/typography";

// ────────────────────────────────────────────────────────────────────────────
// 1. FIELD CONTEXT
// ────────────────────────────────────────────────────────────────────────────

type FieldContextValue = {
  id: string;
  error?: boolean | string;
  success?: boolean | string;
  warning?: boolean | string;
  validationState?: "default" | "success" | "warning" | "error";
};

const FieldContext = React.createContext<FieldContextValue | undefined>(undefined);

export const useField = () => {
  const ctx = React.useContext(FieldContext);
  return ctx; // Optional context, components gracefully fall back if undefined
};

// ────────────────────────────────────────────────────────────────────────────
// 2. FIELD PRIMITIVES
// ────────────────────────────────────────────────────────────────────────────

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  error?: boolean | string;
  success?: boolean | string;
  warning?: boolean | string;
  validationState?: "default" | "success" | "warning" | "error";
}

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ className, error, success, warning, validationState, ...props }, ref) => {
    const id = React.useId();
    return (
      <FieldContext.Provider value={{ id, error, success, warning, validationState }}>
        <div ref={ref} className={cn("flex flex-col gap-1.5 w-full", className)} {...props} />
      </FieldContext.Provider>
    );
  }
);
Field.displayName = "Field";

export const FieldLabel = React.forwardRef<HTMLLabelElement, React.ComponentProps<typeof Label> & { required?: boolean }>(
  ({ className, required, children, ...props }, ref) => {
    const field = useField();
    return (
      <Label ref={ref} htmlFor={field?.id} className={cn("mb-1", field?.error && "text-apyx-rose", className)} {...props}>
        {children}
        {required && <span className="text-apyx-rose ml-1">*</span>}
      </Label>
    );
  }
);
FieldLabel.displayName = "FieldLabel";

export const FieldDescription = React.forwardRef<HTMLParagraphElement, React.ComponentProps<typeof Caption>>(
  ({ className, ...props }, ref) => {
    const field = useField();
    return <Caption ref={ref} id={field ? `${field.id}-description` : undefined} color="muted" className={className} {...props} />;
  }
);
FieldDescription.displayName = "FieldDescription";

export const FieldErrorMessage = React.forwardRef<HTMLParagraphElement, React.ComponentProps<typeof Caption>>(
  ({ className, children, ...props }, ref) => {
    const field = useField();
    const hasError = field?.validationState === "error" || field?.error;
    if (!hasError) return null;
    const message = typeof field?.error === "string" ? field.error : null;
    return (
      <Caption ref={ref} id={field ? `${field.id}-error` : undefined} color="destructive" className={cn("flex items-center gap-1", className)} {...props}>
        <Icon icon={Icons.alertCircle} size="xs" decorative />
        {children || message}
      </Caption>
    );
  }
);
FieldErrorMessage.displayName = "FieldErrorMessage";

export const FieldSuccessMessage = React.forwardRef<HTMLParagraphElement, React.ComponentProps<typeof Caption>>(
  ({ className, children, ...props }, ref) => {
    const field = useField();
    const hasSuccess = field?.validationState === "success" || field?.success;
    if (!hasSuccess || field?.validationState === "error" || field?.error) return null;
    const message = typeof field?.success === "string" ? field.success : null;
    return (
      <Caption ref={ref} color="success" className={cn("flex items-center gap-1", className)} {...props}>
        <Icon icon={Icons.checkCircle} size="xs" decorative />
        {children || message}
      </Caption>
    );
  }
);
FieldSuccessMessage.displayName = "FieldSuccessMessage";

export const FieldWarningMessage = React.forwardRef<HTMLParagraphElement, React.ComponentProps<typeof Caption>>(
  ({ className, children, ...props }, ref) => {
    const field = useField();
    const hasWarning = field?.validationState === "warning" || field?.warning;
    if (!hasWarning || field?.validationState === "error" || field?.error) return null;
    const message = typeof field?.warning === "string" ? field.warning : null;
    return (
      <Caption ref={ref} id={field ? `${field.id}-warning` : undefined} color="warning" className={cn("flex items-center gap-1", className)} {...props}>
        <Icon icon={Icons.alertCircle} size="xs" decorative />
        {children || message}
      </Caption>
    );
  }
);
FieldWarningMessage.displayName = "FieldWarningMessage";

// ────────────────────────────────────────────────────────────────────────────
// 3. INPUT CONTROL
// ────────────────────────────────────────────────────────────────────────────

const inputWrapperVariants = cva(
  "flex items-center relative overflow-hidden rounded-xl group transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-apyx-surface border border-apyx-border focus-within:border-apyx-border-alt hover:border-apyx-border-alt",
        filled: "bg-apyx-bg-alt/50 border border-transparent focus-within:bg-apyx-surface focus-within:border-apyx-border hover:bg-apyx-bg-alt",
        glass: "bg-apyx-surface/30 backdrop-blur-md border border-apyx-border/50",
        outline: "bg-transparent border border-apyx-border hover:border-apyx-border-alt",
      },
      size: {
        sm: "h-9 px-3",
        md: "h-11 px-4",
        lg: "h-14 px-4",
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

export interface InputControlProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "prefix"> {
  variant?: "default" | "filled" | "glass" | "outline";
  size?: "sm" | "md" | "lg";
  leftIcon?: APYXIcon;
  rightIcon?: APYXIcon;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  clearable?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  onClear?: () => void;
  showCharacterCount?: boolean;
}

export const InputControl = React.forwardRef<HTMLInputElement, InputControlProps>(
  (
    {
      className,
      type = "text",
      variant,
      size = "md",
      leftIcon,
      rightIcon,
      prefix,
      suffix,
      clearable,
      loading,
      fullWidth = true,
      showCharacterCount,
      maxLength,
      disabled,
      readOnly,
      id: providedId,
      onChange,
      onClear,
      value,
      defaultValue,
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

    const [showPassword, setShowPassword] = React.useState(false);
    
    // Manage internal value for character count and clearability if not fully controlled
    const [internalValue, setInternalValue] = React.useState<string>(
      (value as string) || (defaultValue as string) || ""
    );
    const hasValue = internalValue.length > 0;
    
    const internalRef = React.useRef<HTMLInputElement>(null);

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInternalValue(e.target.value);
      onChange?.(e);
    };

    const handleClear = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (internalRef.current) {
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          "value"
        )?.set;
        nativeInputValueSetter?.call(internalRef.current, "");
        const event = new Event("input", { bubbles: true });
        internalRef.current.dispatchEvent(event);
      }
      setInternalValue("");
      onClear?.();
      internalRef.current?.focus();
    };

    const inputType = type === "password" ? (showPassword ? "text" : "password") : type;
    const isPassword = type === "password";

    return (
      <div className={cn("flex flex-col gap-1.5", fullWidth ? "w-full" : "w-auto", className)}>
        <div 
          className={inputWrapperVariants({ 
            variant, 
            size, 
            state,
            disabled, 
            fullWidth 
          })}
        >
          {leftIcon && (
            <div className="pr-2 text-apyx-text-muted flex items-center justify-center shrink-0">
              <Icon icon={Icons[leftIcon]} size={size === "sm" ? "sm" : "md"} decorative />
            </div>
          )}
          
          {prefix && (
            <div className="pr-2 text-apyx-text-muted flex items-center justify-center shrink-0 font-medium">
              <Text as="span" variant={size === "sm" ? "body-sm" : "body-md"} color="muted">
                {prefix}
              </Text>
            </div>
          )}

          <input
            {...props}
            id={id}
            ref={mergedRef}
            type={inputType}
            disabled={disabled}
            readOnly={readOnly || loading}
            maxLength={maxLength}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            className={cn(
              "flex-1 w-full h-full bg-transparent text-apyx-text outline-none placeholder:text-apyx-text-muted disabled:text-apyx-text-muted transition-colors duration-300",
              size === "sm" ? "text-sm" : "text-base",
            )}
            aria-invalid={Boolean(errorState)}
            aria-describedby={cn(
              field ? `${field.id}-description ${field.id}-error` : undefined
            )}
          />

          <div className="flex items-center shrink-0 pl-1 gap-1">
            {clearable && hasValue && !disabled && !readOnly && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1 rounded-md text-apyx-text-muted hover:text-apyx-text hover:bg-apyx-surface-alt transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-apyx-purple"
                aria-label="Clear input"
              >
                <Icon icon={Icons.close} size="sm" decorative />
              </button>
            )}

            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-1.5 rounded-md text-apyx-text-muted hover:text-apyx-text hover:bg-apyx-surface-alt transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-apyx-purple"
                aria-label={showPassword ? "Hide password" : "Show password"}
                disabled={disabled}
              >
                <Icon icon={showPassword ? Icons.eyeOff : Icons.eye} size="sm" decorative={false} aria-label="Toggle password visibility" />
              </button>
            )}

            {loading && (
              <div className="px-1 text-apyx-purple flex items-center justify-center">
                <Icon icon={Icons.spinner} size="sm" animate="spin" decorative />
              </div>
            )}

            {rightIcon && !loading && !isPassword && (
              <div className="pl-1 text-apyx-text-muted flex items-center justify-center">
                <Icon icon={Icons[rightIcon]} size={size === "sm" ? "sm" : "md"} decorative />
              </div>
            )}
            
            {suffix && (
              <div className="pl-2 text-apyx-text-muted flex items-center justify-center font-medium">
                <Text as="span" variant={size === "sm" ? "body-sm" : "body-md"} color="muted">
                  {suffix}
                </Text>
              </div>
            )}
          </div>
        </div>

        {/* Optional character count */}
        {showCharacterCount && maxLength && (
          <div className="flex justify-end mt-0.5">
            <Caption color="muted">
              {internalValue.length} / {maxLength}
            </Caption>
          </div>
        )}
      </div>
    );
  }
);
InputControl.displayName = "InputControl";

// ────────────────────────────────────────────────────────────────────────────
// 4. CONVENIENCE WRAPPER
// ────────────────────────────────────────────────────────────────────────────

export interface InputProps extends InputControlProps {
  label?: string;
  description?: string;
  error?: string | boolean;
  success?: string | boolean;
  warning?: string | boolean;
  validationState?: "default" | "success" | "warning" | "error";
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
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
        <InputControl ref={ref} required={required} {...props} />
        <FieldErrorMessage />
        <FieldWarningMessage />
        <FieldSuccessMessage />
        {description && <FieldDescription>{description}</FieldDescription>}
      </Field>
    );
  }
);
Input.displayName = "Input";
