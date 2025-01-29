import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-primary-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-n-1 text-n-5 hover:bg-n-1 dark:bg-n-1 dark:hover:bg-[#1E1E1E]",
        destructive: "bg-s-1 text-primary-1 hover:bg-s-3",
        outline: "border border-n-2 bg-n-5 hover:bg-n-4 hover:text-n-1",
        secondary: "bg-n-3 text-n-1 hover:bg-n-2",
        ghost: "hover:bg-n-4/40 text-n-3 hover:text-n-1",
        link: "text-primary-2 underline-offset-4 hover:underline hover:text-primary-3",
        orange: "bg-orange-500 text-white shadow hover:bg-orange-700",
        green: "bg-green-500 text-white shadow hover:bg-green-600",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);


export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
