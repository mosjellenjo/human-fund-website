import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Brand-focused variants for this site
        brand: "bg-brand-accent text-black border border-brand-accent hover:bg-white hover:text-black",
        brandOutline:
          "border border-brand-accent bg-transparent text-brand-accent hover:bg-white hover:text-black",
        brandFancy:
          "relative overflow-hidden group text-black border border-brand-accent shadow-[0_8px_24px_rgba(140,255,218,0.25)] bg-gradient-to-b from-[hsl(var(--brand-accent))] to-[rgba(140,255,218,0.9)] hover:from-white hover:to-white hover:text-black hover:ring-2 hover:ring-brand-accent/60 hover:shadow-[0_18px_36px_rgba(140,255,218,0.55)] transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(to_bottom,rgba(255,255,255,0.35),rgba(255,255,255,0.08))] before:opacity-30 group-hover:before:opacity-10 before:transition-opacity",
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
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
