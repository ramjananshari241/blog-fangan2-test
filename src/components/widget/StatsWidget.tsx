/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react'
import { WidgetContainer } from './WidgetContainer'

/**
 * 商家定制版 StatsWidget - 最终冲刺版
 * 深度复刻 ProfileWidget 读取逻辑，并加入全局数据抓取逻辑
 */
export const StatsWidget = (props: any) => {
  const { data } = props
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  /**
   * 🛠️ 属性探测逻辑 (这是最后一次尝试的重点)
   */
  let purchaseLink = '#';

  // 1. 尝试常规路径 (repost, description, link)
  const rawLink = data?.repost || data?.description || data?.link || data?.url;

  // 2. 如果常规路径失败 (读到了 #)，尝试在全局 Next.js 缓存中寻找 slug 为 stats 的那一行
  if (!rawLink || rawLink === '#') {
    try {
      // 尝试从 Next.js 注入的全局数据中探测 (Anzifan 模板通用后门)
      const allPages = (window as any)?.__NEXT_DATA__?.props?.pageProps?.allPages;
      const statsRow = allPages?.find((p: any) => p.slug === 'stats');
      purchaseLink = statsRow?.repost || statsRow?.description || statsRow?.link || '#';
    } catch (e) {
      purchaseLink = '#';
    }
  } else {
    purchaseLink = rawLink;
  }

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

        {/* 主卡片：min-h 确保高度合适 */}
        <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl bg-[#0a0a0b]/80 backdrop-blur-2xl p-4 sm:p-6 flex flex-col justify-between min-h-[175px]">
          
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
          <div className="flex flex-col gap-3 w-full mb-3"> 
              <button 
                onClick={() => {
                  if (purchaseLink && purchaseLink !== '#' && purchaseLink.toString().includes('http')) {
                    window.open(purchaseLink.toString().trim(), '_blank')
                  } else {
                    // 打印详细数据到控制台，如果失败你可以 F12 查看
                    console.log('StatsWidget Link Detect Failed. Data Object:', data);
                    alert(`链接未配置或配置未同步。\n\n[读取值]: ${purchaseLink}\n\n[操作指引]: 请确保在 Notion 中 stats 条目的 [excerpt] 栏填入链接，并检查 status 是否为 Published。`);
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
          
          {/* 底部信息：PRO+ SUPPORT 居右并上浮 */}
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
