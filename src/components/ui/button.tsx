// @locked
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, HTMLMotionProps, MotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonMotion, transitionSpring } from "@/lib/motion";

export const buttonVariants = cva(
  // Base button styles. No hardcoded colors or radii.
  "relative inline-flex shrink-0 select-none items-center justify-center whitespace-nowrap font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-apyx-purple focus-visible:ring-offset-2 focus-visible:ring-offset-apyx-bg focus-visible:glow-purple overflow-hidden aria-disabled:opacity-50 aria-disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary: "bg-apyx-purple text-white border-none shadow-elevation-2 hover:bg-apyx-purple/90",
        premium: "bg-gradient-brand text-white border-none shadow-elevation-2 glow-purple",
        secondary: "bg-apyx-surface border border-apyx-border text-white hover:border-apyx-border-alt hover:bg-apyx-surface/80",
        outline: "bg-transparent border border-apyx-border text-white hover:bg-apyx-bg-alt/50",
        ghost: "bg-transparent border-transparent text-white hover:bg-apyx-bg-alt",
        glass: "bg-apyx-surface/40 backdrop-blur-md border border-apyx-border/50 text-white hover:bg-apyx-surface/60",
        destructive: "bg-destructive/10 text-destructive border border-destructive/30 hover:bg-destructive/20 hover:border-destructive/50",
        success: "bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 hover:bg-emerald-500/20",
        warning: "bg-amber-500/10 text-amber-500 border border-amber-500/30 hover:bg-amber-500/20",
        link: "bg-transparent text-apyx-purple hover:underline hover:text-apyx-cyan p-0 h-auto",
      },
      size: {
        xs: "h-8 px-3 text-xs [&_svg]:size-3",
        sm: "h-10 px-4 text-sm [&_svg]:size-4",
        md: "h-12 px-6 text-sm [&_svg]:size-4",
        lg: "h-14 px-8 text-base [&_svg]:size-5",
        xl: "h-16 px-10 text-lg [&_svg]:size-6",
        icon: "size-12 [&_svg]:size-5",
      },
      shape: {
        default: "rounded-xl",
        rounded: "rounded-2xl",
        pill: "rounded-full",
        square: "rounded-none",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
      iconOnly: {
        true: "px-0",
        false: "",
      }
    },
    compoundVariants: [
      {
        size: "xs",
        iconOnly: true,
        className: "size-8",
      },
      {
        size: "sm",
        iconOnly: true,
        className: "size-10",
      },
      {
        size: "md",
        iconOnly: true,
        className: "size-12",
      },
      {
        size: "lg",
        iconOnly: true,
        className: "size-14",
      },
      {
        size: "xl",
        iconOnly: true,
        className: "size-16",
      }
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      shape: "default",
      fullWidth: false,
      iconOnly: false,
    },
  }
);

export interface ButtonProps 
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "prefix">, 
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  iconGap?: string | number;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  href?: string;
  render?: React.ReactElement;
  asChild?: boolean;
}

// Since Framer Motion props conflict slightly with standard HTML attributes when combined,
// we use a specific intersection for the motion component.
type MotionButtonProps = HTMLMotionProps<"button"> & ButtonProps;
type MotionLinkProps = HTMLMotionProps<"a"> & ButtonProps;

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      shape,
      fullWidth,
      iconOnly,
      loading = false,
      disabled = false,
      icon,
      iconPosition = "left",
      iconGap,
      leftIcon,
      rightIcon,
      href,
      render,
      type = "button",
      children,
      ...props
    },
    ref
  ) => {
    
    const isDisabled = disabled || loading;
    const actualLeftIcon = leftIcon || (iconPosition === "left" ? icon : null);
    const actualRightIcon = rightIcon || (iconPosition === "right" ? icon : null);
    const gapStyle = iconGap !== undefined ? { gap: typeof iconGap === "number" ? `${iconGap}px` : iconGap } : undefined;
    
    // Motion configurations from the shared token system
    const motionProps: MotionProps = {
      whileHover: !isDisabled && variant !== "link" ? buttonMotion.whileHover : {},
      whileTap: !isDisabled && variant !== "link" ? buttonMotion.whileTap : {},
      transition: transitionSpring,
    };

    const combinedClassName = cn(
      buttonVariants({ variant, size, shape, fullWidth, iconOnly }),
      className
    );

    const content = (
      <>
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="animate-spin size-5" aria-hidden="true" />
          </div>
        ) : null}
        
        {/* We keep the content rendered but invisible during loading to maintain the button's physical width */}
        <span 
          className={cn("flex items-center justify-center", gapStyle ? "" : "gap-2", loading && "invisible")}
          style={gapStyle}
        >
          {actualLeftIcon}
          {!iconOnly && children}
          {actualRightIcon}
        </span>
      </>
    );

    // Backwards compatibility for `@base-ui` render prop pattern
    if (render) {
      const renderElement = render as React.ReactElement<any>;
      return React.cloneElement(renderElement, {
        className: cn(combinedClassName, renderElement.props.className),
        "aria-disabled": isDisabled,
        tabIndex: isDisabled ? -1 : 0,
        ...props,
        onClick: (e: any) => {
          if (isDisabled) {
            e.preventDefault();
            return;
          }
          renderElement.props.onClick?.(e);
          props.onClick?.(e as any);
        },
        children: content
      });
    }

    if (href) {
      // Use Next.js Link but wrap with motion.a for animations
      const MotionLink = motion.create(Link);
      return (
        <MotionLink
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={combinedClassName}
          aria-disabled={isDisabled}
          tabIndex={isDisabled ? -1 : 0}
          {...motionProps}
          {...(props as any)}
          onClick={(e) => {
            if (isDisabled) {
              e.preventDefault();
              return;
            }
            props.onClick?.(e as any);
          }}
        >
          {content}
        </MotionLink>
      );
    }

    return (
      <motion.button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        aria-disabled={isDisabled}
        aria-busy={loading}
        className={combinedClassName}
        {...motionProps}
        {...(props as any)}
        onClick={(e) => {
          if (isDisabled) {
            e.preventDefault();
            return;
          }
          props.onClick?.(e as any);
        }}
      >
        {content}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
