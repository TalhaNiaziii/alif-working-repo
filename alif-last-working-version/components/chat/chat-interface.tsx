"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { FileText, Send, Paperclip, Loader2, ChevronDown, ChevronUp, BookOpen } from "lucide-react"

// Types for our messages and sources
interface Attachment {
  type: "image" | "document"
  url: string
  name: string
  size?: number
}

interface Source {
  title: string
  content: string
  relevance: number
}

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  type: "text" | "image" | "document"
  attachments?: Attachment[]
  sources?: Source[]
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! I can help you analyze documents and images. Upload files or ask questions about your content.",
      timestamp: new Date(),
      type: "text",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [expandedSources, setExpandedSources] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
      type: "text",
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate RAG response - replace with actual API call
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Based on your documents and query, here's what I found...",
        timestamp: new Date(),
        type: "text",
        sources: [
          {
            title: "Document Analysis",
            content: "Relevant excerpt from your documents...",
            relevance: 0.92,
          },
        ],
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files?.length) return

    const newMessages: Message[] = []

    Array.from(files).forEach((file) => {
      const isImage = file.type.startsWith("image/")
      const attachment: Attachment = {
        type: isImage ? "image" : "document",
        url: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
      }

      newMessages.push({
        id: Date.now().toString(),
        role: "user",
        content: `Uploaded ${isImage ? "image" : "document"}: ${file.name}`,
        timestamp: new Date(),
        type: isImage ? "image" : "document",
        attachments: [attachment],
      })
    })

    setMessages((prev) => [...prev, ...newMessages])
    setIsLoading(true)

    // Simulate processing - replace with actual API call
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: "I've processed your uploads. What would you like to know about them?",
          timestamp: new Date(),
          type: "text",
        },
      ])
      setIsLoading(false)
    }, 2000)

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  return (
    <div className="flex flex-col h-full content-layer rounded-lg shadow-lg">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            // In your ChatInterface component, update the message Card styling:

            <Card
              key={message.id}
              className={`p-4 ${
                message.role === "user"
                  ? "ml-12 bg-blue-600/90 dark:bg-blue-600/90 text-white backdrop-blur-sm"
                  : "mr-12 card-gradient"
              }`}
            >
              {/* Rest of the message content remains the same */}
              <div
                className={`prose ${
                  message.role === "user"
                    ? "prose-invert" // Always use inverted prose for user messages since they have dark background
                    : "dark:prose-invert" // Only invert assistant message text in dark mode
                }`}
              >
                <p>{message.content}</p>
              </div>

              {/* Update source button styling for better visibility */}
              {message.sources && (
                <div className="mt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExpandedSources(expandedSources === message.id ? null : message.id)}
                    className={`text-xs flex items-center ${
                      message.role === "user"
                        ? "text-white hover:bg-blue-700"
                        : "dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    <BookOpen className="h-4 w-4 mr-1" />
                    {expandedSources === message.id ? (
                      <ChevronUp className="h-4 w-4 mr-1" />
                    ) : (
                      <ChevronDown className="h-4 w-4 mr-1" />
                    )}
                    Sources ({message.sources.length})
                  </Button>

                  {expandedSources === message.id && (
                    <div className="mt-2 space-y-2">
                      {message.sources.map((source, index) => (
                        <div
                          key={index}
                          className={`text-sm p-2 rounded ${
                            message.role === "user"
                              ? "bg-blue-700 text-white"
                              : "bg-gray-200 dark:bg-gray-700 text-foreground"
                          }`}
                        >
                          <div className="font-medium">{source.title}</div>
                          <div className="mt-1 opacity-70">{source.content}</div>
                          <div className="mt-1 text-xs">Relevance: {(source.relevance * 100).toFixed(0)}%</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Update timestamp styling */}
              <div
                className={`text-xs mt-2 ${
                  message.role === "user" ? "text-blue-100" : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {message.timestamp.toLocaleTimeString()}
              </div>

              {/* Update attachment styling */}
              {message.attachments?.map((attachment, index) => (
                <div key={index} className="mt-2">
                  {attachment.type === "image" ? (
                    <div className="relative">
                      <img
                        src={attachment.url || "/placeholder.svg"}
                        alt={attachment.name}
                        className="max-h-64 rounded object-contain"
                      />
                      <div
                        className={`mt-1 text-sm ${
                          message.role === "user" ? "text-blue-100" : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {attachment.name} ({formatFileSize(attachment.size || 0)})
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`flex items-center gap-2 text-sm ${
                        message.role === "user" ? "text-blue-100" : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      <FileText className="h-4 w-4" />
                      <span>{attachment.name}</span>
                      {attachment.size && <span className="opacity-70">({formatFileSize(attachment.size)})</span>}
                    </div>
                  )}
                </div>
              ))}
            </Card>
          ))}

          {isLoading && (
            <div className="flex justify-center p-4">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-white/10 dark:border-gray-700/10">
        <div className="flex gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            accept="image/*,.pdf,.doc,.docx,.txt"
            multiple
          />

          <Button
            variant="outline"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
            title="Upload files"
            className="bg-white/50 dark:bg-gray-800/50 hover:bg-white/70 dark:hover:bg-gray-800/70"
          >
            <Paperclip className="h-4 w-4" />
          </Button>

          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your documents and images..."
            className="flex-1 min-h-[44px] max-h-32 input-gradient"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
          />

          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="bg-blue-600/90 hover:bg-blue-600 transition-colors duration-200"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

