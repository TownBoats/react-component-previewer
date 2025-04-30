"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { name: "一月", 销量: 4000, 利润: 2400 },
  { name: "二月", 销量: 3000, 利润: 1398 },
  { name: "三月", 销量: 2000, 利润: 9800 },
  { name: "四月", 销量: 2780, 利润: 3908 },
  { name: "五月", 销量: 1890, 利润: 4800 },
  { name: "六月", 销量: 2390, 利润: 3800 },
  { name: "七月", 销量: 3490, 利润: 4300 },
]

export default function RechartsExample() {
  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Recharts 示例</h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="销量" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="利润" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
