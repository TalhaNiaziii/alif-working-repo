"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { BookOpen, BarChart, Users, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CourseCard } from "@/components/course-card"
import { LineChart } from "@/components/line-chart"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 alif-text-gradient">Welcome back, Alex</h1>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Learning Progress"
              value="68%"
              icon={<BarChart className="h-5 w-5 text-primary" />}
              description="7 of 12 modules completed"
            >
              <Progress value={68} className="mt-2" />
            </StatCard>

            <StatCard
              title="Active Courses"
              value="4"
              icon={<BookOpen className="h-5 w-5 text-primary" />}
              description="2 courses nearly complete"
            />

            <StatCard
              title="Learning Streak"
              value="12 days"
              icon={<Clock className="h-5 w-5 text-primary" />}
              description="Keep it up!"
            />

            <StatCard
              title="Community Rank"
              value="#42"
              icon={<Users className="h-5 w-5 text-primary" />}
              description="Top 5% of learners"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <LineChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
              </CardHeader>
              <CardContent>{/* Add a list of upcoming deadlines here */}</CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="courses" className="space-y-8">
          <h2 className="text-2xl font-semibold mb-4">My Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CourseCard
              title="Introduction to Machine Learning"
              progress={75}
              image="/placeholder.svg?height=200&width=300"
            />
            <CourseCard
              title="Advanced Data Visualization"
              progress={45}
              image="/placeholder.svg?height=200&width=300"
            />
            <CourseCard
              title="Web Development Fundamentals"
              progress={90}
              image="/placeholder.svg?height=200&width=300"
            />
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-8">
          <h2 className="text-2xl font-semibold mb-4">Learning Analytics</h2>
          <Card>
            <CardContent className="pt-6">
              <LineChart />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function StatCard({
  title,
  value,
  icon,
  description,
  children,
}: {
  title: string
  value: string
  icon: React.ReactNode
  description: string
  children?: React.ReactNode
}) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <h3 className="text-2xl font-bold mt-1">{value}</h3>
            </div>
            <div className="p-2 bg-primary/10 rounded-full">{icon}</div>
          </div>
          {children}
          <p className="text-xs text-muted-foreground mt-2">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

