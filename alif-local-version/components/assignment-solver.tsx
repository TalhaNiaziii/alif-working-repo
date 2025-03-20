"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Upload, ChevronDown, Copy, Download, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AssignmentSolver() {
  const [assignmentText, setAssignmentText] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [isSolving, setIsSolving] = useState(false)
  const [solution, setSolution] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0]
      setFile(selectedFile)

      // In a real implementation, you would extract text from the file
      // For now, we'll just use the filename
      setAssignmentText(`Content from file: ${selectedFile.name}`)
    }
  }

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const solveAssignment = () => {
    if (!assignmentText && !file) return

    setIsSolving(true)

    // Simulate API call with a timeout
    setTimeout(() => {
      // Sample solution
      const sampleSolution = `# Solution

## Analysis
Based on the assignment, here's a comprehensive analysis of the key points:

1. The problem requires understanding of fundamental concepts
2. Application of theoretical knowledge to practical scenarios
3. Critical evaluation of different approaches

## Proposed Solution
The solution involves a step-by-step approach:

1. First, identify the core requirements
2. Develop a framework for addressing each component
3. Apply relevant methodologies and techniques
4. Validate the solution against established criteria

## Conclusion
The proposed approach effectively addresses the assignment requirements while demonstrating a thorough understanding of the subject matter.`

      setSolution(sampleSolution)
      setIsSolving(false)
    }, 2000)
  }

  const copyToClipboard = () => {
    if (solution) {
      navigator.clipboard.writeText(solution)
      alert("Solution copied to clipboard")
    }
  }

  const downloadSolution = () => {
    if (solution) {
      const blob = new Blob([solution], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = "assignment-solution.txt"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <Collapsible className="w-full">
      <Card>
        <CardHeader>
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
            <CardTitle className="flex items-center">
              <Sparkles className="mr-2 h-5 w-5" /> Assignment Solver
            </CardTitle>
            <ChevronDown className="h-5 w-5" />
          </CollapsibleTrigger>
          <CardDescription>Get intelligent solutions for your assignments</CardDescription>
        </CardHeader>

        <CollapsibleContent>
          <CardContent>
            <div className="space-y-4">
              <Tabs defaultValue="text" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="text">Paste Text</TabsTrigger>
                  <TabsTrigger value="upload">Upload File</TabsTrigger>
                </TabsList>

                <TabsContent value="text" className="space-y-4 pt-4">
                  <Textarea
                    placeholder="Paste your assignment text here..."
                    value={assignmentText}
                    onChange={(e) => setAssignmentText(e.target.value)}
                    className="min-h-[200px]"
                  />
                </TabsContent>

                <TabsContent value="upload" className="space-y-4 pt-4">
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.txt"
                    />
                    <Button onClick={triggerFileInput} variant="outline" className="mb-4">
                      <Upload className="h-4 w-4 mr-2" /> Choose File
                    </Button>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {file ? `Selected file: ${file.name}` : "Supported formats: PDF, DOC, TXT"}
                    </p>
                  </div>
                </TabsContent>
              </Tabs>

              <Button onClick={solveAssignment} disabled={(!assignmentText && !file) || isSolving} className="w-full">
                {isSolving ? "Solving..." : "Solve Assignment"}
              </Button>

              {solution && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Assignment</h3>
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg min-h-[300px] overflow-auto">
                        <pre className="whitespace-pre-wrap text-sm">{assignmentText}</pre>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-semibold">Solution</h3>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={copyToClipboard}>
                            <Copy className="h-4 w-4 mr-1" /> Copy
                          </Button>
                          <Button variant="outline" size="sm" onClick={downloadSolution}>
                            <Download className="h-4 w-4 mr-1" /> Download
                          </Button>
                        </div>
                      </div>
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg min-h-[300px] overflow-auto">
                        <pre className="whitespace-pre-wrap text-sm">{solution}</pre>
                      </div>
                    </div>
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

