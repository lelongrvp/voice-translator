import React from "react";
import { type VariantProps } from "class-variance-authority";
import { PlusIcon } from "lucide-react";
import { buttonVariants } from "../lib/button-variants";

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled">,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  startDecorator?: boolean;
  endDecorator?: React.ReactNode;
  disabled?: boolean;
}

function STTButton({
  children,
  variant,
  size,
  fullWidth,
  disabled,
  type = "button",
  onClick,
  className = "",
  startDecorator,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonVariants({
        variant,
        size,
        fullWidth,
        disabled,
        startDecorator,
        class: className,
      })}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      {...props}
    >
      {startDecorator && <PlusIcon className="fill-white" />}
      {children}
      {startDecorator && <PlusIcon />}
    </button>
  );
}

export default STTButton;
