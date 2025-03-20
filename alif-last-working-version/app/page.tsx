import { headers } from "next/headers"
import { redirect } from "next/navigation"
import LandingPage from "@/components/marketing/landing-page"

export default function Home() {
  // Check if user is authenticated
  const headersList = headers()
  const hasAuthCookie = headersList.get("cookie")?.includes("auth-token")

  if (hasAuthCookie) {
    redirect("/app")
  }

  return <LandingPage />
}

