import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Naz Beauty Zone - Where Beauty Meets Elegance",
  description: "Expert care in makeup, hair, and skincare—crafted just for you. Located in Pandua, West Bengal.",
  generator: "v0.app",
  keywords: "beauty parlour, makeup, hair styling, skincare, bridal packages, Pandua, West Bengal",
  openGraph: {
    title: "Naz Beauty Zone - Where Beauty Meets Elegance",
    description: "Expert care in makeup, hair, and skincare—crafted just for you.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${playfair.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
