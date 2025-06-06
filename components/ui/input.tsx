import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm transition-colors duration-200",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "text-gray-900 placeholder:text-gray-400",
          "focus-visible:outline-none focus-visible:border-[#c6426b] focus-visible:ring-2 focus-visible:ring-[#c6426b] focus-visible:ring-offset-0",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input } 