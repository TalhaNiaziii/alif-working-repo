"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  FileText,
  PenTool,
  Download,
  ChevronDown,
  ChevronUp,
  Copy,
  Lightbulb,
  BookOpen,
  FileQuestion,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Types
interface AssignmentTask {
  id: number
  title: string
  description: string
  references?: string[]
  hints?: string[]
}

interface Assignment {
  id: number
  title: string
  description: string
  tasks: AssignmentTask[]
}

interface Solution {
  id: number
  assignmentId: number
  content: string
  explanation?: string
}

export default function AssignmentTools() {
  // Assignment Generator State
  const [topic, setTopic] = useState("")
  const [assignmentType, setAssignmentType] = useState("essay")
  const [generatedAssignment, setGeneratedAssignment] = useState<Assignment | null>(null)
  const [expandedTask, setExpandedTask] = useState<number | null>(null)
  const [showHints, setShowHints] = useState<{ [key: number]: boolean }>({})

  // Assignment Solver State
  const [file, setFile] = useState<File | null>(null)
  const [assignmentText, setAssignmentText] = useState("")
  const [solution, setSolution] = useState<Solution | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSolving, setIsSolving] = useState(false)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
    }
  }

  const generateAssignment = () => {
    setIsGenerating(true)

    // Simulate API call delay
    setTimeout(() => {
      // Sample generated assignment
      const sampleAssignment: Assignment = {
        id: 1,
        title: `${topic} ${assignmentType === "essay" ? "Essay" : assignmentType === "mcq" ? "Quiz" : "Mixed Assignment"}`,
        description: `This assignment will test your knowledge of ${topic}. Complete all tasks to demonstrate your understanding.`,
        tasks: [
          {
            id: 1,
            title: "Key Concepts Analysis",
            description: `Write a 500-word analysis of the key concepts in ${topic}. Include historical context and modern applications.`,
            references: [
              "Smith, J. (2022). Understanding Modern Concepts.",
              "Johnson, A. (2021). Historical Perspectives on Technology.",
            ],
            hints: [
              "Focus on at least 3 major concepts",
              "Include examples from real-world applications",
              "Consider ethical implications",
            ],
          },
          {
            id: 2,
            title: "Comparative Study",
            description: `Compare and contrast two major approaches to ${topic}. Discuss advantages and limitations of each.`,
            references: ["Williams, T. (2023). Comparative Methodologies.", "Brown, R. (2020). Analytical Frameworks."],
            hints: [
              "Use a structured comparison format",
              "Consider historical context for each approach",
              "Evaluate based on multiple criteria",
            ],
          },
          {
            id: 3,
            title: "Application Exercise",
            description: `Design a practical application that demonstrates your understanding of ${topic}. Include a diagram and explanation.`,
            references: ["Technical Documentation Standards (2023)", "Application Design Principles, 4th Edition"],
            hints: [
              "Focus on solving a real problem",
              "Consider scalability and limitations",
              "Include implementation challenges",
            ],
          },
        ],
      }

      setGeneratedAssignment(sampleAssignment)
      setIsGenerating(false)
    }, 2000)
  }

  const solveAssignment = () => {
    setIsSolving(true)

    // Simulate API call delay
    setTimeout(() => {
      // Sample solution
      const sampleSolution: Solution = {
        id: 1,
        assignmentId: 1,
        content: `# ${topic} Analysis\n\n## Introduction\nThis paper explores the key concepts, methodologies, and applications of ${topic}. Through careful analysis of current research and historical context, we can better understand the significance and future directions of this field.\n\n## Key Concepts\n[Detailed analysis of concepts would appear here]\n\n## Comparative Analysis\n[Comparison of methodologies would appear here]\n\n## Practical Applications\n[Description of applications would appear here]\n\n## Conclusion\nIn conclusion, ${topic} represents a significant area of study with wide-ranging implications. The concepts, methodologies, and applications discussed demonstrate the depth and breadth of this field.`,
        explanation: `This solution addresses all the requirements of the assignment by providing a comprehensive analysis of ${topic}. The structure follows academic standards with clear sections for introduction, key concepts, comparative analysis, practical applications, and conclusion. References are properly cited using APA format.`,
      }

      setSolution(sampleSolution)
      setIsSolving(false)
    }, 2000)
  }

  const toggleTaskExpansion = (taskId: number) => {
    setExpandedTask(expandedTask === taskId ? null : taskId)
  }

  const toggleHints = (taskId: number) => {
    setShowHints((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
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
              Assignment Tools
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Generate and solve assignments with AI assistance</p>
          </div>
          <div className="h-16 w-16 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
            <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
        </motion.div>

        <Tabs defaultValue="generator" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="generator" className="text-base">
              Assignment Generator
            </TabsTrigger>
            <TabsTrigger value="solver" className="text-base">
              Assignment Solver
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generator" className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/50 dark:to-indigo-900/50 rounded-xl p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Create New Assignment</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Generate customized assignments for any subject
                  </p>
                </div>
                <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <PenTool className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="topic">Assignment Topic</Label>
                  <Input
                    id="topic"
                    placeholder="e.g., Artificial Intelligence Ethics, Quantum Computing"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Assignment Type</Label>
                  <RadioGroup value={assignmentType} onValueChange={setAssignmentType} className="flex space-x-4 mt-1">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="essay" id="essay" />
                      <Label htmlFor="essay">Essay</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mcq" id="mcq" />
                      <Label htmlFor="mcq">Multiple Choice</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mixed" id="mixed" />
                      <Label htmlFor="mixed">Mixed</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button
                  onClick={generateAssignment}
                  disabled={!topic || isGenerating}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  {isGenerating ? <>Generating Assignment...</> : <>Generate Assignment</>}
                </Button>
              </div>
            </motion.div>

            <AnimatePresence>
              {generatedAssignment && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                        {generatedAssignment.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{generatedAssignment.description}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" /> Export as PDF
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {generatedAssignment.tasks.map((task) => (
                      <Card key={task.id} className="overflow-hidden">
                        <CardHeader
                          className="cursor-pointer bg-gray-50 dark:bg-gray-900/50 p-4"
                          onClick={() => toggleTaskExpansion(task.id)}
                        >
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{task.title}</CardTitle>
                            {expandedTask === task.id ? (
                              <ChevronUp className="h-5 w-5" />
                            ) : (
                              <ChevronDown className="h-5 w-5" />
                            )}
                          </div>
                        </CardHeader>

                        <AnimatePresence>
                          {expandedTask === task.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <CardContent className="p-4 pt-0 mt-4">
                                <p className="text-gray-700 dark:text-gray-300 mb-4">{task.description}</p>

                                {task.references && task.references.length > 0 && (
                                  <div className="mb-4">
                                    <h4 className="text-sm font-semibold mb-2 flex items-center">
                                      <BookOpen className="h-4 w-4 mr-2" /> References
                                    </h4>
                                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 pl-6 list-disc">
                                      {task.references.map((ref, index) => (
                                        <li key={index}>{ref}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {task.hints && task.hints.length > 0 && (
                                  <div>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        toggleHints(task.id)
                                      }}
                                      className="text-amber-600 dark:text-amber-400 p-0 h-auto"
                                    >
                                      <Lightbulb className="h-4 w-4 mr-2" />
                                      {showHints[task.id] ? "Hide Hints" : "Show Hints"}
                                    </Button>

                                    <AnimatePresence>
                                      {showHints[task.id] && (
                                        <motion.div
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ height: "auto", opacity: 1 }}
                                          exit={{ height: 0, opacity: 0 }}
                                          transition={{ duration: 0.3 }}
                                          className="mt-2 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md"
                                        >
                                          <ul className="text-sm text-amber-800 dark:text-amber-200 space-y-1 pl-6 list-disc">
                                            {task.hints.map((hint, index) => (
                                              <li key={index}>{hint}</li>
                                            ))}
                                          </ul>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                )}
                              </CardContent>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>

          <TabsContent value="solver" className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/50 dark:to-cyan-900/50 rounded-xl p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Solve Assignment</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Get AI-powered solutions for your assignments
                  </p>
                </div>
                <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <FileQuestion className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="file-upload">Upload Assignment</Label>
                  <Input
                    id="file-upload"
                    type="file"
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx,.txt"
                    className="mt-1"
                  />
                  {file && <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Selected file: {file.name}</p>}
                </div>

                <div>
                  <Label htmlFor="assignment-text">Or Paste Assignment Text</Label>
                  <Textarea
                    id="assignment-text"
                    placeholder="Paste your assignment instructions here..."
                    value={assignmentText}
                    onChange={(e) => setAssignmentText(e.target.value)}
                    className="mt-1 min-h-[100px]"
                  />
                </div>

                <Button
                  onClick={solveAssignment}
                  disabled={(!file && !assignmentText) || isSolving}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {isSolving ? <>Solving Assignment...</> : <>Solve Assignment</>}
                </Button>
              </div>
            </motion.div>

            <AnimatePresence>
              {solution && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Assignment</h3>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                      {file ? (
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <FileText className="h-5 w-5 mr-2" />
                          {file.name}
                        </div>
                      ) : (
                        <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                          {assignmentText || "No assignment text provided."}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Solution</h3>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => copyToClipboard(solution.content)}>
                          <Copy className="h-4 w-4 mr-2" /> Copy
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" /> Download
                        </Button>
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md mb-4 max-h-[400px] overflow-y-auto">
                      <pre className="text-gray-600 dark:text-gray-300 whitespace-pre-line font-sans">
                        {solution.content}
                      </pre>
                    </div>

                    {solution.explanation && (
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
                        <h4 className="text-sm font-semibold mb-2 flex items-center text-blue-800 dark:text-blue-200">
                          <Lightbulb className="h-4 w-4 mr-2" /> Explanation
                        </h4>
                        <p className="text-sm text-blue-700 dark:text-blue-300">{solution.explanation}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

