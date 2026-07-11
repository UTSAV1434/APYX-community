"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const TabsContext = React.createContext<{ 
  value?: string; 
  id?: string;
}>({});

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
>(({ value, defaultValue, onValueChange, ...props }, ref) => {
  const [active, setActive] = React.useState(value || defaultValue);
  const id = React.useId();

  // Sync external value changes
  React.useEffect(() => {
    if (value !== undefined) {
      setActive(value);
    }
  }, [value]);

  return (
    <TabsContext.Provider value={{ value: active, id }}>
      <TabsPrimitive.Root
        ref={ref}
        value={value}
        defaultValue={defaultValue}
        onValueChange={(val) => {
          if (value === undefined) {
            setActive(val);
          }
          onValueChange?.(val);
        }}
        {...props}
      />
    </TabsContext.Provider>
  );
});
Tabs.displayName = TabsPrimitive.Root.displayName;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <div className="relative overflow-x-auto no-scrollbar">
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        "inline-flex items-center justify-start rounded-md bg-apyx-surface p-1 text-apyx-text-muted border border-apyx-border shadow-sm",
        "data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
        className
      )}
      {...props}
    />
  </div>
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    icon?: React.ReactNode;
    badge?: React.ReactNode;
  }
>(({ className, value, icon, badge, children, ...props }, ref) => {
  const context = React.useContext(TabsContext);
  const isActive = context.value === value;

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      value={value}
      className={cn(
        "relative inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-apyx-surface-alt disabled:pointer-events-none disabled:opacity-50",
        "data-[state=active]:text-apyx-text hover:text-apyx-text",
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {icon && <span className="flex items-center justify-center">{icon}</span>}
        {children}
        {badge && <span className="ml-1">{badge}</span>}
      </span>
      {isActive && (
        <motion.div
          layoutId={`apyx-tabs-indicator-${context.id}`}
          className="absolute inset-0 z-0 rounded-sm bg-apyx-surface-alt"
          initial={false}
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </TabsPrimitive.Trigger>
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-apyx-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apyx-surface-alt",
      "data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:zoom-in-95",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
