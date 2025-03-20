"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, XCircle, ArrowRight, BookOpen, Brain, BarChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

// Demo quiz questions
const quizQuestions = [
  {
    question: "What is the primary benefit of interactive learning?",
    options: [
      "It's more entertaining",
      "It improves knowledge retention",
      "It requires less time",
      "It's less expensive",
    ],
    correctAnswer: 1,
  },
  {
    question: "Which of these is a feature of adaptive learning?",
    options: [
      "One-size-fits-all curriculum",
      "Static content delivery",
      "Personalized learning paths",
      "Manual progress tracking",
    ],
    correctAnswer: 2,
  },
  {
    question: "How does spaced repetition help with learning?",
    options: [
      "It makes learning faster",
      "It enhances long-term memory retention",
      "It reduces the need for practice",
      "It eliminates the need for assessments",
    ],
    correctAnswer: 1,
  },
]

export function InteractiveDemo() {
  const [activeTab, setActiveTab] = useState("quiz")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const handleAnswerSelect = (index: number) => {
    if (showFeedback) return
    setSelectedAnswer(index)
  }

  const checkAnswer = () => {
    if (selectedAnswer === null) return

    setShowFeedback(true)

    if (selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
      setCorrectAnswers((prev) => prev + 1)
    }

    setTimeout(() => {
      setShowFeedback(false)

      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion((prev) => prev + 1)
        setSelectedAnswer(null)
      } else {
        setQuizCompleted(true)
      }
    }, 1500)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowFeedback(false)
    setCorrectAnswers(0)
    setQuizCompleted(false)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs defaultValue="quiz" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="quiz" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            <span>Interactive Quiz</span>
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Adaptive Content</span>
          </TabsTrigger>
          <TabsTrigger value="progress" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            <span>Progress Tracking</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="quiz" className="focus-visible:outline-none focus-visible:ring-0">
          <Card className="border shadow-sm">
            <CardContent className="p-6">
              {!quizCompleted ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">
                      Question {currentQuestion + 1} of {quizQuestions.length}
                    </span>
                    <Progress value={((currentQuestion + 1) / quizQuestions.length) * 100} className="w-1/2" />
                  </div>

                  <h3 className="text-xl font-medium">{quizQuestions[currentQuestion].question}</h3>

                  <div className="space-y-3">
                    {quizQuestions[currentQuestion].options.map((option, index) => (
                      <motion.div
                        key={index}
                        className={`p-4 rounded-lg border cursor-pointer transition-all ${
                          selectedAnswer === index
                            ? showFeedback
                              ? index === quizQuestions[currentQuestion].correctAnswer
                                ? "bg-green-50 border-green-500 dark:bg-green-900/20 dark:border-green-500"
                                : "bg-red-50 border-red-500 dark:bg-red-900/20 dark:border-red-500"
                              : "bg-primary/10 border-primary"
                            : "hover:bg-muted"
                        }`}
                        onClick={() => handleAnswerSelect(index)}
                        whileHover={{ scale: selectedAnswer === null ? 1.02 : 1 }}
                        animate={
                          showFeedback && selectedAnswer === index
                            ? index === quizQuestions[currentQuestion].correctAnswer
                              ? { scale: [1, 1.05, 1] }
                              : { x: [0, -5, 5, -5, 0] }
                            : {}
                        }
                        transition={{ duration: 0.5 }}
                      >
                        <div className="flex justify-between items-center">
                          <span>{option}</span>
                          {showFeedback &&
                            selectedAnswer === index &&
                            (index === quizQuestions[currentQuestion].correctAnswer ? (
                              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                            ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <Button onClick={checkAnswer} disabled={selectedAnswer === null || showFeedback} className="w-full">
                    {showFeedback ? (
                      selectedAnswer === quizQuestions[currentQuestion].correctAnswer ? (
                        <span className="flex items-center">
                          <CheckCircle className="mr-2 h-4 w-4" /> Correct!
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <XCircle className="mr-2 h-4 w-4" /> Incorrect
                        </span>
                      )
                    ) : (
                      "Check Answer"
                    )}
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <CheckCircle className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Quiz Completed!</h3>
                  <p className="text-muted-foreground mb-6">
                    You got {correctAnswers} out of {quizQuestions.length} questions correct.
                  </p>
                  <Progress value={(correctAnswers / quizQuestions.length) * 100} className="mb-8 max-w-md mx-auto" />
                  <Button onClick={resetQuiz}>Try Again</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="focus-visible:outline-none focus-visible:ring-0">
          <Card className="border shadow-sm">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-medium">Adaptive Learning Demo</h3>
                  <div className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                    Intermediate Level
                  </div>
                </div>

                <div className="space-y-4">
                  <p>
                    Adaptive learning systems adjust content based on your performance and learning style. Here's how it
                    works:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-muted rounded-lg p-4">
                      <div className="font-medium mb-2">1. Assessment</div>
                      <p className="text-sm text-muted-foreground">
                        The system evaluates your current knowledge and learning preferences.
                      </p>
                    </div>
                    <div className="bg-muted rounded-lg p-4">
                      <div className="font-medium mb-2">2. Personalization</div>
                      <p className="text-sm text-muted-foreground">
                        Content is tailored to address your specific needs and learning style.
                      </p>
                    </div>
                    <div className="bg-muted rounded-lg p-4">
                      <div className="font-medium mb-2">3. Continuous Adaptation</div>
                      <p className="text-sm text-muted-foreground">
                        As you progress, the system adjusts difficulty and focus areas.
                      </p>
                    </div>
                  </div>

                  <div className="bg-card border rounded-lg p-4 mt-6">
                    <h4 className="font-medium mb-2">Interactive Example: Concept Mastery</h4>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="w-1/3 font-medium">Concept A</div>
                        <div className="w-2/3">
                          <div className="h-2 bg-muted rounded-full">
                            <div
                              className="h-full bg-green-500 rounded-full animate-progress"
                              style={{ width: "90%" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-1/3 font-medium">Concept B</div>
                        <div className="w-2/3">
                          <div className="h-2 bg-muted rounded-full">
                            <div
                              className="h-full bg-yellow-500 rounded-full animate-progress"
                              style={{ width: "60%", animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-1/3 font-medium">Concept C</div>
                        <div className="w-2/3">
                          <div className="h-2 bg-muted rounded-full">
                            <div
                              className="h-full bg-red-500 rounded-full animate-progress"
                              style={{ width: "30%", animationDelay: "0.4s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                      <p className="text-sm">
                        <strong>Adaptive Recommendation:</strong> Based on your performance, we recommend focusing on
                        Concept C with additional practice exercises.
                      </p>
                    </div>
                  </div>
                </div>

                <Button className="w-full">
                  Try Adaptive Learning <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="focus-visible:outline-none focus-visible:ring-0">
          <Card className="border shadow-sm">
            <CardContent className="p-6">
              <div className="space-y-6">
                <h3 className="text-xl font-medium">Progress Tracking Dashboard</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-card border rounded-lg p-4">
                    <div className="text-sm text-muted-foreground mb-2">Course Completion</div>
                    <div className="text-2xl font-bold mb-2">68%</div>
                    <Progress value={68} className="mb-2" />
                    <p className="text-xs text-muted-foreground">7 of 12 modules completed</p>
                  </div>

                  <div className="bg-card border rounded-lg p-4">
                    <div className="text-sm text-muted-foreground mb-2">Quiz Performance</div>
                    <div className="text-2xl font-bold mb-2">85%</div>
                    <Progress value={85} className="mb-2" />
                    <p className="text-xs text-muted-foreground">Average score across all quizzes</p>
                  </div>

                  <div className="bg-card border rounded-lg p-4">
                    <div className="text-sm text-muted-foreground mb-2">Learning Streak</div>
                    <div className="text-2xl font-bold mb-2">12 days</div>
                    <div className="flex space-x-1">
                      {Array.from({ length: 7 }).map((_, i) => (
                        <div key={i} className={`h-2 w-full rounded-full ${i < 5 ? "bg-primary" : "bg-muted"}`} />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Keep it up! You're building a habit.</p>
                  </div>
                </div>

                <div className="bg-card border rounded-lg p-4">
                  <h4 className="font-medium mb-4">Skill Mastery</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Critical Thinking</span>
                        <span className="text-sm text-muted-foreground">Advanced</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full">
                        <div className="h-full bg-primary rounded-full animate-progress" style={{ width: "85%" }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Problem Solving</span>
                        <span className="text-sm text-muted-foreground">Intermediate</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full">
                        <div
                          className="h-full bg-primary rounded-full animate-progress"
                          style={{ width: "65%", animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Data Analysis</span>
                        <span className="text-sm text-muted-foreground">Beginner</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full">
                        <div
                          className="h-full bg-primary rounded-full animate-progress"
                          style={{ width: "40%", animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                  <div className="flex items-start">
                    <div className="mr-4">
                      <BarChart className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Personalized Insights</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Based on your learning patterns, we've identified the following:
                      </p>
                      <ul className="text-sm space-y-1">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          <span>You learn best through visual content</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          <span>Your retention is highest in the morning</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          <span>You could benefit from more practice in data analysis</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Button className="w-full">
                  View Detailed Analytics <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

