import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "font-medium rounded transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer",
  {
    variants: {
      variant: {
        primary: "bg-brand hover:bg-brand-hover enabled:text-white",
        secondary: "bg-brand-soft hover:bg-brand-soft-hover enabled:text-brand",
        link: "bg-transparent enabled:text-brand",
      },
      size: {
        sm: "py-1 px-3 text-sm",
        md: "py-2 px-4 text-base",
        lg: "py-3 px-5 text-lg",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
      disabled: {
        true: "opacity-70 cursor-not-allowed",
        false: "",
      },
      startDecorator: {
        true: "gap-4",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "link",
        size: ["sm", "md", "lg"],
        class: "p-0",
      },
      {
        variant: "primary",
        disabled: true,
        class:
          "bg-neutral-1 text-neutral-2 hover:bg-neutral-1 hover:text-neutral-2",
      },
      {
        variant: ["secondary", "link"],
        disabled: true,
        class: "bg-white text-neutral-2 hover:bg-white hover:text-neutral-2",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
      disabled: false,
    },
  }
);
