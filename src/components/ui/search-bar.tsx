"use client"

import * as React from "react"
import { Search, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchBarProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  onSubmit?: (value: string) => void
  className?: string
}

export function SearchBar({
  placeholder = "Search...",
  value: controlledValue,
  onChange,
  onSubmit,
  className,
}: SearchBarProps) {
  const [internalValue, setInternalValue] = React.useState("")
  const value = controlledValue !== undefined ? controlledValue : internalValue

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    if (controlledValue === undefined) {
      setInternalValue(newValue)
    }
    onChange?.(newValue)
  }

  const handleClear = () => {
    if (controlledValue === undefined) {
      setInternalValue("")
    }
    onChange?.("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(value)
  }

  return (
    <form onSubmit={handleSubmit} className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="h-10 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-10 text-sm text-gray-900 transition-colors placeholder:text-gray-500 focus:border-[#1E40AF] focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/50 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-[#1E40AF]"
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </form>
  )
}
