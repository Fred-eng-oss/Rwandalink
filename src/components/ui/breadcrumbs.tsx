"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center space-x-2 text-sm", className)}
    >
      <Link
        href="/"
        className="flex items-center text-gray-600 transition-colors hover:text-[#1E40AF] dark:text-gray-300 dark:hover:text-[#1E40AF]"
      >
        <Home className="h-4 w-4" />
      </Link>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="h-4 w-4 text-gray-500" />
          {item.href ? (
            <Link
              href={item.href}
              className="text-gray-600 transition-colors hover:text-[#1E40AF] dark:text-gray-300 dark:hover:text-[#1E40AF]"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-gray-900 dark:text-white">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}
