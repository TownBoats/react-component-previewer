"use client"

import { useState } from "react"
import Link from "next/link"
import { Code, FileCode, Info, Globe, Github, Heart } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function Header() {
  const [showInfo, setShowInfo] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "zh" : "en")
  }

  return (
    <header className="bg-slate-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <Code className="h-6 w-6 mr-2" />
        <h1 className="text-xl font-bold">{t("appTitle")}</h1>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center text-sm">
          <Heart className="h-4 w-4 mr-1" />
          <span>TownBoats</span>
        </div>
        <a 
          href="https://github.com/TownBoats/react-component-previewer" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center text-sm hover:text-blue-300 transition-colors"
        >
          <Github className="h-4 w-4 mr-1" />
          <span>GitHub</span>
        </a>
        <a 
          href="http://xhslink.com/L6XDeab" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center text-sm hover:text-blue-300 transition-colors"
        >
          <span>小红书</span>
        </a>
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="flex items-center text-sm hover:text-blue-300 transition-colors"
        >
          <Info className="h-4 w-4 mr-1" />
          <span>{t("about")}</span>
        </button>
        <Link href="/examples" className="flex items-center text-sm hover:text-blue-300 transition-colors">
          <FileCode className="h-4 w-4 mr-1" />
          <span>{t("examples")}</span>
        </Link>
        <button onClick={toggleLanguage} className="flex items-center text-sm hover:text-blue-300 transition-colors">
          <Globe className="h-4 w-4 mr-1" />
          <span>{t("switchLanguage")}</span>
        </button>
      </div>

      {showInfo && (
        <div className="absolute top-16 right-4 bg-white text-slate-800 p-4 rounded-md shadow-lg z-10 w-80">
          <h3 className="font-bold mb-2">{t("aboutTitle")}</h3>
          <p className="text-sm mb-2">{t("aboutDescription")}</p>
          <p className="text-sm mb-2">{t("supportedLibraries")}</p>
          <ul className="text-xs list-disc pl-5">
            <li>React 核心功能 (Hooks)</li>
            <li>Lucide React</li>
            <li>Recharts</li>
            <li>Tailwind CSS</li>
          </ul>
          <button onClick={() => setShowInfo(false)} className="mt-3 text-xs text-blue-600 hover:text-blue-800">
            {t("close")}
          </button>
        </div>
      )}
    </header>
  )
}
