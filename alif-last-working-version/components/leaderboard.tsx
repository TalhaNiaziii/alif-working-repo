"use client"

import { useState } from "react"
import { Users, Globe, MapPin, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface User {
  id: string
  name: string
  score: number
  avatar: string
}

const users: User[] = [
  { id: "1", name: "John Doe", score: 1200, avatar: "/placeholder.svg?height=40&width=40" },
  { id: "2", name: "Jane Smith", score: 1150, avatar: "/placeholder.svg?height=40&width=40" },
  { id: "3", name: "Bob Johnson", score: 1100, avatar: "/placeholder.svg?height=40&width=40" },
  { id: "4", name: "Alice Brown", score: 1050, avatar: "/placeholder.svg?height=40&width=40" },
  { id: "5", name: "Charlie Davis", score: 1000, avatar: "/placeholder.svg?height=40&width=40" },
]

export default function Leaderboard() {
  const [filter, setFilter] = useState<"global" | "local" | "friends">("global")

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow"
    >
      <h2 className="text-2xl font-bold mb-4 flex items-center text-gray-800 dark:text-white">
        <Users className="mr-2" /> Leaderboard
      </h2>
      <div className="flex space-x-2 mb-4">
        <Button
          variant={filter === "global" ? "default" : "outline"}
          onClick={() => setFilter("global")}
          className="flex items-center"
        >
          <Globe className="mr-2 h-4 w-4" /> Global
        </Button>
        <Button
          variant={filter === "local" ? "default" : "outline"}
          onClick={() => setFilter("local")}
          className="flex items-center"
        >
          <MapPin className="mr-2 h-4 w-4" /> Local
        </Button>
        <Button
          variant={filter === "friends" ? "default" : "outline"}
          onClick={() => setFilter("friends")}
          className="flex items-center"
        >
          <UserPlus className="mr-2 h-4 w-4" /> Friends
        </Button>
      </div>
      <div className="space-y-4">
        {users.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
          >
            <div className="flex items-center">
              <span className="text-lg font-semibold mr-3 text-gray-800 dark:text-white">{index + 1}</span>
              <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-10 h-10 rounded-full mr-3" />
              <span className="text-gray-800 dark:text-white">{user.name}</span>
            </div>
            <span className="font-semibold text-blue-600 dark:text-blue-400">{user.score} pts</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

