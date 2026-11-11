import React, { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  error?: string;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  containerClassName?: string;
}

/** Labelled text input with an optional icon / trailing control and a field-level error below. */
export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(({ label, error, leftElement, rightElement, id, className, containerClassName, ...props }, ref) => (
  <div className={cn("w-full", containerClassName)}>
    {label && (
      <label htmlFor={id} className="mb-1.5 block select-none body-sm-medium text-primary-400">
        {label}
      </label>
    )}
    <div className="relative">
      <input
        ref={ref}
        id={id}
        aria-invalid={!!error}
        aria-describedby={error && id ? `${id}-error` : undefined}
        className={cn(
          "h-12 w-full rounded-xl border bg-white py-2 body-regular text-primary-500 outline-none transition-all placeholder:text-primary-300 focus:border-accent focus:ring-4 focus:ring-accent-10",
          error ? "border-red bg-red-14" : "border-dash",
          leftElement ? "pl-11" : "pl-4",
          rightElement ? "pr-11" : "pr-4",
          className,
        )}
        {...props}
      />
      {leftElement && <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-primary-300">{leftElement}</div>}
      {rightElement && <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-primary-300">{rightElement}</div>}
    </div>
    {error && (
      <p id={id ? `${id}-error` : undefined} className="mt-1.5 body-xsm-regular text-red">
        {error}
      </p>
    )}
  </div>
));
InputField.displayName = "InputField";

export default InputField;
