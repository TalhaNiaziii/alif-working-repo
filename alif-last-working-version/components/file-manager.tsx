"use client"

import { useState } from "react"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
} from "@/components/ui/context-menu"
import { FileText, FileAudio, FileIcon as FilePdf, Book, Trash, WalletCardsIcon as Cards } from "lucide-react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

interface File {
  id: string
  name: string
  type: "pdf" | "doc" | "audio"
}

const files: File[] = [
  { id: "1", name: "Lecture Notes.pdf", type: "pdf" },
  { id: "2", name: "Assignment 1.doc", type: "doc" },
  { id: "3", name: "Recorded Lecture.mp3", type: "audio" },
]

export default function FileManager() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleAction = (action: string) => {
    console.log(`Performing ${action} on file:`, selectedFile?.name)
    // Here you would typically call your backend API to perform the action
  }

  const FileIcon = ({ type }: { type: File["type"] }) => {
    switch (type) {
      case "pdf":
        return <FilePdf className="w-8 h-8 text-red-500" />
      case "doc":
        return <FileText className="w-8 h-8 text-blue-500" />
      case "audio":
        return <FileAudio className="w-8 h-8 text-green-500" />
    }
  }

  return (
    <div className="p-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-xl shadow-lg h-full">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              File Manager
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Manage and organize your study materials</p>
          </div>
          <div className="h-16 w-16 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
            <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/50 dark:to-indigo-900/50 rounded-xl p-6 shadow-sm"
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">12</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Total Files</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/50 dark:to-pink-900/50 rounded-xl p-6 shadow-sm"
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400">5</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">PDF Documents</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/50 dark:to-teal-900/50 rounded-xl p-6 shadow-sm"
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">4</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Word Documents</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/50 dark:to-amber-900/50 rounded-xl p-6 shadow-sm"
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-orange-600 dark:text-orange-400">3</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Audio Files</p>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map((file) => (
            <ContextMenu key={file.id}>
              <ContextMenuTrigger>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`p-6 rounded-xl hover:shadow-md transition-all cursor-pointer
                ${
                  file.type === "pdf"
                    ? "bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/50 dark:to-pink-900/50"
                    : file.type === "doc"
                      ? "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/50 dark:to-indigo-900/50"
                      : "bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/50 dark:to-teal-900/50"
                }
              `}
                >
                  <div className="flex flex-col items-center">
                    <div className="mb-4">
                      <FileIcon type={file.type} />
                    </div>
                    <p className="text-sm font-medium text-gray-800 dark:text-white text-center mb-2">{file.name}</p>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs">
                        {file.type.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {new Date().toLocaleDateString()}
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem onClick={() => handleAction("summarize")} className="flex items-center">
                  <Book className="mr-2 h-4 w-4" /> Summarize with AI
                </ContextMenuItem>
                <ContextMenuItem onClick={() => handleAction("generate-quiz")} className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" /> Generate Quiz
                </ContextMenuItem>
                <ContextMenuItem onClick={() => handleAction("create-flashcards")} className="flex items-center">
                  <Cards className="mr-2 h-4 w-4" /> Create Flashcards
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem className="flex items-center text-red-600 dark:text-red-400">
                  <Trash className="mr-2 h-4 w-4" /> Delete
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          ))}
        </div>
      </div>
    </div>
  )
}

