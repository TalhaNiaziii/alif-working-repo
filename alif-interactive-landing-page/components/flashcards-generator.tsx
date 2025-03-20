"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Shuffle, Download } from "lucide-react"

interface FlashcardsGeneratorProps {
  onClose: () => void
}

interface Flashcard {
  id: number
  front: string
  back: string
}

// Sample flashcards data
const SAMPLE_FLASHCARDS: Flashcard[] = [
  {
    id: 1,
    front: "What is photosynthesis?",
    back: "The process by which green plants and some other organisms use sunlight to synthesize foods with the help of chlorophyll.",
  },
  {
    id: 2,
    front: "What is the capital of Japan?",
    back: "Tokyo",
  },
  {
    id: 3,
    front: "What is the formula for calculating the area of a circle?",
    back: "A = πr²",
  },
  {
    id: 4,
    front: "What is Newton's First Law of Motion?",
    back: "An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction unless acted upon by an external force.",
  },
  {
    id: 5,
    front: "What is the Pythagorean theorem?",
    back: "In a right-angled triangle, the square of the length of the hypotenuse equals the sum of the squares of the lengths of the other two sides. a² + b² = c²",
  },
  {
    id: 6,
    front: "What is the main function of DNA?",
    back: "DNA contains the genetic instructions used in the development and functioning of all known living organisms.",
  },
  {
    id: 7,
    front: "What is the difference between a simile and a metaphor?",
    back: "A simile compares things using 'like' or 'as', while a metaphor directly states that one thing is another.",
  },
]

export default function FlashcardsGenerator({ onClose }: FlashcardsGeneratorProps) {
  const [flashcards, setFlashcards] = useState<Flashcard[]>(SAMPLE_FLASHCARDS)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [direction, setDirection] = useState<"left" | "right" | "none">("none")
  const touchStartX = useRef<number | null>(null)

  const currentCard = flashcards[currentIndex]

  const nextCard = () => {
    if (currentIndex < flashcards.length - 1) {
      setDirection("right")
      setFlipped(false)
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1)
        setDirection("none")
      }, 300)
    }
  }

  const prevCard = () => {
    if (currentIndex > 0) {
      setDirection("left")
      setFlipped(false)
      setTimeout(() => {
        setCurrentIndex(currentIndex - 1)
        setDirection("none")
      }, 300)
    }
  }

  const flipCard = () => {
    setFlipped(!flipped)
  }

  const shuffleCards = () => {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5)
    setFlashcards(shuffled)
    setCurrentIndex(0)
    setFlipped(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return

    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX

    // Swipe threshold
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextCard() // Swipe left
      } else {
        prevCard() // Swipe right
      }
    }

    touchStartX.current = null
  }

  const exportToAnki = () => {
    // In a real implementation, this would create an Anki .apkg file
    // For now, we'll just create a CSV file that could be imported into Anki
    const csvContent = "front,back\n" + flashcards.map((card) => `"${card.front}","${card.back}"`).join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", "flashcards.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm font-medium">
          Card {currentIndex + 1} of {flashcards.length}
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={shuffleCards}>
            <Shuffle className="h-4 w-4 mr-1" /> Shuffle
          </Button>
          <Button variant="outline" size="sm" onClick={exportToAnki}>
            <Download className="h-4 w-4 mr-1" /> Export
          </Button>
        </div>
      </div>

      <div
        className="relative h-64 md:h-80 w-full perspective-1000 mb-6"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentIndex}-${flipped ? "back" : "front"}`}
            initial={{
              x: direction === "right" ? 300 : direction === "left" ? -300 : 0,
              rotateY: flipped ? 180 : 0,
              opacity: direction !== "none" ? 0 : 1,
            }}
            animate={{
              x: 0,
              rotateY: flipped ? 180 : 0,
              opacity: 1,
            }}
            exit={{
              x: direction === "right" ? -300 : direction === "left" ? 300 : 0,
              opacity: 0,
            }}
            transition={{ duration: 0.3 }}
            onClick={flipCard}
            className={`absolute inset-0 w-full h-full cursor-pointer backface-hidden rounded-xl shadow-lg p-6 flex items-center justify-center text-center ${
              flipped
                ? "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/50 dark:to-indigo-900/50"
                : "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/50 dark:to-pink-900/50"
            }`}
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
              transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            <div className={flipped ? "transform rotate-y-180" : ""}>
              <h3 className="text-xl font-semibold mb-4">{flipped ? "Answer" : "Question"}</h3>
              <p className="text-gray-800 dark:text-gray-200">{flipped ? currentCard.back : currentCard.front}</p>
              <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-gray-500 dark:text-gray-400">
                Click to flip
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between">
        <Button onClick={prevCard} disabled={currentIndex === 0} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" /> Previous
        </Button>
        <Button onClick={nextCard} disabled={currentIndex === flashcards.length - 1} variant="outline">
          Next <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}

