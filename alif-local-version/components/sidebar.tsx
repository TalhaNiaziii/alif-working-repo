"use client"
import { Book, FileText, Trophy, User, Settings, LogOut, MessageSquare, FileIcon as FilePdf } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"

export default function Sidebar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  const isActive = (path: string) => pathname === path

  const menuItems = [
    {
      name: "Study Assistant",
      icon: Book,
      path: "/study-assistant",
      tooltip: "Generate quizzes, flashcards, and summaries",
    },
    { name: "Assignments", icon: FileText, path: "/assignments", tooltip: "AI-assisted writing & feedback" },
    { name: "Progress", icon: Trophy, path: "/progress", tooltip: "View leaderboard, study streaks, and achievements" },
    { name: "Profile", icon: User, path: "/profile", tooltip: "Manage your profile" },
  ]

  return (
    <aside className="w-64 content-layer-darker p-4 flex flex-col border-r border-white/20 dark:border-gray-700/20 transition-colors duration-300">
      <div className="flex items-center mb-8">
        <img src="/placeholder.svg?height=32&width=32" alt="Alif Logo" className="w-8 h-8 mr-2" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Alif</h1>
      </div>
      <nav className="flex-grow">
        <div className="mb-6">
          <div className="px-2 mb-4">
            <h2 className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Main</h2>
          </div>
          <ul className="space-y-1">
            <li>
              <Link
                href="/chat"
                className={`flex items-center p-2 text-gray-700 dark:text-gray-200 hover:bg-white/10 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-200 group ${
                  pathname === "/chat" ? "bg-blue-600/20 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400" : ""
                }`}
              >
                <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-lg transition-transform group-hover:scale-110">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <span className="font-medium">AI Chat</span>
                {pathname === "/chat" && (
                  <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                    <span className="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400" />
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <div className="px-2 mb-4">
            <h2 className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Tools</h2>
          </div>
          <ul className="space-y-1">
            <li>
              <Link
                href="/study-assistant"
                className={`flex items-center p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 group ${
                  pathname === "/study-assistant"
                    ? "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                    : ""
                }`}
              >
                <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-purple-400 to-purple-600 text-white shadow-lg transition-transform group-hover:scale-110">
                  <Book className="h-4 w-4" />
                </div>
                <span className="font-medium">Study Assistant</span>
              </Link>
            </li>
            <li>
              <Link
                href="/assignments"
                className={`flex items-center p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 group ${
                  pathname === "/assignments"
                    ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                    : ""
                }`}
              >
                <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-green-400 to-green-600 text-white shadow-lg transition-transform group-hover:scale-110">
                  <FileText className="h-4 w-4" />
                </div>
                <span className="font-medium">Assignments</span>
              </Link>
            </li>
            <li>
              <Link
                href="/progress"
                className={`flex items-center p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 group ${
                  pathname === "/progress"
                    ? "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400"
                    : ""
                }`}
              >
                <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-lg transition-transform group-hover:scale-110">
                  <Trophy className="h-4 w-4" />
                </div>
                <span className="font-medium">Progress</span>
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="px-2 mb-4">
            <h2 className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              Recent Files
            </h2>
          </div>
          <ul className="space-y-1">
            <li>
              <button className="w-full flex items-center p-2 text-gray-700 dark:text-gray-200 hover:bg-white/10 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-200 group">
                <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-red-400 to-red-600 text-white shadow-lg transition-transform group-hover:scale-110">
                  <FilePdf className="h-4 w-4" />
                </div>
                <div className="flex-1 truncate text-left">
                  <span className="font-medium block truncate">Physics Notes.pdf</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">2.5 MB • 2 hours ago</span>
                </div>
              </button>
            </li>
            <li>
              <button className="w-full flex items-center p-2 text-gray-700 dark:text-gray-200 hover:bg-white/10 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-200 group">
                <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-lg transition-transform group-hover:scale-110">
                  <FileText className="h-4 w-4" />
                </div>
                <div className="flex-1 truncate text-left">
                  <span className="font-medium block truncate">Math Assignment.docx</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">1.2 MB • 5 hours ago</span>
                </div>
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <div className="mt-auto">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">Dark Mode</span>
          <Switch checked={theme === "dark"} onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")} />
        </div>
        <Link
          href="/settings"
          className={`flex items-center p-2 text-gray-700 dark:text-gray-200 hover:bg-white/10 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-200 ${
            isActive("/settings") ? "bg-white/20 dark:bg-gray-800/50" : ""
          }`}
        >
          <Settings className="w-5 h-5 mr-3" />
          Settings
        </Link>
        <button
          className="flex items-center p-2 text-red-600 hover:bg-white/10 dark:hover:bg-gray-800/50 rounded-lg mt-2 w-full transition-all duration-200"
          onClick={() => {
            /* Add logout functionality */
          }}
        >
          <LogOut className="w-5 h-5 mr-3" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}

