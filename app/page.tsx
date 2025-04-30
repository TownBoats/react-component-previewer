import { Suspense } from "react"
import Editor from "@/components/editor"

export default function Home() {
  return (
    <main className="h-screen flex flex-col">
      <Suspense fallback={<div>Loading editor...</div>}>
        <Editor />
      </Suspense>
    </main>
  )
}
