import { BlogStats } from '@/src/types/blog'
import React, { useState, useEffect } from 'react'
// @ts-ignore
import { useGlobal } from '@/lib/global' 
import { WidgetContainer } from './WidgetContainer'

/**
 * Anzifan 方案定制版 - StatsWidget
 * 功能：
 * 1. 自动从 Notion 数据库 slug 为 stats 的条目中读取 repost 属性作为链接。
 * 2. 删减为单按钮：“作品购买渠道”。
 * 3. 彻底删除 POSTS 字样。
 * 4. PRO+ SUPPORT 移至右下角并上浮。
 */
export const StatsWidget = ({ data }: { data: BlogStats }) => {
  const [mounted, setMounted] = useState(false)
  
  // 从全局 Context 获取所有页面数据
  // @ts-ignore
  const { allPages } = useGlobal() 

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  /**
   * 动态链接获取逻辑：
   * 在 allPages 中查找 slug 为 'stats' 的数据对象
   */
  const statsData = allPages?.find((p: any) => p.slug === 'stats')
  
  // 提取 repost 属性值，作为按钮跳转链接
  const purchaseLink = statsData?.repost || '#'

  return (
    <WidgetContainer>
      <style jsx global>{`
        @keyframes shimmer { 0% { transform: translateX(-150%) skewX(-20deg); } 100% { transform: translateX(150%) skewX(-20deg); } }
        @keyframes borderFlow { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .animate-shimmer { animation: shimmer 2.2s infinite linear; }
        .animate-border-flow { background-size: 200% 200%; animation: borderFlow 4s ease infinite; }
      `}</style>

      <div className="relative h-full w-full group/card transition-all duration-500 ease-out">
        {/* 背景彩虹流光边缘 */}
        <div className="absolute -inset-[1px] rounded-[26px] bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 opacity-0 group-hover/card:opacity-80 blur-md animate-border-flow transition-opacity duration-700"></div>

        {/* 毛玻璃主体容器 */}
        <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl bg-[#0a0a0b]/80 backdrop-blur-2xl p-4 sm:p-6 flex flex-col justify-between min-h-[160px]">
          
          {/* 背景装饰光晕 */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600/10 rounded-full blur-[40px] pointer-events-none group-hover/card:bg-blue-600/20 transition-colors duration-700"></div>

          {/* 标题区域：保留绿色呼吸灯 */}
          <div className="flex items-center justify-center gap-2.5 mb-6 mt-1 relative z-10">
             <h2 className="text-lg sm:text-2xl font-black text-white tracking-wider antialiased">
               作品购买渠道
             </h2>
             <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.9)]"></span>
             </span>
          </div>

          {/* 核心按钮：跳转至数据库 repost 链接 */}
          <div className="flex flex-col gap-3 w-full mb-4 relative z-10"> 
              <button 
                onClick={() => {
                  if (purchaseLink && purchaseLink !== '#') {
                    window.open(purchaseLink, '_blank')
                  } else {
                    alert('商家暂未在 Notion 中配置 repost 链接')
                  }
                }} 
                type="button" 
                className="group/btn relative w-full h-12 rounded-xl overflow-hidden
                  bg-red-600 text-white text-[13px] sm:text-sm font-black tracking-[0.2em] transition-all active:scale-95 shadow-lg shadow-red-900/40" 
              >
                <span className="relative z-10 uppercase">立即前往购买</span>
                {/* 内部扫光动效 */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-shimmer z-0"></div>
              </button>
          </div>
          
          {/* 底部信息：移至右下角，并增加 pb-2 使其脱离底边上移 */}
          <div className="mt-auto flex justify-end items-center pr-1 pb-2">
            <span className="text-[7px] sm:text-[9px] text-gray-500/40 font-bold tracking-[0.2em] uppercase antialiased">
              PRO+ SUPPORT
            </span>
          </div>
        </div>
      </div>
    </WidgetContainer>
  )
}
