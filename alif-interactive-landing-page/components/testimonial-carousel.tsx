"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    quote:
      "LearnSphere has completely transformed how I approach learning. The interactive modules and personalized feedback have helped me master concepts I struggled with for years.",
    author: "Sarah Johnson",
    role: "Software Engineering Student",
    avatar: "/placeholder.svg?height=50&width=50",
  },
  {
    quote:
      "As an educator, I've seen firsthand how LearnSphere engages students in ways traditional teaching methods can't. The analytics help me identify where my students need additional support.",
    author: "Dr. Michael Chen",
    role: "University Professor",
    avatar: "/placeholder.svg?height=50&width=50",
  },
  {
    quote:
      "The adaptive learning paths are incredible. The platform seems to understand exactly what I need to work on and presents the material in a way that makes complex topics accessible.",
    author: "Aisha Patel",
    role: "Data Science Professional",
    avatar: "/placeholder.svg?height=50&width=50",
  },
]

export function TestimonialCarousel() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay])

  const next = () => {
    setAutoplay(false)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setAutoplay(false)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="overflow-hidden rounded-xl bg-card border p-8 md:p-12 shadow-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center"
          >
            <Quote className="h-12 w-12 text-primary/20 mb-6" />
            <blockquote className="text-xl md:text-2xl font-medium mb-8">"{testimonials[current].quote}"</blockquote>
            <div className="flex flex-col items-center">
              <Avatar className="h-16 w-16 mb-4">
                <AvatarImage src={testimonials[current].avatar} alt={testimonials[current].author} />
                <AvatarFallback>
                  {testimonials[current].author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <div className="font-semibold">{testimonials[current].author}</div>
                <div className="text-sm text-muted-foreground">{testimonials[current].role}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        <Button variant="outline" size="icon" onClick={prev} aria-label="Previous testimonial">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        {testimonials.map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="icon"
            className={`w-3 h-3 rounded-full p-0 ${index === current ? "bg-primary" : "bg-muted"}`}
            onClick={() => {
              setAutoplay(false)
              setCurrent(index)
            }}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
        <Button variant="outline" size="icon" onClick={next} aria-label="Next testimonial">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

