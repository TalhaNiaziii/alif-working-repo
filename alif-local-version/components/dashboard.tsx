"use client"

import { useState } from "react"
import { Progress } from "@/components/ui/progress"
import { Trophy, Flame, Star, Award } from "lucide-react"

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
]

export default function Dashboard() {
  const [studyStreak, setStudyStreak] = useState(7)
  const [totalPoints, setTotalPoints] = useState(5863)
  const maxPoints = 10000

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 flex items-center text-blue-800 dark:text-blue-200">
            <Flame className="mr-2" /> Study Streak
          </h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-300">{studyStreak} days</p>
          <Progress value={(studyStreak / 30) * 100} className="mt-2" />
          <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">Keep it up! 30-day goal</p>
        </div>
        <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 flex items-center text-green-800 dark:text-green-200">
            <Star className="mr-2" /> Total Points
          </h3>
          <p className="text-3xl font-bold text-green-600 dark:text-green-300">{totalPoints}</p>
          <Progress value={(totalPoints / maxPoints) * 100} className="mt-2" />
          <p className="text-sm text-green-600 dark:text-green-300 mt-1">
            {maxPoints - totalPoints} points to next level
          </p>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2 flex items-center text-gray-800 dark:text-white">
          <Trophy className="mr-2" /> Leaderboard
        </h3>
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
          {users.map((user, index) => (
            <div
              key={user.id}
              className="flex items-center justify-between py-2 border-b last:border-b-0 border-gray-200 dark:border-gray-600"
            >
              <div className="flex items-center">
                <span className="text-lg font-semibold mr-3 text-gray-800 dark:text-white">{index + 1}</span>
                <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-8 h-8 rounded-full mr-3" />
                <span className="text-gray-800 dark:text-white">{user.name}</span>
              </div>
              <span className="font-semibold text-blue-600 dark:text-blue-400">{user.score} pts</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2 flex items-center text-gray-800 dark:text-white">
          <Award className="mr-2" /> Recent Achievements
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-lg flex items-center">
            <Award className="w-8 h-8 text-yellow-500 mr-3" />
            <div>
              <p className="font-semibold text-yellow-800 dark:text-yellow-200">Quiz Master</p>
              <p className="text-sm text-yellow-600 dark:text-yellow-300">Completed 10 quizzes</p>
            </div>
          </div>
          <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg flex items-center">
            <Flame className="w-8 h-8 text-purple-500 mr-3" />
            <div>
              <p className="font-semibold text-purple-800 dark:text-purple-200">Study Streak</p>
              <p className="text-sm text-purple-600 dark:text-purple-300">7 days in a row</p>
            </div>
          </div>
          <div className="bg-pink-100 dark:bg-pink-900 p-3 rounded-lg flex items-center">
            <Star className="w-8 h-8 text-pink-500 mr-3" />
            <div>
              <p className="font-semibold text-pink-800 dark:text-pink-200">Top Contributor</p>
              <p className="text-sm text-pink-600 dark:text-pink-300">Helped 5 peers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

