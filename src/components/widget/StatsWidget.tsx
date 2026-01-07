import { BlogStats } from '@/src/types/blog'
import React, { useState, useEffect, useCallback } from 'react'
// @ts-ignore
import { createPortal } from 'react-dom'
import { WidgetContainer } from './WidgetContainer'

// 硬编码配置
const SHOP_CODE = "PRO-001A"
const ONE_STOP_URL = "https://login.1zs.top/"

/**
 * 独立 Modal 组件，解决 SSR 期间 document 不存在的问题
 */
const MemberModal = ({ isOpen, onClose, isCopied, onCopy }: any) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  if (!mounted || !isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      {/* 遮罩层 */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* 弹窗主体 */}
      <div className="relative z-10 w-full max-w-[300px] overflow-hidden rounded-3xl 
        bg-[#1c1c1e]/90 backdrop-blur-2xl border border-white/10 shadow-2xl animate-modal-enter">
        
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="p-8 text-center flex flex-col items-center">
          <h3 className="text-xl font-bold text-white mb-2 tracking-wide">
            👑永久会员：￥000
          </h3>
          <p className="text-xs text-gray-400 mb-6 font-medium leading-relaxed">
            请打开网页右下角客服工具发送当前站点编号，按照指引完成注册及购买，点击复制👇
          </p>
          
          <div 
            onClick={onCopy}
            className="group relative cursor-pointer w-full mb-6 p-4 rounded-2xl transition-all duration-300
              bg-black/40 border border-white/5 hover:bg-black/60"
          >
            <span className="text-2xl font-mono font-bold text-white tracking-widest block">
              {SHOP_CODE}
            </span>
            
            <div className={`
              absolute inset-0 flex items-center justify-center rounded-2xl 
              bg-blue-600/90 backdrop-blur-sm transition-all duration-300 
              ${isCopied ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95'}
            `}>
              <span className="text-xs font-bold text-white flex items-center gap-1">
                ✨ 复制成功
              </span>
            </div>
          </div>

          <button
            type="button"
            className="w-full py-3 rounded-xl text-sm font-bold text-black bg-white hover:bg-gray-100 active:scale-95 transition-all"
            onClick={onClose}
          >
            关闭
          </button>

          <p className="mt-4 text-[10px] text-gray-500/60 font-light tracking-wide">
            服务由 PRO+ 寄售平台支持 ·{' '}
            <a 
              href="https://pro-plus.top" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-gray-300 underline underline-offset-2"
            >
              pro-plus.top
            </a>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes modalEnter {
          0% { opacity: 0; transform: scale(0.95) translateY(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-modal-enter {
          animation: modalEnter 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>,
    document.body
  )
}

/**
 * 主组件
 */
export const StatsWidget = ({ data }: { data: BlogStats }) => {
  const [showModal, setShowModal] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleCopy = useCallback(() => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(SHOP_CODE)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    }
  }, [])

  // 避免服务端渲染和客户端不一致
  if (!mounted) return null

  // 处理文章总数显示，增加类型容错
  const postsCount = (data as any)?.postsCount || (data as any)?.postCount || 0

  return (
    <WidgetContainer>
      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-150%) skewX(-20deg); }
          100% { transform: translateX(150%) skewX(-20deg); }
        }
        @keyframes borderFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-shimmer { animation: shimmer 1.5s infinite; }
        .animate-border-flow { background-size: 200% 200%; animation: borderFlow 3s ease infinite; }
      `}</style>

      {showModal && (
        <MemberModal 
          isOpen={showModal} 
          onClose={() => setShowModal(false)} 
          isCopied={isCopied} 
          onCopy={handleCopy} 
        />
      )}

      <div className="relative h-full w-full group/card transition-transform duration-300 ease-out hover:scale-[1.02]">
        {/* 彩虹流光边框 */}
        <div className="absolute -inset-[1px] rounded-[26px] bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-0 group-hover/card:opacity-70 blur-sm transition-opacity duration-500 animate-border-flow"></div>

        {/* 毛玻璃容器 */}
        <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl bg-[#151516]/80 backdrop-blur-2xl">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600/10 rounded-full blur-[40px] pointer-events-none group-hover/card:bg-blue-600/20 transition-colors duration-500"></div>
          
          <div className="relative z-10 flex flex-col h-full justify-between p-6">
            <div className="flex-1 flex flex-col items-center justify-center py-4">
               <h2 className="text-2xl font-extrabold text-white tracking-wide drop-shadow-lg antialiased">
                 会员服务
               </h2>
               <div className="w-8 h-1 bg-blue-500 mt-2 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
            </div>

            <div className="flex flex-col gap-3 w-full"> 
                {/* 按钮 1：会员价格 */}
                <button 
                  onClick={() => setShowModal(true)} 
                  type="button" 
                  className="group/btn relative w-full h-10 rounded-xl overflow-hidden
                    bg-white text-black text-xs font-bold tracking-widest antialiased
                    shadow-lg shadow-white/5 transition-all duration-300 hover:shadow-white/20 active:scale-95"
                >
                  <span className="relative z-10">👑 会员价格</span>
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-black/10 to-transparent -translate-x-full group-hover/btn:animate-shimmer z-0 pointer-events-none"></div>
                </button>

                {/* 按钮 2：前往一站式 */}
                <button 
                  onClick={() => window.open(ONE_STOP_URL, '_blank')} 
                  type="button" 
                  className="group/btn relative w-full h-10 rounded-xl overflow-hidden
                    bg-red-600 text-white text-xs font-bold tracking-widest antialiased
                    border border-white/5 shadow-lg shadow-red-600/20 transition-all duration-300
                    hover:bg-red-500 active:scale-95" 
                >
                  <span className="relative z-10">前往一站式</span>
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:animate-shimmer z-0 pointer-events-none"></div>
                </button>
            </div>
            
            {/* 底部小数据 */}
            <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] text-gray-500 font-bold uppercase tracking-tighter">
              <span>POSTS: {postsCount}</span>
              <span className="flex items-center gap-1 text-emerald-500">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                SERVICE ONLINE
              </span>
            </div>
          </div>
        </div>
      </div>
    </WidgetContainer>
  )
}
