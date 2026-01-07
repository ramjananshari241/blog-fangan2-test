import React, { useState, useEffect } from 'react'
import { WidgetContainer } from './WidgetContainer'

/**
 * 商家定制版 StatsWidget - 深度探测版
 * 专门适配 Anzifan 模板的数据结构
 */
export const StatsWidget = ({ data }: { data: any }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  /**
   * 🛠️ 模仿 Profile 的核心读取逻辑
   * 
   * 由于 Anzifan 对 Stats 组件传递的数据通常不含属性列，
   * 如果你在 [excerpt] 或 [repost] 填了链接，我们需要从以下字段中“抓取”：
   */
  const purchaseLink = 
    data?.description || // 对应 Notion 的 excerpt (摘要)
    data?.repost ||      // 对应 Notion 的 repost
    data?.link ||        // 可能的映射
    data?.url ||         // 可能的映射
    '#';

  return (
    <WidgetContainer>
      <style jsx global>{`
        @keyframes shimmer { 0% { transform: translateX(-150%) skewX(-20deg); } 100% { transform: translateX(150%) skewX(-20deg); } }
        @keyframes borderFlow { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .animate-shimmer { animation: shimmer 2.5s infinite linear; }
        .animate-border-flow { background-size: 200% 200%; animation: borderFlow 4s ease infinite; }
      `}</style>

      <div className="relative h-full w-full group/card transition-all duration-300">
        {/* 背景流光 */}
        <div className="absolute -inset-[1px] rounded-[26px] bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-0 group-hover/card:opacity-70 blur-sm animate-border-flow transition-opacity duration-500"></div>

        {/* 主容器：保持 iOS 磨砂质感 */}
        <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl bg-[#0e0e0f]/80 backdrop-blur-2xl p-4 sm:p-6 flex flex-col justify-between min-h-[175px]">
          
          {/* 标题区域 */}
          <div className="flex items-center justify-center gap-2.5 mb-6 mt-1">
             <h2 className="text-lg sm:text-2xl font-black text-white tracking-wide antialiased">
               作品购买渠道
             </h2>
             <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
             </span>
          </div>

          {/* 单按钮区域 */}
          <div className="flex flex-col gap-3 w-full mb-2"> 
              <button 
                onClick={() => {
                  // 只要包含 http 字符，就认为是一个有效链接
                  if (purchaseLink && purchaseLink !== '#' && purchaseLink.toString().includes('http')) {
                    window.open(purchaseLink.trim(), '_blank')
                  } else {
                    alert(`未检测到有效链接。\n\n当前读取到的值为: "${purchaseLink}"\n\n请尝试在 Notion 数据库 stats 条目的 [excerpt] 摘要列填入链接，并确保 status 为 Published。`)
                    console.log('StatsWidget Debug Data:', data) // 方便开发者在控制台查看对象内容
                  }
                }} 
                type="button" 
                className="group/btn relative w-full h-12 rounded-xl overflow-hidden
                  bg-red-600 text-white text-[13px] sm:text-sm font-black tracking-[0.2em] transition-all active:scale-95 shadow-lg shadow-red-900/40" 
              >
                <span className="relative z-10 uppercase font-black">立即前往购买</span>
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover/btn:animate-shimmer z-0 pointer-events-none"></div>
              </button>
          </div>
          
          {/* 底部支持文字：右下角 + pb-2 上移 */}
          <div className="mt-auto flex justify-end items-center pr-1 pb-2">
            <span className="text-[7px] sm:text-[9px] text-gray-500/40 font-bold tracking-[0.15em] uppercase antialiased">
              PRO+ SUPPORT
            </span>
          </div>
        </div>
      </div>
    </WidgetContainer>
  )
}
