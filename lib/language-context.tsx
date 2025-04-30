"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { translations } from "./translations"

type Language = "en" | "zh"
type TranslationKey = keyof typeof translations.en

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  // 默认为中文
  const [language, setLanguageState] = useState<Language>("zh")

  // 使用 useEffect 确保只在客户端执行
  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem("language") as Language
      if (savedLanguage && (savedLanguage === "en" || savedLanguage === "zh")) {
        setLanguageState(savedLanguage)
        document.documentElement.lang = savedLanguage
      } else {
        // 检测浏览器语言
        const browserLang = navigator.language.toLowerCase()
        const detectedLang = browserLang.startsWith("zh") ? "zh" : "en"
        setLanguageState(detectedLang)
        document.documentElement.lang = detectedLang
      }
    } catch (e) {
      // 如果出现错误（例如在服务器端或禁用 localStorage），保持默认语言
      console.warn("无法获取语言设置", e)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    try {
      localStorage.setItem("language", lang)
      // 更新 HTML lang 属性
      document.documentElement.lang = lang
    } catch (e) {
      console.warn("无法保存语言设置", e)
    }
  }

  // 翻译函数
  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations.en[key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
