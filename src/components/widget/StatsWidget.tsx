import { BlogStats } from '@/src/types/blog'
import React, { useState, useEffect } from 'react'
// @ts-ignore
import { useGlobal } from '@/lib/global'
import { WidgetContainer } from './WidgetContainer'

/**
 * 商家定制版 - StatsWidget
 * 适配 Anzifan 模板，支持从 Notion 数据库读取 repost 链接
 */
export const StatsWidget = ({ data }: { data: BlogStats }) => {
  const [mounted, setMounted] = useState(false)
  
  // 这里的 useGlobal 如果还是报错，我们会通过下面的逻辑安全跳过
  let globalData: any = {}
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    globalData = useGlobal()
  } catch (e) {
    console.warn('Global context not found')
  }

  const { allPages } = globalData || {}

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  /**
   * 链接读取逻辑
   * 在 Notion 数据库寻找 slug 为 stats 的那一页，取其 repost 属性
   */
  const statsWidgetItem = allPages?.find((p: any) => p.slug === 'stats')
  const purchaseLink = statsWidgetItem?.repost || '#'

  return (
    <WidgetContainer>
      <style jsx global>{`
        @keyframes shimmer { 0% { transform: translateX(-150%) skewX(-20deg); } 100% { transform: translateX(150%) skewX(-20deg); } }
        @keyframes borderFlow { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .animate-shimmer { animation: shimmer 2.5s infinite linear; }
        .animate-border-flow { background-size: 200% 200%; animation: borderFlow 4s ease infinite; }
      `}</style>

      <div className="relative h-full w-full group/card transition-all duration-300">
        {/* 外围流光边缘 */}
        <div className="absolute -inset-[1px] rounded-[26px] bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-0 group-hover/card:opacity-70 blur-sm animate-border-flow transition-opacity duration-500"></div>

        {/* 主卡片容器 */}
        <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl bg-[#0a0a0b]/80 backdrop-blur-2xl p-4 sm:p-6 flex flex-col justify-between min-h-[170px]">
          
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

          {/* 购买按钮：唯一操作入口 */}
          <div className="flex flex-col gap-3 w-full mb-3"> 
              <button 
                onClick={() => {
                  if (purchaseLink && purchaseLink !== '#') {
                    window.open(purchaseLink, '_blank')
                  } else {
                    alert('商家尚未配置 repost 链接')
                  }
                }} 
                type="button" 
                className="group/btn relative w-full h-12 rounded-xl overflow-hidden
                  bg-red-600 text-white text-[13px] sm:text-sm font-black tracking-[0.2em] transition-all active:scale-95 shadow-lg shadow-red-900/40" 
              >
                <span className="relative z-10 uppercase">立即前往购买</span>
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-shimmer z-0"></div>
              </button>
          </div>
          
          {/* 底部标注：右下角对齐，并增加 mb-2 向上抬升 */}
          <div className="mt-auto flex justify-end items-center pr-1 mb-2">
            <span className="text-[7px] sm:text-[9px] text-gray-500/40 font-bold tracking-[0.2em] uppercase antialiased">
              PRO+ SUPPORT
            </span>
          </div>
        </div>
      </div>
    </WidgetContainer>
  )
}
