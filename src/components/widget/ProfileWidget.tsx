/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react'
import { WidgetContainer } from './WidgetContainer'

/**
 * 商家定制版 StatsWidget
 * 深度模仿 ProfileWidget 逻辑，实现直接读取 Notion 数据库属性
 */
export const StatsWidget = (props: any) => {
  const { data } = props
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  /**
   * 🛠️ 深度模仿 Profile 读取逻辑
   * 在 ProfileWidget 中，data.description 对应的是 Excerpt (摘要)
   * 我们在这里增加对 repost 的探测，这是最稳健的方案
   */
  const purchaseLink = 
    data?.repost ||             // 优先尝试直接读取 repost 属性
    data?.description ||        // 模仿 Profile 读取 Excerpt (摘要) 的逻辑
    data?.link ||               // 尝试自动映射的 link
    data?.url ||                // 尝试自动映射的 url
    '#';

  return (
    <WidgetContainer>
      {/* 注入 iOS 风格动画 */}
      <style jsx global>{`
        @keyframes shimmer { 0% { transform: translateX(-150%) skewX(-20deg); } 100% { transform: translateX(150%) skewX(-20deg); } }
        @keyframes borderFlow { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .animate-shimmer { animation: shimmer 2.5s infinite linear; }
        .animate-border-flow { background-size: 200% 200%; animation: borderFlow 4s ease infinite; }
      `}</style>

      <div className="relative h-full w-full group/card transition-all duration-300">
        {/* 背景流光边缘 - 与整体风格对齐 */}
        <div className="absolute -inset-[1px] rounded-[26px] bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-0 group-hover/card:opacity-70 blur-sm animate-border-flow transition-opacity duration-500"></div>

        {/* 毛玻璃主体容器 - 模仿 Profile 容器质感但保持 iOS 深色风格 */}
        <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl bg-[#0e0e0f]/80 backdrop-blur-2xl p-4 sm:p-6 flex flex-col justify-between min-h-[175px]">
          
          {/* 标题区域：保留您要求的绿色呼吸灯 */}
          <div className="flex items-center justify-center gap-2.5 mb-6 mt-1">
             <h2 className="text-lg sm:text-2xl font-black text-white tracking-wide antialiased">
               作品购买渠道
             </h2>
             <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
             </span>
          </div>

          {/* 核心按钮区域：模仿 Profile 的 Link 交互感，但使用购买样式 */}
          <div className="flex flex-col gap-3 w-full mb-2"> 
              <button 
                onClick={() => {
                  // 只要字符串里包含 http，就认为是有效链接
                  if (purchaseLink && purchaseLink !== '#' && purchaseLink.toString().includes('http')) {
                    window.open(purchaseLink.toString().trim(), '_blank')
                  } else {
                    // 弹窗提示，并打印当前 data 结构供调试
                    alert(`未在 stats 挂件中探测到链接。\n\n当前读取到的值为: "${purchaseLink}"\n\n请尝试在 Notion 数据库中将链接填入 stats 行的 [repost] 栏或 [excerpt] 栏。`)
                    console.log('StatsWidget Received Data:', data)
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
          
          {/* 底部信息：移至右下角，使用浅灰色，并增加 pb-2 向上抬升 */}
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
