import { Heart, Star, User, Settings, Mail, Home, Calendar, Bell } from "lucide-react"

export default function LucideExample() {
  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-center">Lucide 图标示例</h2>
      <div className="grid grid-cols-4 gap-4">
        <div className="flex flex-col items-center">
          <Heart className="h-8 w-8 text-red-500" />
          <span className="text-xs mt-1">Heart</span>
        </div>
        <div className="flex flex-col items-center">
          <Star className="h-8 w-8 text-yellow-500" />
          <span className="text-xs mt-1">Star</span>
        </div>
        <div className="flex flex-col items-center">
          <User className="h-8 w-8 text-blue-500" />
          <span className="text-xs mt-1">User</span>
        </div>
        <div className="flex flex-col items-center">
          <Settings className="h-8 w-8 text-gray-500" />
          <span className="text-xs mt-1">Settings</span>
        </div>
        <div className="flex flex-col items-center">
          <Mail className="h-8 w-8 text-purple-500" />
          <span className="text-xs mt-1">Mail</span>
        </div>
        <div className="flex flex-col items-center">
          <Home className="h-8 w-8 text-green-500" />
          <span className="text-xs mt-1">Home</span>
        </div>
        <div className="flex flex-col items-center">
          <Calendar className="h-8 w-8 text-orange-500" />
          <span className="text-xs mt-1">Calendar</span>
        </div>
        <div className="flex flex-col items-center">
          <Bell className="h-8 w-8 text-pink-500" />
          <span className="text-xs mt-1">Bell</span>
        </div>
      </div>
    </div>
  )
}
