"use client"

import * as React from "react"
import { Avatar as FlowbiteAvatar } from 'flowbite-react'

import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof FlowbiteAvatar>
>(({ className, ...props }, ref) => (
  <FlowbiteAvatar
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
Avatar.displayName = "Avatar"

const AvatarImage = React.forwardRef<
  HTMLImageElement,
  React.ComponentPropsWithoutRef<"img">
>(({ className, src, alt = "", ...props }, ref) => (
  <FlowbiteAvatar
    img={{ 
      src,
      alt,
      className: cn("aspect-square h-full w-full", className),
      ref,
      ...props
    }}
  />
))
AvatarImage.displayName = "AvatarImage"

const AvatarFallback = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, children, ...props }, ref) => (
  <FlowbiteAvatar
    ref={ref}
    placeholderInitials={children?.toString()}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = "AvatarFallback"

export { Avatar, AvatarImage, AvatarFallback }
