import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-xs font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black disabled:pointer-events-none disabled:opacity-50 cursor-pointer tracking-[0.15em] uppercase",
  {
    variants: {
      variant: {
        default: "bg-black text-white hover:bg-charcoal px-8 py-4",
        outline:
          "border border-black text-black hover:bg-black hover:text-white px-8 py-4 bg-transparent",
        ghost: "hover:bg-warm-gray text-black px-4 py-2 normal-case tracking-normal",
        link: "text-black underline-offset-4 hover:underline p-0 normal-case tracking-normal",
        white: "bg-white text-black hover:bg-warm-gray px-8 py-4",
        subtle: "bg-warm-gray text-black hover:bg-border px-6 py-3",
      },
      size: {
        default: "h-auto",
        sm: "px-5 py-2.5 text-[10px]",
        lg: "px-12 py-5 text-xs",
        icon: "h-10 w-10 p-0",
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
