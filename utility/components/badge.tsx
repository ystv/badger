import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 align-",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-light hover:bg-primary/80",
        warning: "border-transparent bg-warning text-light hover:bg-warning/80",
        danger: "border-transparent bg-danger text-light hover:bg-danger/80",
        success: "border-transparent bg-success text-light hover:bg-success/80",
        purple:
          "border-transparent bg-purple text-light hover:bg-purple/80",
        dark: "border-transparent bg-dark text-light hover:bg-dark/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
