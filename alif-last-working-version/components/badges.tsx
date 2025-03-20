import { Award } from "lucide-react"
import { motion } from "framer-motion"

interface Badge {
  id: string
  name: string
  description: string
  achieved: boolean
  icon: string
}

const badges: Badge[] = [
  { id: "1", name: "First Step", description: "Complete your first lesson", achieved: true, icon: "🥇" },
  { id: "2", name: "Quick Learner", description: "Complete 5 lessons in a day", achieved: false, icon: "🚀" },
  { id: "3", name: "Consistent", description: "Maintain a 7-day streak", achieved: false, icon: "🔥" },
  { id: "4", name: "Quiz Master", description: "Score 100% in 5 quizzes", achieved: false, icon: "🧠" },
]

export default function Badges() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow"
    >
      <h2 className="text-2xl font-bold mb-4 flex items-center text-gray-800 dark:text-white">
        <Award className="mr-2" /> My Badges
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {badges.map((badge, index) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`p-4 rounded-lg ${badge.achieved ? "bg-blue-100 dark:bg-blue-900" : "bg-gray-100 dark:bg-gray-700"}`}
          >
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-2">{badge.icon}</span>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{badge.name}</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">{badge.description}</p>
            {badge.achieved ? (
              <span className="inline-block mt-2 text-sm text-green-600 dark:text-green-400">Achieved</span>
            ) : (
              <span className="inline-block mt-2 text-sm text-gray-500 dark:text-gray-400">Not yet achieved</span>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

