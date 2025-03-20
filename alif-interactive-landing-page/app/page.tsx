import Link from "next/link"
import { ArrowRight, BookOpen, Brain, BarChart, Users, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HeroAnimation } from "@/components/hero-animation"
import { FeatureCard } from "@/components/feature-card"
import { TestimonialCarousel } from "@/components/testimonial-carousel"
import { PricingTable } from "@/components/pricing-table"
import { InteractiveDemo } from "@/components/interactive-demo"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm font-medium mb-2">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                Introducing LearnSphere
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
                Master New Skills with <span className="text-primary">Interactive</span> Learning
              </h1>
              <p className="text-xl text-muted-foreground max-w-[600px]">
                Personalized learning paths, interactive assessments, and real-time progress tracking to help you
                achieve your educational goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <Button size="lg" asChild>
                  <Link href="/signup">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="#demo">Try Demo</Link>
                </Button>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                  <span>14-day free trial</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <HeroAnimation />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/50">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter mb-4">Reimagine How You Learn</h2>
            <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
              Our platform combines cutting-edge technology with proven learning methodologies to create an engaging
              educational experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Brain className="h-10 w-10 text-primary" />}
              title="Adaptive Learning Paths"
              description="Our AI analyzes your progress and learning style to create personalized learning paths that adapt as you grow."
            />
            <FeatureCard
              icon={<BookOpen className="h-10 w-10 text-primary" />}
              title="Interactive Content"
              description="Engage with dynamic content including simulations, interactive exercises, and multimedia lessons."
            />
            <FeatureCard
              icon={<BarChart className="h-10 w-10 text-primary" />}
              title="Progress Tracking"
              description="Visualize your learning journey with detailed analytics and insights on your strengths and areas for improvement."
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-primary" />}
              title="Collaborative Learning"
              description="Connect with peers, join study groups, and participate in discussions to enhance your understanding."
            />
            <FeatureCard
              icon={<BookOpen className="h-10 w-10 text-primary" />}
              title="Expert-Crafted Curriculum"
              description="Learn from comprehensive curricula designed by industry experts and educational professionals."
            />
            <FeatureCard
              icon={<Brain className="h-10 w-10 text-primary" />}
              title="Spaced Repetition"
              description="Our system uses proven memory techniques to help you retain information more effectively."
            />
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section id="demo" className="py-20">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter mb-4">Experience Interactive Learning</h2>
            <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
              Try our interactive demo to see how LearnSphere transforms the learning experience.
            </p>
          </div>

          <InteractiveDemo />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/50">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter mb-4">What Our Learners Say</h2>
            <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
              Join thousands of satisfied learners who have transformed their educational journey with LearnSphere.
            </p>
          </div>

          <TestimonialCarousel />
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
              Choose the plan that fits your learning needs. All plans include access to our core features.
            </p>
          </div>

          <PricingTable />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center lg:text-left">
              <h2 className="text-3xl font-bold tracking-tighter">Ready to Transform Your Learning?</h2>
              <p className="text-xl max-w-[600px] text-primary-foreground/80">
                Join thousands of learners who are achieving their educational goals with LearnSphere.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/signup">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-background">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
                <span className="font-bold text-xl">LearnSphere</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                Transforming education with interactive, personalized learning experiences.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-3">Platform</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#features" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/enterprise"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Enterprise
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-3">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/documentation"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/guides" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Learning Guides
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-3">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} LearnSphere. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy
              </Link>
              <Link href="/cookies" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

