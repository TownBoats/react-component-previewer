"use client"

import { useState, useRef, useEffect, Suspense } from "react"
import dynamic from "next/dynamic"
import Header from "./header"
import Preview from "./preview"
import ExampleLoader from "./example-loader"
import { useLanguage } from "@/lib/language-context"

// 动态导入 Monaco 编辑器，避免 SSR 问题
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => <p className="p-4">加载编辑器中...</p>,
})

// 默认示例代码 - 英文版
const DEFAULT_CODE_EN = `// This is a simple React component example
// You can edit the code here, and see the rendered result on the right

import React from 'react';
import { Sparkles } from 'lucide-react';

export default function WelcomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-4 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white opacity-10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-white opacity-10 rounded-full blur-xl"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl"></div>
      </div>
      
      {/* Main content card */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl p-8 max-w-lg text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
          Welcome to React Preview
        </h1>
        
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg border border-indigo-100 mb-8">
          <p className="text-lg text-gray-700 leading-relaxed">
            This is a preview page. Modify or paste code on the left to see it rendered!
          </p>
        </div>
        
        <div className="flex justify-center space-x-4">
          <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
            Get Started
          </button>
          <button className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-lg shadow-md border border-indigo-200 hover:border-indigo-400 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
            View Docs
          </button>
        </div>
      </div>
      
      <div className="mt-10 text-white text-sm opacity-80 flex items-center">
        <p>Built with React + Tailwind CSS</p>
        <span className="mx-2">•</span>
        <p>Elegant design, efficient development</p>
      </div>
    </div>
  );
}`

// 默认示例代码 - 中文版
const DEFAULT_CODE_ZH = `// 这是一个简单的 React 组件示例
// 您可以在这里编辑代码，右侧会实时显示渲染结果

import React from 'react';
import { Sparkles } from 'lucide-react';

export default function WelcomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-4 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white opacity-10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-white opacity-10 rounded-full blur-xl"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl"></div>
      </div>
      
      {/* Main content card */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl p-8 max-w-lg text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
          欢迎使用 React Preview
        </h1>
        
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg border border-indigo-100 mb-8">
          <p className="text-lg text-gray-700 leading-relaxed">
            这是一个预览页面，请修改或者粘贴左侧代码来预览吧！
          </p>
        </div>
        
        <div className="flex justify-center space-x-4">
          <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
            开始使用
          </button>
          <button className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-lg shadow-md border border-indigo-200 hover:border-indigo-400 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
            查看文档
          </button>
        </div>
      </div>
      
      <div className="mt-10 text-white text-sm opacity-80 flex items-center">
        <p>使用 React + Tailwind CSS 构建</p>
        <span className="mx-2">•</span>
        <p>设计精美，开发高效</p>
      </div>
    </div>
  );
}`

// 防抖函数
function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export default function Editor() {
  const { language, t } = useLanguage()
  const [code, setCode] = useState(language === "en" ? DEFAULT_CODE_EN : DEFAULT_CODE_ZH) // 直接初始化代码
  const [editorWidth, setEditorWidth] = useState(50) // 编辑器宽度百分比
  const [editorMounted, setEditorMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const resizerRef = useRef<HTMLDivElement>(null)
  const isResizing = useRef(false)
  const editorRef = useRef<any>(null)
  const prevLanguageRef = useRef(language)

  // 当语言改变时，如果代码是默认代码，则切换语言版本
  useEffect(() => {
    if (prevLanguageRef.current !== language) {
      const isDefaultCodeEn = code === DEFAULT_CODE_EN
      const isDefaultCodeZh = code === DEFAULT_CODE_ZH

      if (isDefaultCodeEn || isDefaultCodeZh) {
        setCode(language === "en" ? DEFAULT_CODE_EN : DEFAULT_CODE_ZH)
      }

      prevLanguageRef.current = language
    }
  }, [language, code])

  // 处理编辑器内容变化
  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value)
    }
  }

  // 加载示例代码
  const handleLoadExample = (exampleCode: string) => {
    setCode(exampleCode)
  }

  // 处理编辑器挂载
  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor
    setEditorMounted(true)

    // 添加一个小延迟，确保编辑器完全加载
    setTimeout(() => {
      if (editor) {
        editor.focus()

        // 确保编辑器布局正确
        editor.layout()

        // 配置编辑器选项
        monaco.editor.defineTheme("customDarkTheme", {
          base: "vs-dark",
          inherit: true,
          rules: [],
          colors: {
            "editor.background": "#1e1e1e",
          },
        })

        monaco.editor.setTheme("customDarkTheme")

        // 允许粘贴
        const editorDomNode = editor.getDomNode()
        if (editorDomNode) {
          // 尝试解决粘贴权限问题
          editorDomNode.addEventListener("paste", (e) => {
            // 不阻止默认行为
          })

          // 添加全局粘贴事件监听器
          document.addEventListener("paste", (e) => {
            if (document.activeElement === editorDomNode || editorDomNode.contains(document.activeElement)) {
              // 不阻止默认行为
            }
          })
        }
      }
    }, 100)
  }

  // 防抖处理的布局更新
  const updateEditorLayout = debounce(() => {
    if (editorRef.current && editorRef.current.layout) {
      editorRef.current.layout()
    }
  }, 100)

  // 处理分隔条拖动
  useEffect(() => {
    const resizer = resizerRef.current
    const container = containerRef.current

    if (!resizer || !container) return

    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault()
      isResizing.current = true
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    // 使用防抖处理鼠标移动事件
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing.current || !container) return

      const containerRect = container.getBoundingClientRect()
      const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100

      // 限制最小和最大宽度
      const clampedWidth = Math.min(Math.max(newWidth, 20), 80)
      setEditorWidth(clampedWidth)
    }

    const handleMouseUp = () => {
      isResizing.current = false
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)

      // 调整完成后更新编辑器布局
      updateEditorLayout()

      // 重新聚焦编辑器
      if (editorRef.current) {
        editorRef.current.focus()
      }
    }

    resizer.addEventListener("mousedown", handleMouseDown)

    return () => {
      resizer.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  // 监听窗口大小变化，更新编辑器布局
  useEffect(() => {
    const handleResize = debounce(() => {
      updateEditorLayout()
    }, 100)

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // 监听编辑器宽度变化，更新布局
  useEffect(() => {
    if (editorMounted) {
      updateEditorLayout()
    }
  }, [editorWidth, editorMounted])

  // 处理 ResizeObserver 错误
  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      if (event.message.includes("ResizeObserver")) {
        event.stopImmediatePropagation()
      }
    }

    window.addEventListener("error", errorHandler)

    return () => {
      window.removeEventListener("error", errorHandler)
    }
  }, [])

  return (
    <>
      <Header />
      {/* 使用 Suspense 包裹 ExampleLoader 组件 */}
      <Suspense fallback={<div className="hidden">Loading...</div>}>
        <ExampleLoader onLoadExample={handleLoadExample} />
      </Suspense>
      <div ref={containerRef} className="flex editor-container">
        {/* 代码编辑器 */}
        <div style={{ width: `${editorWidth}%` }} className="h-full">
          <MonacoEditor
            height="100%"
            language="javascript"
            theme="vs-dark"
            value={code}
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: "on",
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              copyWithSyntaxHighlighting: true,
              contextmenu: true, // 启用右键菜单
              quickSuggestions: true,
              snippetSuggestions: "on",
              suggestOnTriggerCharacters: true,
              // 允许粘贴
              "editor.defaultFormatter": null,
              "editor.formatOnPaste": false,
              "editor.formatOnType": false,
            }}
          />
        </div>

        {/* 分隔条 */}
        <div ref={resizerRef} className="resizer h-full" />

        {/* 预览区域 */}
        <div style={{ width: `${100 - editorWidth}%` }} className="h-full bg-gray-50">
          <Preview code={code} />
        </div>
      </div>
    </>
  )
}
