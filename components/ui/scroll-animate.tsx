"use client"

import { useEffect, useRef, useState, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ScrollAnimateProps {
  children: ReactNode
  className?: string
  animation?: "up" | "left" | "right" | "scale"
  delay?: number
  threshold?: number
}

export function ScrollAnimate({
  children,
  className,
  animation = "up",
  delay = 0,
  threshold = 0.1,
}: ScrollAnimateProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(element)
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [threshold])

  const animationClass = {
    up: "scroll-animate",
    left: "scroll-animate-left",
    right: "scroll-animate-right",
    scale: "scroll-animate-scale",
  }[animation]

  return (
    <div
      ref={ref}
      className={cn(animationClass, isInView && "in-view", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

// Animate multiple children with stagger effect
interface StaggerChildrenProps {
  children: ReactNode[]
  className?: string
  staggerDelay?: number
  animation?: "up" | "left" | "right" | "scale"
}

export function StaggerChildren({
  children,
  className,
  staggerDelay = 100,
  animation = "up",
}: StaggerChildrenProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(element)
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const animationClass = {
    up: "scroll-animate",
    left: "scroll-animate-left",
    right: "scroll-animate-right",
    scale: "scroll-animate-scale",
  }[animation]

  return (
    <div ref={ref} className={className}>
      {children.map((child, index) => (
        <div
          key={index}
          className={cn(animationClass, isInView && "in-view")}
          style={{ transitionDelay: `${index * staggerDelay}ms` }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}
