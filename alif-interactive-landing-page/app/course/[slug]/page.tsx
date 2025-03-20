"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Clock, Users, BarChart, CheckCircle, Play, Download, ArrowLeft, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function CoursePage({ params }: { params: { slug: string } }) {
  const [activeTab, setActiveTab] = useState("content")

  // Mock course data - in a real app, this would be fetched from an API
  const course = {
    title: "Data Science Fundamentals",
    description:
      "Learn the core concepts and tools of data science, including statistical analysis, data visualization, and machine learning fundamentals.",
    instructor: {
      name: "Dr. Sarah Johnson",
      title: "Data Science Professor",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    stats: {
      students: 12453,
      rating: 4.8,
      reviews: 342,
      duration: "8 weeks",
    },
    progress: 35,
    modules: [
      {
        title: "Introduction to Data Science",
        duration: "45 min",
        completed: true,
        lessons: [
          { title: "What is Data Science?", duration: "10 min", completed: true },
          { title: "The Data Science Process", duration: "15 min", completed: true },
          { title: "Tools and Technologies", duration: "20 min", completed: true },
        ],
      },
      {
        title: "Statistical Foundations",
        duration: "1h 30min",
        completed: true,
        lessons: [
          { title: "Descriptive Statistics", duration: "25 min", completed: true },
          { title: "Probability Distributions", duration: "30 min", completed: true },
          { title: "Hypothesis Testing", duration: "35 min", completed: true },
        ],
      },
      {
        title: "Data Visualization",
        duration: "2h 15min",
        completed: false,
        lessons: [
          { title: "Principles of Data Visualization", duration: "30 min", completed: true },
          { title: "Creating Effective Charts", duration: "45 min", completed: true },
          { title: "Interactive Visualizations", duration: "30 min", completed: false },
          { title: "Dashboard Design", duration: "30 min", completed: false },
        ],
      },
      {
        title: "Introduction to Machine Learning",
        duration: "3h",
        completed: false,
        lessons: [
          { title: "Supervised vs. Unsupervised Learning", duration: "30 min", completed: false },
          { title: "Regression Models", duration: "45 min", completed: false },
          { title: "Classification Models", duration: "45 min", completed: false },
          { title: "Model Evaluation", duration: "30 min", completed: false },
          { title: "Feature Engineering", duration: "30 min", completed: false },
        ],
      },
      {
        title: "Practical Applications",
        duration: "2h 30min",
        completed: false,
        lessons: [
          { title: "Real-world Case Studies", duration: "45 min", completed: false },
          { title: "Building a Data Science Portfolio", duration: "30 min", completed: false },
          { title: "Ethical Considerations", duration: "30 min", completed: false },
          { title: "Final Project", duration: "45 min", completed: false },
        ],
      },
    ],
  }

  return (
    <div className="container px-4 md:px-6 py-8 max-w-7xl">
      <Button variant="ghost" size="sm" className="mb-6" asChild>
        <Link href="/dashboard">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">{course.title}</h1>
                <p className="text-muted-foreground">{course.description}</p>
              </div>

              <div className="flex items-center space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
                  <AvatarFallback>
                    {course.instructor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{course.instructor.name}</div>
                  <div className="text-sm text-muted-foreground">{course.instructor.title}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-muted rounded-lg p-3 text-center">
                  <div className="flex justify-center mb-1">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-sm font-medium">{course.stats.students.toLocaleString()} Students</div>
                </div>
                <div className="bg-muted rounded-lg p-3 text-center">
                  <div className="flex justify-center mb-1">
                    <div className="text-primary">⭐</div>
                  </div>
                  <div className="text-sm font-medium">
                    {course.stats.rating} Rating ({course.stats.reviews} reviews)
                  </div>
                </div>
                <div className="bg-muted rounded-lg p-3 text-center">
                  <div className="flex justify-center mb-1">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-sm font-medium">{course.stats.duration}</div>
                </div>
                <div className="bg-muted rounded-lg p-3 text-center">
                  <div className="flex justify-center mb-1">
                    <BarChart className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-sm font-medium">{course.progress}% Complete</div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>{course.progress}% complete</span>
                  <span>{course.progress < 100 ? `${100 - course.progress}% remaining` : "Completed"}</span>
                </div>
                <Progress value={course.progress} />
              </div>

              <div className="flex space-x-4">
                <Button className="flex-1">
                  <Play className="mr-2 h-4 w-4" />
                  Continue Learning
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download Materials
                </Button>
              </div>
            </div>
          </motion.div>

          <div className="mt-8">
            <Tabs defaultValue="content" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="content">Course Content</TabsTrigger>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="discussion">Discussion</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-6 mt-6">
                <div className="space-y-4">
                  {course.modules.map((module, moduleIndex) => (
                    <motion.div
                      key={moduleIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: moduleIndex * 0.1 }}
                    >
                      <Card>
                        <CardContent className="p-0">
                          <div className="p-4 border-b flex justify-between items-center">
                            <div className="flex items-center">
                              <div
                                className={`h-6 w-6 rounded-full mr-3 flex items-center justify-center ${
                                  module.completed ? "bg-green-100 text-green-600" : "bg-muted text-muted-foreground"
                                }`}
                              >
                                {module.completed ? (
                                  <CheckCircle className="h-4 w-4" />
                                ) : (
                                  <span className="text-xs">{moduleIndex + 1}</span>
                                )}
                              </div>
                              <div>
                                <h3 className="font-medium">{module.title}</h3>
                                <div className="text-sm text-muted-foreground">{module.duration}</div>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              {module.completed ? "Review" : "Start"}
                            </Button>
                          </div>

                          <div className="divide-y">
                            {module.lessons.map((lesson, lessonIndex) => (
                              <div key={lessonIndex} className="p-4 flex justify-between items-center">
                                <div className="flex items-center">
                                  <div
                                    className={`h-5 w-5 rounded-full mr-3 flex items-center justify-center ${
                                      lesson.completed
                                        ? "bg-green-100 text-green-600"
                                        : "bg-muted text-muted-foreground"
                                    }`}
                                  >
                                    {lesson.completed ? (
                                      <CheckCircle className="h-3 w-3" />
                                    ) : (
                                      <Play className="h-3 w-3" />
                                    )}
                                  </div>
                                  <div className="text-sm">{lesson.title}</div>
                                </div>
                                <div className="text-sm text-muted-foreground">{lesson.duration}</div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="overview" className="space-y-6 mt-6">
                <div className="prose dark:prose-invert max-w-none">
                  <h2>About This Course</h2>
                  <p>
                    Data Science is one of the hottest fields in tech today, and this course will give you a
                    comprehensive introduction to all of its core concepts. Whether you're interested in pursuing a
                    career in data science or simply want to understand the fundamentals, this course is designed to
                    provide you with the knowledge and skills you need.
                  </p>

                  <h3>What You'll Learn</h3>
                  <ul>
                    <li>Understand the core concepts and workflow of data science</li>
                    <li>Apply statistical methods to analyze and interpret data</li>
                    <li>Create compelling data visualizations that tell a story</li>
                    <li>Build and evaluate machine learning models</li>
                    <li>Apply data science techniques to real-world problems</li>
                  </ul>

                  <h3>Prerequisites</h3>
                  <p>
                    This course is designed for beginners, but some familiarity with basic mathematics and programming
                    concepts will be helpful. We'll cover everything you need to know, but prior experience with:
                  </p>
                  <ul>
                    <li>Basic algebra and statistics</li>
                    <li>Any programming language (Python preferred)</li>
                    <li>Working with data in spreadsheets</li>
                  </ul>
                  <p>will make your learning experience smoother.</p>

                  <h3>Course Structure</h3>
                  <p>
                    The course is divided into 5 modules, each focusing on a different aspect of data science. Each
                    module includes video lectures, readings, quizzes, and hands-on exercises to help you apply what
                    you've learned.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="discussion" className="space-y-6 mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-medium">Course Discussion</h3>
                      <Button>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        New Post
                      </Button>
                    </div>

                    <div className="text-center py-8">
                      <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h4 className="text-lg font-medium mb-2">Join the Conversation</h4>
                      <p className="text-muted-foreground max-w-md mx-auto mb-6">
                        Connect with fellow learners, ask questions, and share insights about the course material.
                      </p>
                      <Button>View Discussion Forum</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="sticky top-20">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Your Progress</h3>
                  <Progress value={course.progress} className="mb-2" />
                  <p className="text-sm text-muted-foreground">You've completed {course.progress}% of the course</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Continue Learning</h3>
                  <div className="bg-muted rounded-lg p-4">
                    <h4 className="font-medium mb-1">Interactive Visualizations</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Learn how to create interactive data visualizations that allow users to explore data dynamically.
                    </p>
                    <Button className="w-full">
                      <Play className="mr-2 h-4 w-4" />
                      Start Lesson
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Resources</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="#" className="text-sm text-primary hover:underline flex items-center">
                        <Download className="h-4 w-4 mr-2" />
                        Course Syllabus
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-sm text-primary hover:underline flex items-center">
                        <Download className="h-4 w-4 mr-2" />
                        Data Science Cheat Sheet
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-sm text-primary hover:underline flex items-center">
                        <Download className="h-4 w-4 mr-2" />
                        Python Code Examples
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium mb-2">Need Help?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Have questions about the course material or need technical support?
                  </p>
                  <div className="flex space-x-2">
                    <Button variant="outline" className="flex-1">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Ask a Question
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Contact Support
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

