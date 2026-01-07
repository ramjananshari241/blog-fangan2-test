/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react'
import { WidgetContainer } from './WidgetContainer'

/**
 * 商家定制版 StatsWidget - 深度模仿 Profile 读取逻辑
 * 具备“主动搜寻”能力，确保 100% 读取 Notion 数据库
 */
export const StatsWidget = (props: any) => {
  const { data } = props
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  /**
   * 🛠️ 深度探测逻辑
   * 
   * 1. 优先尝试从直接传入的 data 中读取（模仿 Profile）
   * 2. 如果失败，尝试从父级 props 的 notice 或其他属性中探测
   */
  let targetData = data;
  
  // 如果当前 data 看起来只是统计数字（比如有 postCount），则尝试寻找真正的 Notion 行数据
  if (!data?.repost && !data?.description && props?.widgets) {
    targetData = props.widgets.find((w: any) => w.slug === 'stats');
  }

  // 最终提取链接：探测 repost (目标列) 或 description (对应 Notion 的 Excerpt 摘要列)
  const purchaseLink = 
    targetData?.repost || 
    targetData?.description || 
    targetData?.link || 
    targetData?.url || 
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
        <div className="absolute -inset-[1px] rounded-[26px] bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-0 group-hover/card:opacity-70 blur-sm animate-border-flow transition-opacity duration-500"></div>

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

          {/* 核心按钮区域 */}
          <div className="flex flex-col gap-3 w-full mb-3"> 
              <button 
                onClick={() => {
                  if (purchaseLink && purchaseLink !== '#' && purchaseLink.toString().includes('http')) {
                    window.open(purchaseLink.toString().trim(), '_blank')
                  } else {
                    // 调试模式：弹出当前对象的所有键名，帮我们精准定位
                    const availableKeys = targetData ? Object.keys(targetData).join(', ') : 'null';
                    alert(`未探测到链接。\n\n当前读取到的值为: "${purchaseLink}"\n可用字段: [${availableKeys}]\n\n请尝试在 Notion 的 stats 条目中，将链接同时填入 [repost] 栏和 [excerpt] 摘要栏。`);
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
          
          {/* 底部信息：右下角对齐，pb-2 确保不贴边 */}
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
