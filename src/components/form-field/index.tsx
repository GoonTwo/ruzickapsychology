import type { ComponentProps } from "react";
import { cn } from "@/lib/class-names";
import styles from "./styles.module.css";

export function Field({ className, ...props }: ComponentProps<"div">) {
  return (
    <div data-slot="field" className={cn(styles.field, className)} {...props} />
  );
}

export function FieldLabel({
  className,
  visuallyHidden = false,
  ...props
}: {
  visuallyHidden?: boolean;
} & ComponentProps<"label">) {
  return (
    <label
      data-slot="field-label"
      className={cn(
        styles.label,
        visuallyHidden && styles.visuallyHidden,
        className,
      )}
      {...props}
    />
  );
}

export function FieldDescription({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn(styles.description, className)}
      {...props}
    />
  );
}

export function FieldError({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="field-error"
      role="alert"
      className={cn(styles.error, className)}
      {...props}
    />
  );
}

export function Input({ className, ...props }: ComponentProps<"input">) {
  return (
    <input
      data-slot="input"
      className={cn(styles.control, className)}
      {...props}
    />
  );
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(styles.control, className)}
      {...props}
    />
  );
}
