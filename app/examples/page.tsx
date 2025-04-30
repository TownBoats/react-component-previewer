"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function ExamplesPage() {
  const { t } = useLanguage()

  const examples = [
    {
      id: "tailwind",
      name: t("tailwindExample"),
      description: t("tailwindDescription"),
      code: `import React from 'react';

export default function TailwindExample() {
  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
      <div className="shrink-0">
        <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">T</div>
      </div>
      <div>
        <div className="text-xl font-medium text-black">${t("tailwindExample")}</div>
        <p className="text-slate-500">${t("tailwindDescription")}</p>
      </div>
    </div>
  );
}`,
    },
    {
      id: "lucide",
      name: t("lucideExample"),
      description: t("lucideDescription"),
      code: `import React from 'react';
import { Heart, Star, User, Settings, Mail, Home, Calendar, Bell } from 'lucide-react';

export default function LucideExample() {
  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-center">${t("lucideExample")}</h2>
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
  );
}`,
    },
    {
      id: "recharts",
      name: t("rechartsExample"),
      description: t("rechartsDescription"),
      code: `import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function RechartsExample() {
  // 示例数据
  const data = [
    { name: '一月', 销量: 4000, 利润: 2400 },
    { name: '二月', 销量: 3000, 利润: 1398 },
    { name: '三月', 销量: 2000, 利润: 9800 },
    { name: '四月', 销量: 2780, 利润: 3908 },
    { name: '五月', 销量: 1890, 利润: 4800 },
    { name: '六月', 销量: 2390, 利润: 3800 },
    { name: '七月', 销量: 3490, 利润: 4300 },
  ];

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">${t("rechartsExample")}</h2>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
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
  );
}`,
    },
    {
      id: "d3recharts",
      name: "交互式行业数据图表",
      description: "使用Recharts创建交互式行业数据图表，支持数据切换",
      code: `import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// 使用Recharts代替直接D3操作DOM来实现可视化
// Recharts本身是基于D3构建的，但更适合React环境

const SimpleD3Chart = () => {
  const [dataSet, setDataSet] = useState('sales');
  
  // 模拟数据
  const salesData = [
    { name: '技术', value: 820 },
    { name: '金融', value: 620 },
    { name: '医疗', value: 510 },
    { name: '教育', value: 340 },
    { name: '零售', value: 420 },
  ];
  
  const growthData = [
    { name: '技术', value: 18 },
    { name: '金融', value: 5 },
    { name: '医疗', value: 12 },
    { name: '教育', value: 8 },
    { name: '零售', value: -3 },
  ];
  
  const data = dataSet === 'sales' ? salesData : growthData;
  const colorMap = {
    sales: '#8884d8',
    growth: '#82ca9d'
  };
  
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">D3/Recharts 行业数据</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => setDataSet('sales')}
            className={\`px-4 py-2 rounded \${
              dataSet === 'sales' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700'
            }\`}
          >
            销售数据
          </button>
          <button 
            onClick={() => setDataSet('growth')}
            className={\`px-4 py-2 rounded \${
              dataSet === 'growth' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700'
            }\`}
          >
            增长率
          </button>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
              label={{
                value: dataSet === 'sales' ? '销售额 (百万)' : '增长率 (%)', 
                angle: -90, 
                position: 'insideLeft' 
              }} 
            />
            <Tooltip 
              formatter={(value) => [
                \`\${value} \${dataSet === 'sales' ? '百万' : '%'}\`, 
                dataSet === 'sales' ? '销售额' : '增长率'
              ]} 
            />
            <Legend />
            <Bar 
              dataKey="value" 
              fill={colorMap[dataSet]} 
              name={dataSet === 'sales' ? '销售额' : '增长率'} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        <p>这个示例展示了如何使用D3.js的概念（通过Recharts库）创建交互式图表。</p>
        <p>Recharts是构建在D3.js之上的React图表库，它使得在React应用中创建图表更加简单。</p>
        <p>点击上方按钮可以切换查看不同的数据集。</p>
      </div>
    </div>
  );
};

export default SimpleD3Chart;`,
    },
  ]

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>{t("backToEditor")}</span>
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-6">{t("componentsExamples")}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {examples.map((example) => (
          <div key={example.id} className="border rounded-lg p-4 bg-white shadow-sm">
            <h2 className="text-xl font-bold mb-2">{example.name}</h2>
            <p className="text-gray-600 mb-4">{example.description}</p>
            <Link
              href={`/?example=${example.id}`}
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              {t("useThisExample")}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
