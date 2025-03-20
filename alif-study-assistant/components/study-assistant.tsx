"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  FileUp,
  Book,
  WalletCardsIcon as Cards,
  FileText,
  X,
  ChevronRight,
  ChevronLeft,
  Shuffle,
  Download,
  Check,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"

// Quiz types
interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  userAnswer?: number
}

// Flashcard types
interface Flashcard {
  id: number
  front: string
  back: string
}

export default function StudyAssistant() {
  const [file, setFile] = useState<File | null>(null)
  const [generatedContent, setGeneratedContent] = useState<string>("")

  // Quiz state
  const [quizModalOpen, setQuizModalOpen] = useState(false)
  const [quizStep, setQuizStep] = useState<"setup" | "quiz" | "results">("setup")
  const [quizTopic, setQuizTopic] = useState("")
  const [quizDifficulty, setQuizDifficulty] = useState("medium")
  const [questionCount, setQuestionCount] = useState("5")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([])
  const [quizScore, setQuizScore] = useState(0)

  // Flashcard state
  const [flashcardsVisible, setFlashcardsVisible] = useState(false)
  const [flashcards, setFlashcards] = useState<Flashcard[]>([])
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
    }
  }

  const generateContent = (type: "summary" | "quiz" | "flashcards") => {
    console.log(`Generating ${type} from:`, file?.name)
    setGeneratedContent(`Sample ${type} content for ${file?.name}`)

    if (type === "quiz") {
      setQuizModalOpen(true)
      setQuizStep("setup")
    } else if (type === "flashcards") {
      // Generate sample flashcards
      const sampleFlashcards: Flashcard[] = [
        { id: 1, front: "What is the capital of France?", back: "Paris" },
        { id: 2, front: "What is the largest planet in our solar system?", back: "Jupiter" },
        { id: 3, front: "What is the chemical symbol for gold?", back: "Au" },
        { id: 4, front: "What is the square root of 144?", back: "12" },
        { id: 5, front: "Who wrote 'Romeo and Juliet'?", back: "William Shakespeare" },
      ]
      setFlashcards(sampleFlashcards)
      setFlashcardsVisible(true)
      setCurrentCardIndex(0)
      setIsFlipped(false)
    }
  }

  const startQuiz = () => {
    // Generate sample quiz questions based on user input
    const sampleQuestions: QuizQuestion[] = [
      {
        id: 1,
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2,
      },
      {
        id: 2,
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: "What is the largest mammal?",
        options: ["Elephant", "Giraffe", "Blue Whale", "Hippopotamus"],
        correctAnswer: 2,
      },
      {
        id: 4,
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correctAnswer: 2,
      },
      {
        id: 5,
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correctAnswer: 2,
      },
    ]

    // Take only the number of questions requested
    const count = Number.parseInt(questionCount)
    const questions = sampleQuestions.slice(0, count)

    setQuizQuestions(questions)
    setCurrentQuestionIndex(0)
    setQuizScore(0)
    setQuizStep("quiz")
  }

  const answerQuestion = (optionIndex: number) => {
    const updatedQuestions = [...quizQuestions]
    updatedQuestions[currentQuestionIndex].userAnswer = optionIndex
    setQuizQuestions(updatedQuestions)

    // Check if answer is correct
    if (optionIndex === quizQuestions[currentQuestionIndex].correctAnswer) {
      setQuizScore(quizScore + 1)
    }
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setQuizStep("results")
    }
  }

  const resetQuiz = () => {
    setQuizStep("setup")
    setQuizQuestions([])
    setCurrentQuestionIndex(0)
    setQuizScore(0)
  }

  // Flashcard functions
  const nextCard = () => {
    setIsFlipped(false)
    setTimeout(() => {
      setCurrentCardIndex((currentCardIndex + 1) % flashcards.length)
    }, 200)
  }

  const prevCard = () => {
    setIsFlipped(false)
    setTimeout(() => {
      setCurrentCardIndex((currentCardIndex - 1 + flashcards.length) % flashcards.length)
    }, 200)
  }

  const shuffleCards = () => {
    setIsFlipped(false)
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5)
    setFlashcards(shuffled)
    setCurrentCardIndex(0)
  }

  return (
    <div className="p-8 content-layer rounded-xl shadow-lg h-full">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Study Assistant
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Transform your study materials into interactive learning experiences
            </p>
          </div>
          <div className="h-16 w-16 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
            <Book className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/50 dark:to-amber-900/50 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Upload Materials</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Supported formats: PDF, DOC, TXT, MP3</p>
              </div>
              <div className="h-12 w-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                <FileUp className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <Input type="file" onChange={handleFileUpload} accept=".pdf,.doc,.docx,.txt,.mp3" className="mb-3" />
            <Button
              disabled={!file}
              className="w-full bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-700"
            >
              <FileUp className="mr-2 h-4 w-4" /> Upload File
            </Button>
          </div>

          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/50 dark:to-cyan-900/50 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Drag & Drop</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Quick upload your files here</p>
              </div>
              <div className="h-12 w-12 bg-teal-100 dark:bg-teal-900/30 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-teal-600 dark:text-teal-400" />
              </div>
            </div>
            <div className="border-2 border-dashed border-teal-200 dark:border-teal-800 rounded-lg p-8 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Drag and drop your files here, or click to browse
              </p>
              {file && (
                <div className="mt-4 p-2 bg-teal-100 dark:bg-teal-900/30 rounded flex items-center justify-between">
                  <span className="text-sm text-teal-700 dark:text-teal-300">{file.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setFile(null)}
                    className="text-teal-700 dark:text-teal-300"
                  >
                    ✕
                  </Button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/50 dark:to-indigo-900/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <Book className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-medium bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">
                Most Popular
              </span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Summarization</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Get concise summaries of your study materials with key points highlighted
            </p>
            <Button
              onClick={() => generateContent("summary")}
              disabled={!file}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Generate Summary
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/50 dark:to-pink-900/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <FileText className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              <span className="text-xs font-medium bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 px-2 py-1 rounded-full">
                AI-Powered
              </span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Quiz Generator</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Create interactive quizzes to test your knowledge effectively
            </p>
            <Button onClick={() => generateContent("quiz")} className="w-full bg-purple-600 hover:bg-purple-700">
              Generate Quiz
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/50 dark:to-teal-900/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <Cards className="h-8 w-8 text-green-600 dark:text-green-400" />
              <span className="text-xs font-medium bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 px-2 py-1 rounded-full">
                New Feature
              </span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Flashcards</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Transform your notes into interactive flashcards for better retention
            </p>
            <Button onClick={() => generateContent("flashcards")} className="w-full bg-green-600 hover:bg-green-700">
              Generate Flashcards
            </Button>
          </motion.div>
        </div>

        {/* Flashcards Section */}
        <AnimatePresence>
          {flashcardsVisible && flashcards.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mt-8 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/30 dark:to-teal-900/30 rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Flashcards ({currentCardIndex + 1}/{flashcards.length})
                </h3>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={shuffleCards}>
                    <Shuffle className="h-4 w-4 mr-2" /> Shuffle
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setFlashcardsVisible(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex justify-center mb-6">
                <div
                  className="relative w-full max-w-md h-64 cursor-pointer perspective-1000"
                  onClick={() => setIsFlipped(!isFlipped)}
                >
                  <motion.div
                    className={`absolute w-full h-full rounded-xl shadow-md transition-all duration-500 preserve-3d ${isFlipped ? "rotate-y-180" : ""}`}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="absolute w-full h-full bg-white dark:bg-gray-800 rounded-xl p-6 flex items-center justify-center backface-hidden">
                      <p className="text-xl text-center font-medium text-gray-800 dark:text-white">
                        {flashcards[currentCardIndex]?.front}
                      </p>
                    </div>
                    <div className="absolute w-full h-full bg-green-100 dark:bg-green-900/50 rounded-xl p-6 flex items-center justify-center backface-hidden rotate-y-180">
                      <p className="text-xl text-center font-medium text-gray-800 dark:text-white">
                        {flashcards[currentCardIndex]?.back}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <Button onClick={prevCard} variant="outline">
                  <ChevronLeft className="h-4 w-4 mr-2" /> Previous
                </Button>
                <Button onClick={() => setIsFlipped(!isFlipped)} variant="outline">
                  {isFlipped ? "Show Question" : "Show Answer"}
                </Button>
                <Button onClick={nextCard} variant="outline">
                  Next <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>

              <div className="mt-6 flex justify-center">
                <Button variant="outline" className="bg-green-600 text-white hover:bg-green-700">
                  <Download className="h-4 w-4 mr-2" /> Export as Anki Deck
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {generatedContent && !flashcardsVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Generated Content</h3>
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" /> Export
              </Button>
            </div>
            <Textarea value={generatedContent} readOnly className="w-full min-h-[200px] bg-gray-50 dark:bg-gray-900" />
          </motion.div>
        )}
      </div>

      {/* Quiz Modal */}
      <Dialog open={quizModalOpen} onOpenChange={setQuizModalOpen}>
        <DialogContent className="sm:max-w-md md:max-w-xl">
          <DialogHeader>
            <DialogTitle>
              {quizStep === "setup" && "Quiz Generator"}
              {quizStep === "quiz" && `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`}
              {quizStep === "results" && "Quiz Results"}
            </DialogTitle>
            <DialogDescription>
              {quizStep === "setup" && "Customize your quiz settings"}
              {quizStep === "quiz" && "Select the correct answer"}
              {quizStep === "results" && `You scored ${quizScore} out of ${quizQuestions.length}`}
            </DialogDescription>
          </DialogHeader>

          {quizStep === "setup" && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="topic">Topic</Label>
                <Input
                  id="topic"
                  placeholder="e.g., Data Structures, World History"
                  value={quizTopic}
                  onChange={(e) => setQuizTopic(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="questions">Number of Questions</Label>
                <Select value={questionCount} onValueChange={setQuestionCount}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select number of questions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 Questions</SelectItem>
                    <SelectItem value="5">5 Questions</SelectItem>
                    <SelectItem value="10">10 Questions</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Difficulty</Label>
                <RadioGroup value={quizDifficulty} onValueChange={setQuizDifficulty} className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="easy" id="easy" />
                    <Label htmlFor="easy">Easy</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="medium" />
                    <Label htmlFor="medium">Medium</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hard" id="hard" />
                    <Label htmlFor="hard">Hard</Label>
                  </div>
                </RadioGroup>
              </div>

              <DialogFooter className="sm:justify-start">
                <Button type="button" variant="secondary" onClick={() => setQuizModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="button" onClick={startQuiz}>
                  Start Quiz
                </Button>
              </DialogFooter>
            </div>
          )}

          {quizStep === "quiz" && quizQuestions.length > 0 && (
            <div className="space-y-4 py-4">
              <Progress value={((currentQuestionIndex + 1) / quizQuestions.length) * 100} className="h-2 mb-4" />

              <div className="text-lg font-medium mb-4">{quizQuestions[currentQuestionIndex].question}</div>

              <div className="space-y-2">
                {quizQuestions[currentQuestionIndex].options.map((option, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      quizQuestions[currentQuestionIndex].userAnswer === index
                        ? "bg-blue-100 dark:bg-blue-900/50 border-2 border-blue-500"
                        : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => answerQuestion(index)}
                  >
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center mr-3">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span>{option}</span>
                    </div>
                  </div>
                ))}
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  onClick={nextQuestion}
                  disabled={quizQuestions[currentQuestionIndex].userAnswer === undefined}
                >
                  {currentQuestionIndex < quizQuestions.length - 1 ? (
                    <>
                      Next Question <ChevronRight className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Finish Quiz <Check className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </DialogFooter>
            </div>
          )}

          {quizStep === "results" && (
            <div className="space-y-6 py-4">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">
                  {quizScore}/{quizQuestions.length}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {quizScore === quizQuestions.length
                    ? "Perfect score! Excellent work!"
                    : quizScore > quizQuestions.length / 2
                      ? "Good job! Keep practicing to improve."
                      : "Keep studying and try again!"}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Question Review:</h4>
                {quizQuestions.map((q, i) => (
                  <div key={i} className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <div className="font-medium mb-2">
                      {i + 1}. {q.question}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Your answer: </span>
                      <span
                        className={
                          q.userAnswer === q.correctAnswer
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }
                      >
                        {q.options[q.userAnswer ?? 0]}
                        {q.userAnswer === q.correctAnswer ? (
                          <Check className="inline ml-1 h-4 w-4" />
                        ) : (
                          ` (Correct: ${q.options[q.correctAnswer]})`
                        )}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <DialogFooter className="space-x-2">
                <Button type="button" variant="outline" onClick={resetQuiz}>
                  Try Again
                </Button>
                <Button type="button" onClick={() => setQuizModalOpen(false)}>
                  Close
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

