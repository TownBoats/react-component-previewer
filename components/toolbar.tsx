"use client"

import { useState } from "react"

import { useRef } from "react"
import { Copy, Check, Code } from "lucide-react"

interface ToolbarProps {
  code: string
  onFormatCode: () => void
}

export default function Toolbar({ code, onFormatCode }: ToolbarProps) {
  const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [copied, setCopied] = useState(false)

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)

      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current)
      }

      copyTimeoutRef.current = setTimeout(() => {
        setCopied(false)
      }, 2000)
    })
  }

  return (
    <div className="flex items-center space-x-2 p-2 bg-gray-800 border-b border-gray-700">
      <button onClick={handleCopyCode} className="editor-button flex items-center" title="复制代码">
        {copied ? (
          <>
            <Check className="h-4 w-4 mr-1" />
            <span>已复制</span>
          </>
        ) : (
          <>
            <Copy className="h-4 w-4 mr-1" />
            <span>复制</span>
          </>
        )}
      </button>

      <button onClick={onFormatCode} className="editor-button flex items-center" title="格式化代码">
        <Code className="h-4 w-4 mr-1" />
        <span>格式化</span>
      </button>
    </div>
  )
}
