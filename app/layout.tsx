import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/lib/language-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "React Component Preview - Test and visualize React components instantly",
  description:
    "A powerful tool for previewing React components with support for Tailwind CSS, ECharts, Lucide icons, and D3.js",
  keywords: "React, component, preview, Tailwind CSS, ECharts, Lucide, D3.js, development tool",
  authors: [{ name: "React Component Preview Team" }],
  openGraph: {
    title: "React Component Preview",
    description: "Test and visualize React components instantly",
    type: "website",
    locale: "en_US",
    url: "https://react-preview.com/",
    siteName: "React Component Preview",
  },
  twitter: {
    card: "summary_large_image",
    title: "React Component Preview",
    description: "Test and visualize React components instantly",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
