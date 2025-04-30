/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: 'export',           // ✅ 启用静态导出
  trailingSlash: true         // ✅ 推荐开启，生成以 / 结尾的路径，兼容性更好
}

export default nextConfig
