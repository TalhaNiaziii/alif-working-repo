"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FileUp, Book, WalletCardsIcon as Cards, FileText } from "lucide-react"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import QuizGenerator from "@/components/quiz-generator"
import FlashcardsGenerator from "@/components/flashcards-generator"

export default function StudyAssistant() {
  const [file, setFile] = useState<File | null>(null)
  const [generatedContent, setGeneratedContent] = useState<string>("")
  const [quizModalOpen, setQuizModalOpen] = useState(false)
  const [flashcardsModalOpen, setFlashcardsModalOpen] = useState(false)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
    }
  }

  const generateContent = (type: "summary" | "quiz" | "flashcards") => {
    // Here you would typically send the file to your backend for processing
    console.log(`Generating ${type} from:`, file?.name)

    if (type === "summary") {
      setGeneratedContent(`Sample ${type} content for ${file?.name}`)
    } else if (type === "quiz") {
      setQuizModalOpen(true)
    } else if (type === "flashcards") {
      setFlashcardsModalOpen(true)
    }
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
            <Button
              onClick={() => generateContent("quiz")}
              disabled={!file}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
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
            <Button
              onClick={() => generateContent("flashcards")}
              disabled={!file}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Generate Flashcards
            </Button>
          </motion.div>
        </div>

        {generatedContent && (
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

      {/* Quiz Generator Modal */}
      <Dialog open={quizModalOpen} onOpenChange={setQuizModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Interactive Quiz</DialogTitle>
          </DialogHeader>
          <QuizGenerator onClose={() => setQuizModalOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Flashcards Modal */}
      <Dialog open={flashcardsModalOpen} onOpenChange={setFlashcardsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Interactive Flashcards</DialogTitle>
          </DialogHeader>
          <FlashcardsGenerator onClose={() => setFlashcardsModalOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

