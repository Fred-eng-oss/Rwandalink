import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-[#1E40AF] text-white hover:bg-[#1E3A8A] focus-visible:ring-[#1E40AF] shadow-md hover:shadow-lg",
        secondary: "bg-[#059669] text-white hover:bg-[#047857] focus-visible:ring-[#059669] shadow-md hover:shadow-lg",
        outline: "border-2 border-[#1E40AF] text-[#1E40AF] hover:bg-[#1E40AF] hover:text-white focus-visible:ring-[#1E40AF]",
        ghost: "text-[#1E40AF] hover:bg-[#1E40AF]/10 focus-visible:ring-[#1E40AF]",
        danger: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600 shadow-md hover:shadow-lg",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-5 text-sm",
        lg: "h-12 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
