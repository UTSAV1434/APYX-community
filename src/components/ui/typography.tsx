import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ────────────────────────────────────────────────────────────────────────────
// SHARED VARIANTS
// ────────────────────────────────────────────────────────────────────────────

const typographyColorVariants = {
  primary: "text-apyx-text",
  secondary: "text-apyx-text-secondary",
  muted: "text-apyx-text-muted",
  brand: "text-gradient",
  success: "text-apyx-emerald",
  warning: "text-apyx-amber",
  destructive: "text-apyx-rose",
  info: "text-apyx-info",
  inherit: "text-inherit",
};

const typographyWeightVariants = {
  light: "font-light",
  regular: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

const typographyAlignVariants = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

const readingWidthVariants = {
  none: "",
  narrow: "max-w-md",
  prose: "max-w-prose",
  wide: "max-w-3xl",
};

const numericVariants = {
  tabular: "tabular-nums",
  lining: "lining-nums",
};

export type TypographyColor = keyof typeof typographyColorVariants;
export type TypographyWeight = keyof typeof typographyWeightVariants;
export type TypographyAlign = keyof typeof typographyAlignVariants;
export type ReadingWidth = keyof typeof readingWidthVariants;
export type NumericTypography = keyof typeof numericVariants;

interface BaseTypographyProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  color?: TypographyColor;
  weight?: TypographyWeight;
  align?: TypographyAlign;
  width?: ReadingWidth;
  truncate?: boolean;
  lines?: 1 | 2 | 3 | 4 | 5 | 6;
  numeric?: NumericTypography;
}

function resolveTypographyClasses(
  props: Pick<BaseTypographyProps, "color" | "weight" | "align" | "width" | "truncate" | "lines" | "numeric">,
  defaults: {
    color?: TypographyColor;
    weight?: TypographyWeight;
    align?: TypographyAlign;
  } = {}
) {
  return cn(
    props.color || defaults.color ? typographyColorVariants[props.color || defaults.color as TypographyColor] : "",
    props.weight || defaults.weight ? typographyWeightVariants[props.weight || defaults.weight as TypographyWeight] : "",
    props.align || defaults.align ? typographyAlignVariants[props.align || defaults.align as TypographyAlign] : "",
    props.width ? readingWidthVariants[props.width] : "",
    props.numeric ? numericVariants[props.numeric] : "",
    props.truncate && !props.lines ? "truncate" : "",
    props.lines === 1 ? "line-clamp-1" :
    props.lines === 2 ? "line-clamp-2" :
    props.lines === 3 ? "line-clamp-3" :
    props.lines === 4 ? "line-clamp-4" :
    props.lines === 5 ? "line-clamp-5" :
    props.lines === 6 ? "line-clamp-6" : ""
  );
}

// ────────────────────────────────────────────────────────────────────────────
// DISPLAY
// ────────────────────────────────────────────────────────────────────────────

const displayVariants = cva("font-heading tracking-tight text-balance", {
  variants: {
    variant: {
      "display-xl": "text-5xl sm:text-6xl md:text-7xl leading-tight",
      "display-lg": "text-4xl sm:text-5xl md:text-6xl leading-tight",
      "display-md": "text-3xl sm:text-4xl md:text-5xl leading-tight",
      "display-sm": "text-2xl sm:text-3xl md:text-4xl leading-tight",
    }
  },
  defaultVariants: {
    variant: "display-md",
  },
});

export interface DisplayProps extends BaseTypographyProps, VariantProps<typeof displayVariants> {}

export const Display = React.forwardRef<HTMLHeadingElement, DisplayProps>(
  ({ className, as: Component = "h1", variant, color, weight, align, width, truncate, lines, numeric, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(displayVariants({ variant }), resolveTypographyClasses({ color, weight, align, width, truncate, lines, numeric }, { color: "primary", weight: "bold" }), className)}
        {...props}
      />
    );
  }
);
Display.displayName = "Display";

// ────────────────────────────────────────────────────────────────────────────
// HEADING
// ────────────────────────────────────────────────────────────────────────────

const headingVariants = cva("font-heading tracking-tight text-balance", {
  variants: {
    variant: {
      h1: "text-4xl sm:text-5xl leading-tight",
      h2: "text-3xl sm:text-4xl leading-tight",
      h3: "text-2xl sm:text-3xl leading-snug",
      h4: "text-xl sm:text-2xl leading-snug",
      h5: "text-lg sm:text-xl leading-snug",
      h6: "text-base sm:text-lg leading-snug",
    }
  },
  defaultVariants: {
    variant: "h2",
  },
});

export interface HeadingProps extends BaseTypographyProps, Omit<VariantProps<typeof headingVariants>, "variant"> {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, as, variant = "h2", color, weight, align, width, truncate, lines, numeric, ...props }, ref) => {
    const Component = as || variant;
    return (
      <Component
        ref={ref}
        className={cn(headingVariants({ variant }), resolveTypographyClasses({ color, weight, align, width, truncate, lines, numeric }, { color: "primary", weight: "semibold" }), className)}
        {...props}
      />
    );
  }
);
Heading.displayName = "Heading";

// ────────────────────────────────────────────────────────────────────────────
// TEXT (Body)
// ────────────────────────────────────────────────────────────────────────────

const textVariants = cva("font-sans", {
  variants: {
    variant: {
      "body-xl": "text-xl leading-relaxed",
      "body-lg": "text-lg leading-relaxed",
      "body-md": "text-base leading-relaxed",
      "body-sm": "text-sm leading-normal",
      "body-xs": "text-xs leading-normal",
    }
  },
  defaultVariants: {
    variant: "body-md",
  },
});

export interface TextProps extends BaseTypographyProps, VariantProps<typeof textVariants> {}

export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, as: Component = "p", variant, color, weight, align, width, truncate, lines, numeric, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(textVariants({ variant }), resolveTypographyClasses({ color, weight, align, width, truncate, lines, numeric }, { color: "primary", weight: "regular" }), className)}
        {...props}
      />
    );
  }
);
Text.displayName = "Text";

// ────────────────────────────────────────────────────────────────────────────
// LABEL
// ────────────────────────────────────────────────────────────────────────────

const labelVariants = cva("font-sans select-none", {
  variants: {
    variant: {
      "label-lg": "text-base leading-none",
      "label-md": "text-sm leading-none",
      "label-sm": "text-xs leading-none",
    }
  },
  defaultVariants: {
    variant: "label-md",
  },
});

export interface LabelProps extends BaseTypographyProps, VariantProps<typeof labelVariants> {
  htmlFor?: string;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, as: Component = "label", variant, color, weight, align, width, truncate, lines, numeric, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(labelVariants({ variant }), resolveTypographyClasses({ color, weight, align, width, truncate, lines, numeric }, { color: "primary", weight: "medium" }), className)}
        {...props}
      />
    );
  }
);
Label.displayName = "Label";

// ────────────────────────────────────────────────────────────────────────────
// CAPTION
// ────────────────────────────────────────────────────────────────────────────

const captionVariants = cva("font-sans", {
  variants: {
    variant: {
      caption: "text-sm text-apyx-text-secondary",
      overline: "text-xs uppercase tracking-wider text-apyx-text-muted font-medium",
      eyebrow: "text-sm uppercase tracking-widest text-apyx-purple font-semibold",
    }
  },
  defaultVariants: {
    variant: "caption",
  },
});

export interface CaptionProps extends BaseTypographyProps, VariantProps<typeof captionVariants> {}

export const Caption = React.forwardRef<HTMLSpanElement, CaptionProps>(
  ({ className, as: Component = "span", variant, color, weight, align, width, truncate, lines, numeric, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(captionVariants({ variant }), resolveTypographyClasses({ color, weight, align, width, truncate, lines, numeric }), className)}
        {...props}
      />
    );
  }
);
Caption.displayName = "Caption";

// ────────────────────────────────────────────────────────────────────────────
// CODE
// ────────────────────────────────────────────────────────────────────────────

export interface CodeProps extends BaseTypographyProps {}

export const Code = React.forwardRef<HTMLElement, CodeProps>(
  ({ className, as: Component = "code", color, weight, align, width, truncate, lines, numeric, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          "font-mono text-sm bg-apyx-surface/50 border border-apyx-border rounded-md px-1.5 py-0.5",
          resolveTypographyClasses({ color, weight, align, width, truncate, lines, numeric }, { color: "primary", weight: "regular" }),
          className
        )}
        {...props}
      />
    );
  }
);
Code.displayName = "Code";

// ────────────────────────────────────────────────────────────────────────────
// BLOCKQUOTE
// ────────────────────────────────────────────────────────────────────────────

export interface BlockquoteProps extends BaseTypographyProps {}

export const Blockquote = React.forwardRef<HTMLQuoteElement, BlockquoteProps>(
  ({ className, as: Component = "blockquote", color, weight, align, width, truncate, lines, numeric, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          "border-l-2 border-apyx-purple pl-6 italic my-6 font-sans text-lg", 
          resolveTypographyClasses({ color, weight, align, width, truncate, lines, numeric }, { color: "secondary", weight: "regular" }),
          className
        )}
        {...props}
      />
    );
  }
);
Blockquote.displayName = "Blockquote";

// ────────────────────────────────────────────────────────────────────────────
// LIST
// ────────────────────────────────────────────────────────────────────────────

const listVariants = cva("font-sans my-6 ml-6", {
  variants: {
    variant: {
      unordered: "list-disc [&>li]:mt-2",
      ordered: "list-decimal [&>li]:mt-2",
      none: "list-none ml-0 [&>li]:mt-2",
    }
  },
  defaultVariants: {
    variant: "unordered",
  },
});

export interface ListProps extends BaseTypographyProps, VariantProps<typeof listVariants> {}

export const List = React.forwardRef<HTMLUListElement | HTMLOListElement, ListProps>(
  ({ className, as, variant, color, weight, align, width, truncate, lines, numeric, ...props }, ref) => {
    const Component = as || (variant === "ordered" ? "ol" : "ul");
    return (
      <Component
        ref={ref as any}
        className={cn(listVariants({ variant }), resolveTypographyClasses({ color, weight, align, width, truncate, lines, numeric }, { color: "primary", weight: "regular" }), className)}
        {...props}
      />
    );
  }
);
List.displayName = "List";

// ────────────────────────────────────────────────────────────────────────────
// DIVIDER TITLE
// ────────────────────────────────────────────────────────────────────────────

export interface DividerTitleProps extends BaseTypographyProps {}

export const DividerTitle = React.forwardRef<HTMLDivElement, DividerTitleProps>(
  ({ className, color = "muted", weight = "semibold", align = "center", width, children, ...props }, ref) => {
    return (
      <div 
        ref={ref}
        className={cn(
          "flex items-center w-full my-8", 
          width ? readingWidthVariants[width] : "",
          className
        )}
        {...props}
      >
        <div className="flex-1 border-t border-apyx-border" />
        <span 
          className={cn(
            "px-4 text-xs uppercase tracking-widest",
            resolveTypographyClasses({ color, weight, align })
          )}
        >
          {children}
        </span>
        <div className="flex-1 border-t border-apyx-border" />
      </div>
    );
  }
);
DividerTitle.displayName = "DividerTitle";

// ────────────────────────────────────────────────────────────────────────────
// GRADIENT TEXT
// ────────────────────────────────────────────────────────────────────────────

export interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  as?: React.ElementType;
}

export const GradientText = React.forwardRef<HTMLSpanElement, GradientTextProps>(
  ({ className, as: Component = "span", ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn("text-gradient", className)}
        {...props}
      />
    );
  }
);
GradientText.displayName = "GradientText";

