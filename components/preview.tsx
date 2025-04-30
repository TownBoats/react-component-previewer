"use client"

import React, { useState, useEffect, useRef } from "react"
import { transform } from "@babel/standalone"
import * as LucideIcons from "lucide-react"
// 导入Recharts组件
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import { useLanguage } from "@/lib/language-context"

/**
 * 支持的库:
 * 1. React核心功能: 包括所有React钩子 (useState, useEffect, useRef等)
 * 2. Lucide React: 完全支持, 可以导入并正确渲染各种图标
 * 3. Recharts: 完全支持, 可以创建并预览各种图表组件
 * 4. Tailwind CSS: 支持核心预定义工具类 (不支持任意值语法如 w-[42rem])
 */

// 防抖函数
function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// 创建一个安全的执行环境
const createSafeEval = (code: string) => {
  try {
    // 提取导入语句
    const importRegex = /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from\s+?)|)(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g
    const imports = code.match(importRegex) || []

    // 提取 Lucide 图标导入
    const lucideImports: string[] = []
    imports.forEach((importStmt) => {
      if (importStmt.includes("lucide-react")) {
        const match = importStmt.match(/import\s+{([^}]+)}\s+from\s+['"]lucide-react['"]/)
        if (match && match[1]) {
          const icons = match[1].split(",").map((icon) => icon.trim())
          lucideImports.push(...icons)
        }
      }
    })

    // 提取 React 钩子导入
    const reactHooks: string[] = []
    imports.forEach((importStmt) => {
      if (importStmt.includes("'react'") || importStmt.includes('"react"')) {
        const match = importStmt.match(/import\s+(?:React,\s*)?{([^}]+)}\s+from\s+['"]react['"]/)
        if (match && match[1]) {
          const hooks = match[1].split(",").map((hook) => hook.trim())
          reactHooks.push(...hooks)
        }
      }
    })

    // 提取 Recharts 组件导入
    const rechartsImports: string[] = []
    imports.forEach((importStmt) => {
      if (importStmt.includes("'recharts'") || importStmt.includes('"recharts"')) {
        const match = importStmt.match(/import\s+{([^}]+)}\s+from\s+['"]recharts['"]/)
        if (match && match[1]) {
          const components = match[1].split(",").map((component) => component.trim())
          rechartsImports.push(...components)
        }
      }
    })

    // 移除导入语句
    let processedCode = code.replace(importRegex, "")

    // 为 Lucide 图标创建变量声明
    let iconDeclarations = ""
    lucideImports.forEach((icon) => {
      iconDeclarations += `const ${icon} = LucideIcons.${icon};\n`
    })

    // 添加 React 声明
    const reactDeclaration = `
      const React = ReactModule;
    `

    // 添加 React Hooks 声明
    const reactHooksDeclaration = `
      const { ${reactHooks.join(", ") || "useState, useEffect, useRef, useCallback, useMemo, useReducer, useContext, useLayoutEffect"} } = ReactModule;
    `

    // 添加Recharts组件声明
    const rechartsDeclaration = `
      const { ${rechartsImports.join(", ") || "LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area"} } = RechartsComponents;
    `

    // 提取并处理导出语句
    let componentName = ""
    const exportDefaultRegex = /export\s+default\s+(\w+)/
    const exportMatch = processedCode.match(exportDefaultRegex)

    if (exportMatch && exportMatch[1]) {
      componentName = exportMatch[1]
      // 替换 export default ComponentName 为 __COMPONENT__ = ComponentName
      processedCode = processedCode.replace(exportDefaultRegex, "__COMPONENT__ = $1")
    } else {
      // 处理箭头函数或匿名函数导出
      const arrowFunctionExportRegex =
        /export\s+default\s+(?:function\s*$$[^)]*$$|(?:const|let|var)?\s*\w*\s*=\s*(?:function\s*$$[^)]*$$|[^=>]*=>))/
      if (arrowFunctionExportRegex.test(processedCode)) {
        processedCode = processedCode.replace(/export\s+default\s+/, "__COMPONENT__ = ")
      }
    }

    // 移除其他类型的导出语句
    const exportRegex = /export\s+(?:const|let|var|function|class)\s+/g
    processedCode = processedCode.replace(exportRegex, "const ")

    // 添加组件识别逻辑
    processedCode += `
      // 尝试识别组件
      if (typeof __COMPONENT__ === 'undefined') {
        // 查找定义的组件
        const componentNames = Object.keys(this).filter(key => 
          typeof this[key] === 'function' && 
          /^[A-Z]/.test(key) // React 组件通常以大写字母开头
        );
        
        if (componentNames.length > 0) {
          // 使用最后定义的组件作为默认组件
          const lastComponentName = componentNames[componentNames.length - 1];
          __COMPONENT__ = this[lastComponentName];
        }
      }
    `

    // 使用 Babel 转换 JSX
    const transformedCode = transform(
      reactDeclaration + reactHooksDeclaration + rechartsDeclaration + iconDeclarations + processedCode,
      {
        presets: ["react"],
        filename: "component.jsx",
      },
    ).code

    if (!transformedCode) {
      throw new Error("代码转换失败")
    }

    // 创建一个安全的执行环境
    const safeEval = new Function(
      "ReactModule",
      "LucideIcons",
      "RechartsComponents",
      `
        try {
          ${transformedCode}
          return { default: typeof __COMPONENT__ !== 'undefined' ? __COMPONENT__ : null };
        } catch (error) {
          console.error("执行代码时出错:", error);
          return { error };
        }
      `,
    )

    return safeEval
  } catch (error) {
    console.error("编译错误:", error)
    return () => ({ error })
  }
}

interface PreviewProps {
  code: string
}

export default function Preview({ code }: PreviewProps) {
  const { t } = useLanguage()
  const [Component, setComponent] = useState<React.ComponentType | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true) // 添加明确的加载状态
  const previewRef = useRef<HTMLDivElement>(null)
  const codeRef = useRef<string>(code) // 保存当前代码的引用

  // 立即设置代码引用，确保始终使用最新的代码
  useEffect(() => {
    codeRef.current = code
  }, [code])

  // 直接定义评估代码的函数，不使用 useRef 和 debounce
  const evaluateCode = (code: string) => {
    try {
      console.log("评估代码中...")
      const safeEval = createSafeEval(code)

      // 创建Recharts组件对象
      const rechartsComponents = {
        LineChart,
        Line,
        BarChart,
        Bar,
        XAxis,
        YAxis,
        CartesianGrid,
        Tooltip,
        Legend,
        ResponsiveContainer,
        PieChart,
        Pie,
        Cell,
        AreaChart,
        Area,
      }

      // 执行代码，传入React和Recharts组件
      const result = safeEval(React, LucideIcons, rechartsComponents)

      if (result.error) {
        console.error("执行错误:", result.error)
        setError(`${t("executionError")} ${result.error.message || t("previewError")}`)
        setComponent(null)
      } else if (!result.default || typeof result.default !== "function") {
        setError(t("componentNotFound"))
        setComponent(null)
      } else {
        console.log("组件识别成功:", result.default.name || "匿名组件")
        setComponent(() => result.default)
        setError(null)
      }
    } catch (err: any) {
      console.error("预览错误:", err)
      setError(`${t("previewError")} ${err.message || t("previewError")}`)
      setComponent(null)
    } finally {
      // 无论成功或失败，都结束加载状态
      setIsLoading(false)
    }
  }

  // 使用防抖处理代码变化
  const debouncedEvaluate = useRef(
    debounce((code: string) => {
      evaluateCode(code)
    }, 500),
  ).current

  // 初始化评估
  useEffect(() => {
    // 初始化时立即评估一次代码
    evaluateCode(code)
  }, [])

  // 监听代码变化
  useEffect(() => {
    debouncedEvaluate(code)
  }, [code, debouncedEvaluate])

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
    <div ref={previewRef} className="preview-container h-full">
      {error ? (
        <div className="preview-error">{error}</div>
      ) : Component ? (
        <div className="preview-content">
          <div className="preview-wrapper">
            {/* @ts-ignore */}
            <Component />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500">
          {isLoading ? t("loadingPreview") : t("componentNotFound")}
        </div>
      )}
    </div>
  )
}
