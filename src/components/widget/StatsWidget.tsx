import { colorMap } from '@/src/lib/colors'
import { classNames } from '@/src/lib/util'
import { BlogStats } from '@/src/types/blog'
import React from 'react'
import PVStats from './components/stats/PVStats'
import { StatsGraph } from './components/stats/StatsGraph'
import { WidgetContainer } from './WidgetContainer'

export const StatsWidget = ({ data }: { data: BlogStats }) => {
  const postNum = data.posts
  const topicNum = data.tags
  const timeline = data.timeline

  return (
    <React.StrictMode>
      <WidgetContainer>
        <div className="items-sketch flex flex-col h-full justify-between px-3.5 py-3 md:px-4 md:py-3 lg:px-5 lg:py-4">
        <div className="flex h-[42%] w-full flex-row items-start overflow-hidden px-3.5 pt-3.5  md:flex-row md:items-center md:justify-center md:space-x-3 md:px-3 md:py-2.5 lg:space-x-4 lg:px-5 lg:py-4">
        
           <div className='flex'>
           <span className="md:text-3xl md:font-medium lg:text-3xl mr-3 text-red-600">嗨~</span>
           <span className="md:text-3xl md:font-medium  font-bold">欢迎来到我的频道</span>
           </div>
         
        </div>
        <div
          className={classNames(
            'h-[58%] w-full',
            'md:bg-neutral-100 md:dark:bg-neutral-900'
          )}
        >
          <div className="scrollbar-hide flex h-full w-full flex-col items-center justify-between gap-x-1.5 overflow-scroll px-3.5 pt-1 pb-3 font-medium md:justify-start md:gap-x-1 md:px-3 md:py-2 lg:gap-x-3 lg:px-5 lg:py-3 lg:text-sm">
          <button onClick={()=>{window.open('')}} type="submit" className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400" 
              >查看我的编号</button>
              <button onClick={()=>{window.open('https://login.1zs.top')}} type="submit" className="mt-2 flex w-full justify-center rounded-md bg-neutral-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400" 
              >前往一站式仓库</button>
          </div>
        </div>
        </div>
      </WidgetContainer>
    </React.StrictMode>
  )
}
