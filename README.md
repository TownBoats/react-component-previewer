# React Component Previewer

**Languages:** [中文](#中文) | [English](#english)

---

## <a name="中文"></a>中文

* [描述](#description-zh)
* [功能特性](#features-zh)
* [技术栈](#tech-stack-zh)
* [快速开始](#getting-started-zh)
* [使用方法](#usage-zh)
* [配置](#configuration-zh)
* [贡献](#contributing-zh)
* [许可证](#license-zh)

### <a name="description-zh"></a>描述

一个 Web 应用程序，允许您直接在浏览器中实时编写和预览 React 组件。使用 Next.js、Tailwind CSS 和 Monaco Editor 构建。

[返回顶部](#中文)

### <a name="features-zh"></a>功能特性

* **实时预览：** 在您输入时实时查看组件渲染效果。
* **代码编辑器：** 使用 Monaco Editor（VS Code 背后的引擎），提供熟悉的编码体验和语法高亮。
* **Tailwind CSS 支持：** 使用 Tailwind CSS 工具类编写组件。
* **库支持：**
    * React 核心（包括 Hooks 如 `useState`、`useEffect`）。
    * Lucide React 图标库。
    * Recharts 图表库。
    * `shadcn/ui` 组件。
* **示例：** 加载预构建的示例组件以快速开始。
* **可调整窗格：** 调整代码编辑器和预览窗格的宽度。
* **国际化：** 支持英文和中文。

[返回顶部](#中文)

### <a name="tech-stack-zh"></a>技术栈

* **框架：** Next.js
* **语言：** TypeScript
* **UI 库：** React
* **样式：** Tailwind CSS
* **代码编辑器：** Monaco Editor
* **图标：** Lucide React
* **图表：** Recharts
* **UI 组件：** `shadcn/ui` 

[返回顶部](#中文)

### <a name="getting-started-zh"></a>快速开始

1.  **克隆仓库：**
    ```bash
    git clone <your-repository-url>
    cd react-component-previewer
    ```
2.  **安装依赖：**
    ```bash
    npm install
    # 或
    yarn install
    ```
3.  **运行开发服务器：**
    ```bash
    npm run dev
    # 或
    yarn dev
    ```
4.  在浏览器中打开 [http://localhost:3000](http://localhost:3000)。

[返回顶部](#中文)

### <a name="usage-zh"></a>使用方法

* 在浏览器中访问应用程序。
* 左侧窗格是代码编辑器，您可以在其中编写或粘贴 React 组件代码。
* 右侧窗格显示组件的实时渲染预览。
* 使用顶部的选项查看示例或切换语言。
* 浏览 `/examples` 页面以加载不同的组件示例。

[返回顶部](#中文)

### <a name="configuration-zh"></a>配置

* **Tailwind CSS:** `tailwind.config.ts`, `styles/globals.css`, `postcss.config.mjs`。
* **Next.js:** `next.config.mjs`。
* **TypeScript:** `tsconfig.json`。
* **Shadcn/ui:** `components.json`。
* **国际化:** `lib/language-context.tsx`, `lib/translations.ts` (推测)。

[返回顶部](#中文)

### <a name="contributing-zh"></a>贡献

🎉欢迎贡献！请随时提交 Pull Request 🔃 或开启 Issue 🐞。(不过可能回复不及时)

[返回顶部](#中文)

### 📢 使用须知

如果您在产品或项目中使用了本项目，请注明来源并加上作者署名（例如在文档、产品介绍页或开源声明中注明 "Created by TownBoats on GitHub" 并附上本项目链接）。感谢您的尊重与支持。
[返回顶部](#中文)

### <a name="license-zh"></a>许可证

MIT License. 请查看 `LICENSE` 文件。

[返回顶部](#中文)

---

## <a name="english"></a>English

- [React Component Previewer](#react-component-previewer)
  - [中文](#中文)
    - [描述](#描述)
    - [功能特性](#功能特性)
    - [技术栈](#技术栈)
    - [快速开始](#快速开始)
    - [使用方法](#使用方法)
    - [配置](#配置)
    - [贡献](#贡献)
    - [📢 使用须知](#-使用须知)
    - [许可证](#许可证)
  - [English](#english)
    - [Description](#description)
    - [Features](#features)
    - [Tech Stack](#tech-stack)
    - [Getting Started](#getting-started)
    - [Usage](#usage)
    - [Configuration](#configuration)
    - [Contributing](#contributing)
    - [📢 Notice for Use](#-notice-for-use)
    - [License](#license)

### <a name="description-en"></a>Description

A web application that allows you to write and preview React components in real-time directly in your browser. Built with Next.js, Tailwind CSS, and Monaco Editor.

[Back to Top](#english)

### <a name="features-en"></a>Features

* **Live Preview:** See your component render in real-time as you type.
* **Code Editor:** Uses Monaco Editor (the engine behind VS Code) for a familiar coding experience with syntax highlighting.
* **Tailwind CSS Support:** Write components using Tailwind CSS utility classes.
* **Library Support:**
    * React Core (including Hooks like `useState`, `useEffect`).
    * Lucide React Icons.
    * Recharts for charting.
    * `shadcn/ui` components .
* **Examples:** Load pre-built example components to get started quickly.
* **Resizable Panes:** Adjust the width of the code editor and preview panes.
* **Internationalization:** Supports English and Chinese languages.
* **Static Export:** Configured for static export using Next.js `output: 'export'`.

[Back to Top](#english)

### <a name="tech-stack-en"></a>Tech Stack

* **Framework:** Next.js
* **Language:** TypeScript
* **UI Library:** React
* **Styling:** Tailwind CSS
* **Code Editor:** Monaco Editor
* **Icons:** Lucide React
* **Charting:** Recharts
* **UI Components:** `shadcn/ui` 

[Back to Top](#english)

### <a name="getting-started-en"></a>Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd react-component-previewer
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

[Back to Top](#english)

### <a name="usage-en"></a>Usage

* Navigate to the application in your browser.
* The left pane contains the code editor where you can write or paste your React component code.
* The right pane shows the live rendered preview of your component.
* Use the header options to view examples or toggle the language.
* Explore the `/examples` page to load different component examples.

[Back to Top](#english)

### <a name="configuration-en"></a>Configuration

* **Tailwind CSS:** `tailwind.config.ts`, `styles/globals.css`, `postcss.config.mjs`.
* **Next.js:** `next.config.mjs`.
* **TypeScript:** `tsconfig.json`.
* **Shadcn/ui:** `components.json`.
* **Internationalization:** `lib/language-context.tsx`, `lib/translations.ts` (implied).

[Back to Top](#english)

### <a name="contributing-en"></a>Contributing

🎉 Contributions welcome! Feel free to submit a Pull Request 🔃 or open an Issue 🐞. (Replies may be delayed, though!)
[Back to Top](#english)

### 📢 Notice for Use

If you use this project in your product or project, please indicate the source and add the author's signature (for example, state "Created by TownBoats on GitHub" in your documentation, product introduction page, or open-source statement, and attach the link to this project). Thank you for your respect and support.
[Back to Top](#english)

### <a name="license-en"></a>License
MIT License. Please check the 'LICENSE' file.

[Back to Top](#english)