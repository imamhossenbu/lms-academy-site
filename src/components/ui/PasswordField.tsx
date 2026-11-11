"use client";

import React, { forwardRef, useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { InputField, type InputFieldProps } from "./InputField";

/** Password input with a lock icon and a show / hide toggle. */
export const PasswordField = forwardRef<HTMLInputElement, Omit<InputFieldProps, "type">>((props, ref) => {
  const [show, setShow] = useState(false);
  return (
    <InputField
      ref={ref}
      type={show ? "text" : "password"}
      leftElement={<Lock className="h-4 w-4" />}
      rightElement={
        <button type="button" onClick={() => setShow((v) => !v)} className="flex h-8 w-8 items-center justify-center rounded-lg text-night-muted hover:bg-night-skeleton hover:text-white" aria-label={show ? "Hide password" : "Show password"}>
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      }
      {...props}
    />
  );
});
PasswordField.displayName = "PasswordField";

export default PasswordField;
