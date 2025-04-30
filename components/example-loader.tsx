"use client"

import { useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { examples } from "@/lib/examples"

interface ExampleLoaderProps {
  onLoadExample: (code: string) => void
}

export default function ExampleLoader({ onLoadExample }: ExampleLoaderProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const exampleId = searchParams.get("example")

  useEffect(() => {
    if (exampleId && examples[exampleId as keyof typeof examples]) {
      onLoadExample(examples[exampleId as keyof typeof examples])

      // 清除 URL 参数
      router.replace("/")
    }
  }, [exampleId, onLoadExample, router])

  return null
}
