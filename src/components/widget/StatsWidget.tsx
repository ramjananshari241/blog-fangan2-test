import React, { useState, useEffect } from 'react'
import { WidgetContainer } from './WidgetContainer'

/**
 * 商家定制版 StatsWidget - 深度模仿 Profile 读取逻辑
 * 这是一个高兼容性版本，会自动探测 Notion 数据库中的链接字段
 */
export const StatsWidget = ({ data }: { data: any }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  /**
   * 🛠️ 模仿 ProfileWidget 的深度读取逻辑
   * 
   * 探测顺序：
   * 1. data?.repost (你截图中的目标列)
   * 2. data?.link 或 data?.url (系统可能的自动映射)
   * 3. data?.description (即 Excerpt 摘要列，如果 repost 读不到，你可以把链接填在摘要里)
   * 4. data?.name (即 Aa title 列，万不得已的备选)
   */
  const purchaseLink = 
    data?.repost || 
    data?.link || 
    data?.url || 
    data?.description || 
    data?.name || 
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
        {/* 背景流光边缘 */}
        <div className="absolute -inset-[1px] rounded-[26px] bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-0 group-hover/card:opacity-70 blur-sm animate-border-flow transition-opacity duration-500"></div>

        {/* 毛玻璃主体容器 */}
        <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl bg-[#0e0e0f]/80 backdrop-blur-2xl p-4 sm:p-6 flex flex-col justify-between min-h-[175px]">
          
          {/* 标题区域：带呼吸灯 */}
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
                  if (purchaseLink && purchaseLink !== '#' && purchaseLink.includes('http')) {
                    window.open(purchaseLink, '_blank')
                  } else {
                    alert(`未在 Notion 中探测到有效链接。\n当前读取到的值为: ${purchaseLink}\n\n建议方案：请尝试将链接填入 stats 条目的 [repost] 栏或 [excerpt] 摘要栏。`)
                  }
                }} 
                type="button" 
                className="group/btn relative w-full h-12 rounded-xl overflow-hidden
                  bg-red-600 text-white text-[13px] sm:text-sm font-black tracking-[0.2em] transition-all active:scale-95 shadow-lg shadow-red-900/40" 
              >
                <span className="relative z-10 uppercase">立即前往购买</span>
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover/btn:animate-shimmer z-0 pointer-events-none"></div>
              </button>
          </div>
          
          {/* 底部标注：右下角对齐，pb-2 上移 */}
          <div className="mt-auto flex justify-end items-center pr-1 pb-2">
            <span className="text-[7px] sm:text-[9px] text-gray-500/60 font-bold tracking-[0.15em] uppercase antialiased">
              PRO+ SUPPORT
            </span>
          </div>
        </div>
      </div>
    </WidgetContainer>
  )
}
