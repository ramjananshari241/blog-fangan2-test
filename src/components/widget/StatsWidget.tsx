import { classNames } from '@/src/lib/util'
import { BlogStats } from '@/src/types/blog'
import React, { useState } from 'react'
import { WidgetContainer } from './WidgetContainer'

// 硬编码的商家编号
const SHOP_CODE = "PRO-001A"

export const StatsWidget = ({ data }: { data: BlogStats }) => {
  // 控制弹窗显示的状态
  const [showModal, setShowModal] = useState(false)

  return (
    <React.StrictMode>
      <WidgetContainer>
        {/* ================= 弹窗 UI (Modal) ================= */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
            {/* 黑色半透明遮罩 (点击背景关闭) */}
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
              onClick={() => setShowModal(false)}
            ></div>
            
            {/* 弹窗主体 */}
            <div className="relative z-10 w-full max-w-sm transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-800 p-6 text-left align-middle shadow-2xl transition-all border border-neutral-200 dark:border-neutral-700">
              <h3 className="text-lg font-bold leading-6 text-gray-900 dark:text-white text-center mb-2">
                当前商家编号
              </h3>
              
              {/* 编号显示区域 */}
              <div className="my-6 p-4 bg-neutral-100 dark:bg-neutral-900 rounded-xl text-center border-2 border-dashed border-neutral-300 dark:border-neutral-600">
                <span className="text-3xl font-mono font-black text-blue-600 dark:text-blue-400 select-all">
                  {SHOP_CODE}
                </span>
              </div>

              {/* 关闭按钮 */}
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-lg border border-transparent bg-neutral-900 dark:bg-white px-4 py-2.5 text-sm font-medium text-white dark:text-black hover:bg-neutral-700 dark:hover:bg-neutral-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-colors"
                onClick={() => setShowModal(false)}
              >
                关闭
              </button>
            </div>
          </div>
        )}

        {/* ================= 组件主界面 ================= */}
        <div className="flex flex-col h-full justify-between">
          
          {/* 上半部分：提示标题 + 动效手指 */}
          <div className="flex-1 flex flex-col items-center justify-center py-6 space-y-2">
             <h2 className="text-lg font-bold text-neutral-800 dark:text-neutral-100 tracking-wide">
               查看商家编号
             </h2>
             {/* 动效手指：使用 animate-bounce 实现上下跳动 */}
             <div className="text-4xl animate-bounce pt-2 cursor-default select-none filter drop-shadow-md">
               👇
             </div>
          </div>

          {/* 下半部分：双按钮堆叠区域 */}
          <div
            className={classNames(
              'w-full p-3.5',
              'bg-neutral-50 dark:bg-neutral-900/50', // 稍微淡一点的背景区分
              'border-t border-neutral-100 dark:border-neutral-800' // 顶部分割线
            )}
          >
            <div className="flex flex-col gap-3"> {/* gap-3 控制两个按钮之间的间距 */}
              
              {/* 按钮 1：查看编号 (蓝色系，以示区分) */}
              <button 
                onClick={() => setShowModal(true)} 
                type="button" 
                className="group flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-200"
              >
                <span>🔍 查看商家编号</span>
              </button>

              {/* 按钮 2：前往一站式 (保持原有的红色系) */}
              <button 
                onClick={() => window.open('https://login.1zs.top/')} 
                type="button" 
                className="group flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition-all duration-200" 
              >
                <span>🚀 前往一站式</span>
              </button>

            </div>
          </div>
        </div>
      </WidgetContainer>
    </React.StrictMode>
  )
}
