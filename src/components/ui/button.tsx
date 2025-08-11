
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl hover:scale-105 border border-indigo-500/20",
        destructive: "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl border border-red-500/20",
        outline: "border-2 border-slate-300 dark:border-slate-600 bg-white/90 dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:border-slate-400 dark:hover:border-slate-500 text-slate-900 dark:text-slate-200 backdrop-blur-sm font-semibold shadow-sm hover:shadow-md",
        secondary: "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-200 shadow-md hover:shadow-lg border border-slate-200 dark:border-slate-700 font-semibold",
        ghost: "hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white text-slate-700 dark:text-slate-300 font-semibold",
        link: "text-indigo-600 dark:text-indigo-400 underline-offset-4 hover:underline hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold",
      },
      size: {
        default: "h-11 px-6 py-3",
        sm: "h-9 rounded-md px-4",
        lg: "h-12 rounded-lg px-8",
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
        className={cn(buttonVariants({ variant, size, className }), "btn-animate")}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
