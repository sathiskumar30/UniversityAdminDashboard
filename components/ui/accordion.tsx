"use client"

import * as React from "react"
import { Accordion as FlowbiteAccordion } from 'flowbite-react'
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface AccordionProps extends React.ComponentProps<typeof FlowbiteAccordion> {
  children: React.ReactNode
  className?: string
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <FlowbiteAccordion ref={ref} className={cn("divide-y divide-gray-200", className)} {...props}>
        {children}
      </FlowbiteAccordion>
    )
  }
)
Accordion.displayName = "Accordion"

interface AccordionItemProps extends React.ComponentProps<typeof FlowbiteAccordion.Panel> {
  children: React.ReactNode
  className?: string
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, children, ...props }, ref) => (
    <FlowbiteAccordion.Panel ref={ref} className={cn("border-b", className)} {...props}>
      {children}
    </FlowbiteAccordion.Panel>
  )
)
AccordionItem.displayName = "AccordionItem"

interface AccordionTriggerProps extends React.ComponentProps<typeof FlowbiteAccordion.Title> {
  children: React.ReactNode
  className?: string
}

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, children, ...props }, ref) => (
    <FlowbiteAccordion.Title
      ref={ref}
      className={cn(
        "flex w-full items-center justify-between py-4 font-medium transition-all hover:underline",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </FlowbiteAccordion.Title>
  )
)
AccordionTrigger.displayName = "AccordionTrigger"

interface AccordionContentProps extends React.ComponentProps<typeof FlowbiteAccordion.Content> {
  children: React.ReactNode
  className?: string
}

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, children, ...props }, ref) => (
    <FlowbiteAccordion.Content
      ref={ref}
      className={cn("overflow-hidden text-sm transition-all", className)}
      {...props}
    >
      <div className={cn("pb-4 pt-0")}>{children}</div>
    </FlowbiteAccordion.Content>
  )
)
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
