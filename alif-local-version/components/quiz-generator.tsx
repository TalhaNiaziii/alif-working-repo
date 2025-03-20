"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"
import { Check, X, ArrowRight, RotateCcw } from "lucide-react"

interface QuizGeneratorProps {
  onClose: () => void
}

interface QuizQuestion {
  id: number
  question: string
  type: "multiple-choice" | "short-answer"
  options?: string[]
  correctAnswer: string
}

const SAMPLE_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    type: "multiple-choice",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris",
  },
  {
    id: 2,
    question: "What is the largest planet in our solar system?",
    type: "multiple-choice",
    options: ["Earth", "Jupiter", "Saturn", "Mars"],
    correctAnswer: "Jupiter",
  },
  {
    id: 3,
    question: "What is the chemical symbol for water?",
    type: "short-answer",
    correctAnswer: "H2O",
  },
  {
    id: 4,
    question: "Who wrote 'Romeo and Juliet'?",
    type: "multiple-choice",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correctAnswer: "William Shakespeare",
  },
  {
    id: 5,
    question: "What is the formula for calculating the area of a circle?",
    type: "short-answer",
    correctAnswer: "πr²",
  },
]

export default function QuizGenerator({ onClose }: QuizGeneratorProps) {
  const [stage, setStage] = useState<"setup" | "quiz" | "results">("setup")
  const [topic, setTopic] = useState("")
  const [numQuestions, setNumQuestions] = useState(5)
  const [difficulty, setDifficulty] = useState("medium")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [shortAnswer, setShortAnswer] = useState<string>("")
  const [answers, setAnswers] = useState<{ questionId: number; userAnswer: string; correct: boolean }[]>([])
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const questions = SAMPLE_QUESTIONS.slice(0, numQuestions)
  const currentQuestion = questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === questions.length - 1

  const startQuiz = () => {
    setStage("quiz")
    setCurrentQuestionIndex(0)
    setAnswers([])
  }

  const checkAnswer = () => {
    const answer = currentQuestion.type === "multiple-choice" ? selectedAnswer : shortAnswer
    const correct = answer.toLowerCase() === currentQuestion.correctAnswer.toLowerCase()

    setIsCorrect(correct)
    setShowFeedback(true)

    setAnswers([
      ...answers,
      {
        questionId: currentQuestion.id,
        userAnswer: answer,
        correct,
      },
    ])

    setTimeout(() => {
      setShowFeedback(false)
      if (isLastQuestion) {
        setStage("results")
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setSelectedAnswer("")
        setShortAnswer("")
      }
    }, 1500)
  }

  const restartQuiz = () => {
    setStage("setup")
    setCurrentQuestionIndex(0)
    setSelectedAnswer("")
    setShortAnswer("")
    setAnswers([])
  }

  const correctAnswers = answers.filter((a) => a.correct).length

  return (
    <div className="p-4">
      <AnimatePresence mode="wait">
        {stage === "setup" && (
          <motion.div
            key="setup"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <Label htmlFor="topic">Topic</Label>
              <Input
                id="topic"
                placeholder="Enter the quiz topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Number of Questions: {numQuestions}</Label>
              <Slider
                value={[numQuestions]}
                min={1}
                max={10}
                step={1}
                onValueChange={(value) => setNumQuestions(value[0])}
              />
            </div>

            <div className="space-y-2">
              <Label>Difficulty Level</Label>
              <RadioGroup value={difficulty} onValueChange={setDifficulty} className="flex space-x-2">
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

            <Button onClick={startQuiz} className="w-full">
              Start Quiz
            </Button>
          </motion.div>
        )}

        {stage === "quiz" && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} className="w-1/2" />
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
              <h3 className="text-xl font-medium mb-4">{currentQuestion.question}</h3>

              {currentQuestion.type === "multiple-choice" ? (
                <div className="space-y-3">
                  {currentQuestion.options?.map((option) => (
                    <div
                      key={option}
                      onClick={() => !showFeedback && setSelectedAnswer(option)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedAnswer === option
                          ? showFeedback
                            ? option === currentQuestion.correctAnswer
                              ? "bg-green-100 border-green-500 dark:bg-green-900/30 dark:border-green-500"
                              : "bg-red-100 border-red-500 dark:bg-red-900/30 dark:border-red-500"
                            : "bg-blue-100 border-blue-500 dark:bg-blue-900/30 dark:border-blue-500"
                          : "bg-gray-50 border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{option}</span>
                        {showFeedback &&
                          selectedAnswer === option &&
                          (option === currentQuestion.correctAnswer ? (
                            <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                          ) : (
                            <X className="h-5 w-5 text-red-600 dark:text-red-400" />
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  <Input
                    placeholder="Type your answer here"
                    value={shortAnswer}
                    onChange={(e) => setShortAnswer(e.target.value)}
                    disabled={showFeedback}
                    className={`${
                      showFeedback
                        ? isCorrect
                          ? "border-green-500 bg-green-50 dark:bg-green-900/30"
                          : "border-red-500 bg-red-50 dark:bg-red-900/30"
                        : ""
                    }`}
                  />
                  {showFeedback && (
                    <div
                      className={`text-sm ${isCorrect ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                    >
                      {isCorrect ? (
                        <span className="flex items-center">
                          <Check className="h-4 w-4 mr-1" /> Correct!
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <X className="h-4 w-4 mr-1" /> Incorrect. The correct answer is:{" "}
                          {currentQuestion.correctAnswer}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            <Button
              onClick={checkAnswer}
              disabled={
                showFeedback ||
                (currentQuestion.type === "multiple-choice" && !selectedAnswer) ||
                (currentQuestion.type === "short-answer" && !shortAnswer)
              }
              className="w-full"
            >
              {showFeedback ? (
                <span className="flex items-center">{isCorrect ? "Correct!" : "Incorrect"}</span>
              ) : (
                "Check Answer"
              )}
            </Button>
          </motion.div>
        )}

        {stage === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
              <h3 className="text-2xl font-bold mb-2">Quiz Results</h3>
              <div className="text-5xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                {correctAnswers}/{questions.length}
              </div>
              <Progress value={(correctAnswers / questions.length) * 100} className="mb-4" />
              <p className="text-gray-600 dark:text-gray-300">
                {correctAnswers === questions.length
                  ? "Perfect score! Excellent work!"
                  : correctAnswers >= questions.length * 0.7
                    ? "Great job! You're doing well!"
                    : "Keep practicing to improve your score!"}
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-medium">Review</h4>
              {questions.map((question, index) => {
                const answer = answers.find((a) => a.questionId === question.id)
                return (
                  <div
                    key={question.id}
                    className={`p-4 rounded-lg border ${
                      answer?.correct
                        ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                        : "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
                    }`}
                  >
                    <div className="flex justify-between">
                      <h5 className="font-medium">Question {index + 1}</h5>
                      {answer?.correct ? (
                        <span className="text-green-600 dark:text-green-400 flex items-center">
                          <Check className="h-4 w-4 mr-1" /> Correct
                        </span>
                      ) : (
                        <span className="text-red-600 dark:text-red-400 flex items-center">
                          <X className="h-4 w-4 mr-1" /> Incorrect
                        </span>
                      )}
                    </div>
                    <p className="mt-1">{question.question}</p>
                    <div className="mt-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Your answer:</span>
                        <span>{answer?.userAnswer}</span>
                      </div>
                      {!answer?.correct && (
                        <div className="flex justify-between mt-1">
                          <span className="text-gray-600 dark:text-gray-400">Correct answer:</span>
                          <span className="text-green-600 dark:text-green-400">{question.correctAnswer}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex space-x-3">
              <Button onClick={restartQuiz} variant="outline" className="flex-1">
                <RotateCcw className="h-4 w-4 mr-2" /> Retake Quiz
              </Button>
              <Button onClick={onClose} className="flex-1">
                <ArrowRight className="h-4 w-4 mr-2" /> Finish
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

