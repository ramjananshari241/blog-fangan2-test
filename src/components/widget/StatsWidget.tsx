import { BlogStats } from '@/src/types/blog'
import React, { useState, useEffect } from 'react'
import { WidgetContainer } from './WidgetContainer'
import { useGlobal } from '@/lib/global' // 必须引入这个来获取数据库数据

/**
 * 商家定制版 StatsWidget
 * 功能：从 Notion 数据库 slug: stats 的 "repost" 属性读取按钮链接
 */
export const StatsWidget = ({ data }: { data: BlogStats }) => {
  const [mounted, setMounted] = useState(false)
  const { allPages } = useGlobal() // 获取所有页面数据

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  /**
   * 核心逻辑：
   * 1. 在数据库中找到 slug 为 stats 的那一页
   * 2. 提取该页面的 repost 属性（购买链接）
   */
  const statsWidgetItem = allPages?.find((p: any) => p.slug === 'stats')
  const purchaseLink = statsWidgetItem?.repost || '#' // 如果没填，默认不跳转

  return (
    <WidgetContainer>
      <style jsx global>{`
        @keyframes shimmer { 0% { transform: translateX(-150%) skewX(-20deg); } 100% { transform: translateX(150%) skewX(-20deg); } }
        @keyframes borderFlow { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .animate-shimmer { animation: shimmer 2s infinite linear; }
        .animate-border-flow { background-size: 200% 200%; animation: borderFlow 4s ease infinite; }
      `}</style>

      <div className="relative h-full w-full group/card transition-all duration-300">
        {/* 背景流光 */}
        <div className="absolute -inset-[1px] rounded-[26px] bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-0 group-hover/card:opacity-70 blur-sm animate-border-flow transition-opacity"></div>

        {/* 毛玻璃容器 */}
        <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl bg-[#151516]/80 backdrop-blur-2xl p-4 sm:p-6 flex flex-col justify-between min-h-[170px]">
          
          {/* 标题区域：保留绿色呼吸灯 */}
          <div className="flex items-center justify-center gap-2.5 mb-6 mt-1">
             <h2 className="text-lg sm:text-2xl font-extrabold text-white tracking-wide antialiased">
               作品购买渠道
             </h2>
             <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
             </span>
          </div>

          {/* 单按钮区域：购买链接跳转 */}
          <div className="flex flex-col gap-3 w-full mb-3"> 
              <button 
                onClick={() => {
                  if(purchaseLink !== '#') {
                    window.open(purchaseLink, '_blank')
                  } else {
                    alert('商家尚未配置购买链接')
                  }
                }} 
                type="button" 
                className="group/btn relative w-full h-12 rounded-xl overflow-hidden
                  bg-red-600 text-white text-xs sm:text-sm font-black tracking-[0.2em] transition-all active:scale-95 shadow-lg shadow-red-900/20" 
              >
                <span className="relative z-10">立即前往购买</span>
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:animate-shimmer z-0"></div>
              </button>
          </div>
          
          {/* 底部信息：PRO+ 支持标志 */}
          <div className="mt-auto pt-2 flex justify-end items-center pr-1 pb-1">
            <span className="text-[7px] sm:text-[9px] text-gray-500/50 font-bold tracking-[0.1em] uppercase antialiased">
              PRO+ MERCHANT SUPPORT
            </span>
          </div>
        </div>
      </div>
    </WidgetContainer>
  )
}
