"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"

export function PricingTable() {
  const [annual, setAnnual] = useState(true)

  const plans = [
    {
      name: "Basic",
      description: "Perfect for individuals just getting started",
      price: annual ? 12 : 15,
      features: [
        "Access to all basic courses",
        "Personalized learning path",
        "Progress tracking",
        "5 quizzes per month",
        "Email support",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      description: "Ideal for serious learners and professionals",
      price: annual ? 29 : 39,
      features: [
        "All Basic features",
        "Unlimited quizzes and assessments",
        "Advanced analytics",
        "Downloadable resources",
        "Priority support",
        "Learning community access",
      ],
      cta: "Get Started",
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For teams and organizations",
      price: "Custom",
      features: [
        "All Pro features",
        "Custom learning paths",
        "Dedicated account manager",
        "API access",
        "SSO integration",
        "Advanced reporting",
        "Custom branding",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex justify-center items-center space-x-4">
        <Label htmlFor="annual-billing" className={annual ? "text-muted-foreground" : ""}>
          Monthly
        </Label>
        <Switch id="annual-billing" checked={annual} onCheckedChange={setAnnual} />
        <div className="flex items-center">
          <Label htmlFor="annual-billing" className={!annual ? "text-muted-foreground" : ""}>
            Annual
          </Label>
          <div className="ml-2 text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">Save 20%</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            className={`rounded-xl border bg-card shadow-sm overflow-hidden ${
              plan.popular ? "border-primary md:scale-105 relative z-10" : ""
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {plan.popular && (
              <div className="bg-primary text-primary-foreground text-xs font-medium text-center py-1">
                Most Popular
              </div>
            )}

            <div className="p-6">
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <p className="text-muted-foreground mt-1.5 mb-4">{plan.description}</p>

              <div className="mb-6">
                {typeof plan.price === "number" ? (
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground ml-1.5">/month</span>
                  </div>
                ) : (
                  <div className="text-4xl font-bold">{plan.price}</div>
                )}
                {annual && typeof plan.price === "number" && (
                  <p className="text-sm text-muted-foreground mt-1">Billed annually (${plan.price * 12}/year)</p>
                )}
              </div>

              <Button
                className={`w-full ${plan.popular ? "bg-primary" : ""}`}
                variant={plan.popular ? "default" : "outline"}
                asChild
              >
                <Link href={plan.name === "Enterprise" ? "/contact" : "/signup"}>{plan.cta}</Link>
              </Button>
            </div>

            <div className="border-t p-6">
              <h4 className="font-medium mb-4">What's included:</h4>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-8">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="inline-flex items-center text-sm text-muted-foreground">
                Need help choosing? <HelpCircle className="h-4 w-4 ml-1" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">
                Contact our team for a personalized recommendation based on your learning goals.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}

