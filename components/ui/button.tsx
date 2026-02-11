import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-bold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-4 active:scale-95 relative",
  {
    variants: {
      variant: {
        locked:
          "bg-neutral-200 text-primary-foreground hover:bg-neutral-200/90 border-neutral-400 border-b-4 active:border-b-0",

        default:
          "bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 border-b-4 border-gray-400 hover:border-b-2 hover:translate-y-0.5 active:border-b-0 active:translate-y-1 shadow-lg hover:shadow-md active:shadow-none dark:from-gray-700 dark:to-gray-800 dark:text-gray-100 dark:border-gray-900",
        primary:
          "bg-gradient-to-b from-blue-400 to-blue-600 text-white border-b-4 border-blue-800 hover:border-b-2 hover:translate-y-0.5 active:border-b-0 active:translate-y-1 shadow-lg shadow-blue-500/50 hover:shadow-md hover:shadow-blue-500/30 active:shadow-none dark:from-blue-500 dark:to-blue-700 dark:border-blue-900",
        "primary-outline":
          "border-4 border-b-[6px] border-blue-500 bg-gradient-to-b from-white to-blue-50 text-blue-600 hover:border-b-4 hover:translate-y-0.5 active:border-b-2 active:translate-y-1 shadow-lg shadow-blue-500/30 hover:shadow-md active:shadow-none dark:from-gray-900 dark:to-blue-950 dark:border-blue-400 dark:text-blue-400",
        secondary:
          "bg-gradient-to-b from-green-400 to-green-600 text-white border-b-4 border-green-800 hover:border-b-2 hover:translate-y-0.5 active:border-b-0 active:translate-y-1 shadow-lg shadow-green-500/50 hover:shadow-md hover:shadow-green-500/30 active:shadow-none dark:from-green-500 dark:to-green-700 dark:border-green-900",
        "secondary-outline":
          "border-4 border-b-[6px] border-green-500 bg-gradient-to-b from-white to-green-50 text-green-600 hover:border-b-4 hover:translate-y-0.5 active:border-b-2 active:translate-y-1 shadow-lg shadow-green-500/30 hover:shadow-md active:shadow-none dark:from-gray-900 dark:to-green-950 dark:border-green-400 dark:text-green-400",
        danger:
          "bg-gradient-to-b from-red-400 to-red-600 text-white border-b-4 border-red-800 hover:border-b-2 hover:translate-y-0.5 active:border-b-0 active:translate-y-1 shadow-lg shadow-red-500/50 hover:shadow-md hover:shadow-red-500/30 active:shadow-none dark:from-red-500 dark:to-red-700 dark:border-red-900",
        "danger-outline":
          "border-4 border-b-[6px] border-red-500 bg-gradient-to-b from-white to-red-50 text-red-600 hover:border-b-4 hover:translate-y-0.5 active:border-b-2 active:translate-y-1 shadow-lg shadow-red-500/30 hover:shadow-md active:shadow-none dark:from-gray-900 dark:to-red-950 dark:border-red-400 dark:text-red-400",
        super:
          "bg-gradient-to-b from-indigo-500 to-indigo-700 text-white border-b-4 border-indigo-900 hover:border-b-2 hover:translate-y-0.5 active:border-b-0 active:translate-y-1 shadow-lg shadow-indigo-600/50 hover:shadow-md hover:shadow-indigo-600/30 active:shadow-none dark:from-indigo-600 dark:to-indigo-800 dark:border-indigo-950",
        "super-outline":
          "border-4 border-b-[6px] border-indigo-600 bg-gradient-to-b from-white to-indigo-50 text-indigo-700 hover:border-b-4 hover:translate-y-0.5 active:border-b-2 active:translate-y-1 shadow-lg shadow-indigo-600/30 hover:shadow-md active:shadow-none dark:from-gray-900 dark:to-indigo-950 dark:border-indigo-400 dark:text-indigo-400",
        ghost:
          "bg-gradient-to-b from-gray-100 to-gray-200 text-gray-700 border-b-4 border-gray-300 hover:border-b-2 hover:translate-y-0.5 active:border-b-0 active:translate-y-1 shadow-lg hover:shadow-md active:shadow-none dark:from-gray-800 dark:to-gray-900 dark:text-gray-300 dark:border-gray-950",
        outline:
          "border-2 border-b-4 bg-gradient-to-b from-white to-gray-50 shadow-lg hover:shadow-md hover:border-b-2 hover:translate-y-0.5 active:border-b active:translate-y-1 active:shadow-none dark:from-gray-900 dark:to-gray-800 dark:border-input",
        link:
          "text-primary underline-offset-4 hover:underline shadow-none border-0",
        sidebar:
          "bg-transparent text-slate-500 border-2 border-transparent hover:bg-slate100 transition-none",
        sidebarOutline:
          "bg-sky-500/15 text-sky-500 border-sky-300 border-2 hover:bg-sky-500/20 transition-none"
      },
      size: {
        default: "h-11 px-6 py-3 has-[>svg]:px-4",
        xs: "h-7 gap-1 rounded-md px-3 text-xs has-[>svg]:px-2 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-9 rounded-md gap-1.5 px-4 has-[>svg]:px-3",
        lg: "h-12 rounded-lg px-8 text-base has-[>svg]:px-6",
        icon: "size-11",
        "icon-xs": "size-7 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-9",
        "icon-lg": "size-12",
        rounded: "rounded-full"
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