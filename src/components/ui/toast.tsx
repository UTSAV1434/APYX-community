"use client";

import * as React from "react";
import { Toaster as Sonner, toast as sonnerToast, type ExternalToast } from "sonner";
import { Icon } from "@/components/ui/icon";
import { Icons } from "@/components/ui/icons";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark" // APYX assumes a dark theme based on the Surface token aesthetics
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-apyx-surface group-[.toaster]:text-apyx-text group-[.toaster]:border-apyx-border group-[.toaster]:shadow-lg rounded-xl",
          description: "group-[.toast]:text-apyx-text-muted text-sm",
          title: "group-[.toast]:text-apyx-text group-[.toast]:font-semibold text-sm",
          actionButton:
            "group-[.toast]:bg-apyx-purple group-[.toast]:text-white group-[.toast]:rounded-md font-medium",
          cancelButton:
            "group-[.toast]:bg-apyx-surface-alt group-[.toast]:text-apyx-text-muted group-[.toast]:rounded-md font-medium",
          error: 
            "group-[.toaster]:bg-apyx-rose/10 group-[.toaster]:text-apyx-rose group-[.toaster]:border-apyx-rose/20",
          success: 
            "group-[.toaster]:bg-apyx-emerald/10 group-[.toaster]:text-apyx-emerald group-[.toaster]:border-apyx-emerald/20",
          warning: 
            "group-[.toaster]:bg-apyx-amber/10 group-[.toaster]:text-apyx-amber group-[.toaster]:border-apyx-amber/20",
          info: 
            "group-[.toaster]:bg-apyx-surface-alt group-[.toaster]:text-apyx-text group-[.toaster]:border-apyx-border",
        },
      }}
      icons={{
        success: <Icon icon={Icons.checkCircle} size="sm" className="text-apyx-emerald" decorative />,
        error: <Icon icon={Icons.alertCircle} size="sm" className="text-apyx-rose" decorative />,
        warning: <Icon icon={Icons.alertTriangle} size="sm" className="text-apyx-amber" decorative />,
        info: <Icon icon={Icons.info} size="sm" className="text-apyx-text-muted" decorative />,
        loading: <Icon icon={Icons.spinner} size="sm" className="text-apyx-purple animate-spin" decorative />,
      }}
      {...props}
    />
  );
};

const toast = Object.assign(
  (message: string | React.ReactNode, data?: ExternalToast) => {
    return sonnerToast(message, data);
  },
  {
    success: (message: string | React.ReactNode, data?: ExternalToast) => sonnerToast.success(message, data),
    error: (message: string | React.ReactNode, data?: ExternalToast) => sonnerToast.error(message, data),
    warning: (message: string | React.ReactNode, data?: ExternalToast) => sonnerToast.warning(message, data),
    info: (message: string | React.ReactNode, data?: ExternalToast) => sonnerToast.info(message, data),
    loading: (message: string | React.ReactNode, data?: ExternalToast) => sonnerToast.loading(message, data),
    dismiss: (id?: string | number) => sonnerToast.dismiss(id),
    promise: sonnerToast.promise,
    custom: sonnerToast.custom,
  }
);

export { Toaster, toast };
