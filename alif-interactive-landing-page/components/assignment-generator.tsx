"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { FileDown, ChevronDown, ChevronUp, Lightbulb, BookOpen } from "lucide-react"
import { motion } from "framer-motion"

interface AssignmentTask {
  id: string
  title: string
  description: string
  references: string
  hints: string
  solution: string
}

export default function AssignmentGenerator() {
  const [topic, setTopic] = useState("")
  const [assignmentType, setAssignmentType] = useState("mixed")
  const [difficulty, setDifficulty] = useState("medium")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedAssignment, setGeneratedAssignment] = useState<AssignmentTask[] | null>(null)
  const [openSolutions, setOpenSolutions] = useState<Record<string, boolean>>({})

  const toggleSolution = (id: string) => {
    setOpenSolutions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const generateAssignment = () => {
    if (!topic) return

    setIsGenerating(true)

    // Simulate API call with a timeout
    setTimeout(() => {
      // Sample generated assignment
      const sampleAssignment: AssignmentTask[] = [
        {
          id: "1",
          title: "Understanding Key Concepts",
          description: `Explain the following concepts related to ${topic} in your own words:
          1. Main principles and theories
          2. Historical development
          3. Current applications in the real world`,
          references: "Introduction to Computer Science, Chapter 3, Pages 45-60",
          hints: "Focus on the fundamental principles and how they evolved over time.",
          solution:
            "A comprehensive explanation would include the foundational theories, how they developed historically, and practical applications in modern contexts.",
        },
        {
          id: "2",
          title: "Problem Solving",
          description: `Solve the following problem related to ${topic}:
          Given a scenario where [problem description based on topic], design a solution that addresses the key challenges.`,
          references: "Advanced Problem Solving Techniques, Pages 112-120",
          hints: "Break down the problem into smaller components and address each one systematically.",
          solution:
            "An effective solution would identify the core issues, propose a structured approach, and validate the solution against the requirements.",
        },
        {
          id: "3",
          title: "Critical Analysis",
          description: `Analyze the strengths and weaknesses of current approaches to ${topic}. Provide examples to support your analysis.`,
          references: "Contemporary Issues in Technology, Chapter 5",
          hints: "Consider both theoretical strengths and practical limitations in your analysis.",
          solution:
            "A thorough analysis would evaluate theoretical foundations, practical implementations, and identify areas for improvement with specific examples.",
        },
      ]

      setGeneratedAssignment(sampleAssignment)
      setIsGenerating(false)
    }, 2000)
  }

  const exportAsPDF = () => {
    // In a real implementation, this would generate a PDF
    alert("PDF export functionality would be implemented here")
  }

  return (
    <Collapsible className="w-full">
      <Card>
        <CardHeader>
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5" /> Assignment Generator
            </CardTitle>
            <ChevronDown className="h-5 w-5" />
          </CollapsibleTrigger>
          <CardDescription>Generate customized assignments based on your topic and preferences</CardDescription>
        </CardHeader>

        <CollapsibleContent>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="topic">Topic</Label>
                  <Input
                    id="topic"
                    placeholder="e.g., Artificial Intelligence"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Assignment Type</Label>
                  <Select value={assignmentType} onValueChange={setAssignmentType}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="essay">Essay</SelectItem>
                      <SelectItem value="mcq">Multiple Choice Questions</SelectItem>
                      <SelectItem value="mixed">Mixed Format</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger id="difficulty">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={generateAssignment} disabled={!topic || isGenerating} className="w-full">
                {isGenerating ? "Generating..." : "Generate Assignment"}
              </Button>

              {generatedAssignment && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-6 space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Generated Assignment: {topic}</h3>
                    <Button variant="outline" size="sm" onClick={exportAsPDF}>
                      <FileDown className="h-4 w-4 mr-2" /> Export as PDF
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {generatedAssignment.map((task) => (
                      <Card key={task.id} className="overflow-hidden">
                        <CardHeader className="bg-gray-50 dark:bg-gray-800">
                          <CardTitle className="text-lg">{task.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium mb-2">Description:</h4>
                              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{task.description}</p>
                            </div>

                            <div>
                              <h4 className="font-medium mb-2">References:</h4>
                              <p className="text-gray-700 dark:text-gray-300">{task.references}</p>
                            </div>

                            <Collapsible>
                              <div className="border rounded-lg p-3 bg-amber-50 dark:bg-amber-900/20">
                                <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
                                  <div className="flex items-center text-amber-800 dark:text-amber-300">
                                    <Lightbulb className="h-4 w-4 mr-2" /> Hints & Solution
                                  </div>
                                  {openSolutions[task.id] ? (
                                    <ChevronUp className="h-4 w-4" />
                                  ) : (
                                    <ChevronDown className="h-4 w-4" />
                                  )}
                                </CollapsibleTrigger>
                                <CollapsibleContent className="pt-2 space-y-2">
                                  <div>
                                    <h5 className="font-medium text-sm">Hints:</h5>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">{task.hints}</p>
                                  </div>
                                  <div>
                                    <h5 className="font-medium text-sm">Solution:</h5>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">{task.solution}</p>
                                  </div>
                                </CollapsibleContent>
                              </div>
                            </Collapsible>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  )
}

