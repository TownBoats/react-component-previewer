export default function TailwindExample() {
  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
      <div className="shrink-0">
        <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
          T
        </div>
      </div>
      <div>
        <div className="text-xl font-medium text-black">Tailwind 示例</div>
        <p className="text-slate-500">使用 Tailwind CSS 构建的组件</p>
      </div>
    </div>
  )
}
