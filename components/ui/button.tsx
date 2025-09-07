import type * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-rose-600 text-white shadow-lg hover:bg-rose-700 hover:shadow-xl transform hover:scale-105 transition-all duration-200",
        destructive:
          "bg-red-600 text-white shadow-lg hover:bg-red-700 hover:shadow-xl transform hover:scale-105 transition-all duration-200",
        outline:
          "border-2 border-rose-300 bg-white text-rose-700 shadow-sm hover:bg-rose-50 hover:border-rose-400 hover:shadow-md transition-all duration-200",
        secondary:
          "bg-amber-500 text-white shadow-lg hover:bg-amber-600 hover:shadow-xl transform hover:scale-105 transition-all duration-200",
        ghost: "text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-all duration-200",
        link: "text-rose-600 underline-offset-4 hover:underline hover:text-rose-700 transition-colors duration-200",
        success:
          "bg-emerald-600 text-white shadow-lg hover:bg-emerald-700 hover:shadow-xl transform hover:scale-105 transition-all duration-200",
        warning:
          "bg-orange-500 text-white shadow-lg hover:bg-orange-600 hover:shadow-xl transform hover:scale-105 transition-all duration-200",
      },
      size: {
        default: "h-10 px-6 py-2 has-[>svg]:px-4",
        sm: "h-8 rounded-md gap-1.5 px-4 has-[>svg]:px-3",
        lg: "h-12 rounded-lg px-8 has-[>svg]:px-6 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button, buttonVariants }
