/* eslint-disable @next/next/no-img-element */
import { useScreenSize } from '@/src/hooks/useScreenSize'
import { classNames, isValidUrl } from '@/src/lib/util'
import Link from 'next/link'
import { DynamicIcon } from '../DynamicIcon'
import { WidgetContainer } from './WidgetContainer'

const LinkIcon = ({ icon, hasId }: { icon: string; hasId: boolean }) => {
  const { isMobile, isTablet, isDesktop, isWidescreen } = useScreenSize()

  let iconSize
  if (isMobile || isTablet) {
    iconSize = 15
  }
  if (isDesktop) {
    iconSize = isDesktop && hasId ? 15 : 20
  }
  if (isWidescreen) {
    iconSize = hasId ? 20 : 30
  }

  if (icon === '') {
    return (
      <DynamicIcon
        nameIcon="FaQuestionCircle"
        propsIcon={{
          size: iconSize,
        }}
      />
    )
  }
  if (isValidUrl(icon) || icon.startsWith('/')) {
    return (
      <img
        className="aspect-square"
        height={iconSize}
        width={iconSize}
        src={icon}
        alt={'social-logo'}
      />
    )
  }
  return (
    <DynamicIcon
      nameIcon={icon}
      propsIcon={{
        size: iconSize,
      }}
    />
  )
}

// 使用 any 绕过类型检查
export const ProfileWidget = ({ data }: { data: any }) => {
  // 安全获取头像地址，优先用原始结构 data.logo.src
  const logoSrc = data?.logo?.src || data?.image || data?.avatar || '';

  return (
    <WidgetContainer>
      <div className="w-full h-full">
        {/* 上半部分：个人信息 */}
        <div className="flex h-[72%] w-full flex-col items-start overflow-hidden px-3.5 pt-3.5 md:h-3/5 md:flex-row md:items-center md:justify-start md:space-x-3 md:px-3 md:py-2.5 lg:space-x-4 lg:px-5 lg:py-4">
          <div className="h-full overflow-hidden rotate-0 aspect-square rounded-2xl sm:mb-0 md:rounded-full">
            {/* 🛑 修复 Build 报错：替换 ImageWithPlaceholder 为普通 img */}
            {logoSrc ? (
              <img
                src={logoSrc}
                alt="portrait"
                className="w-full h-full object-cover rounded-2xl md:rounded-full"
              />
            ) : (
              <div className="w-full h-full bg-neutral-200 dark:bg-neutral-800 rounded-2xl md:rounded-full"></div>
            )}
          </div>
          <div className="mt-2 flex flex-col justify-between gap-0.5 text-black dark:text-white md:mt-0">
            <h1 className="mb-2 text-base font-semibold tracking-tighter line-clamp-1 sm:mb-3 sm:text-base sm:tracking-normal md:mb-0 md:text-xl md:font-medium lg:text-2xl">
              {data?.name || 'Profile'}
            </h1>
            <h2 className="hidden text-sm md:line-clamp-1 lg:text-sm">
              {data?.description}
            </h2>
          </div>
        </div>

        {/* 下半部分：三个写死的固定按钮 */}
        <div
          className={classNames(
            'h-[28%] w-full md:h-2/5',
            'md:bg-neutral-100 md:dark:bg-neutral-800'
          )}
        >
          <div className="scrollbar-hide flex h-full w-full flex-row items-center justify-center overflow-scroll px-3.5 pt-1 pb-3 font-medium md:justify-center md:gap-x-1 md:py-2 lg:px-5 lg:py-3 lg:text-sm">
            
             {/* 按钮 1：入会说明 */}
             <Link
                key={'aaa'}
                href={'/about'}
                rel="noopener noreferrer"
                // ⬇️ 修复颜色BUG：移除了 bg-gradient-to-tr 和 from-neutral... 等灰色类名
                className={classNames(
                  'leading-0 w-full transform cursor-pointer items-center justify-center rounded-lg text-white transition duration-300 ease-in-out hover:scale-95 md:h-full md:w-auto md:rounded-xl lg:rounded-2xl',
                  true
                    ? 'aspect-square md:aspect-auto md:gap-x-0.5 md:px-1.5 lg:gap-x-1.5 lg:px-3'
                    : 'aspect-square',
                   'flex'
                )}
                // ⬇️ 修复颜色BUG：移除了 !important，使用标准 background 属性
                style={{
                  background: 'linear-gradient(to top right, #b80ce4, #2c16ab)',
                }}
              >
                <LinkIcon icon={'FaCrown'} hasId={!!true} />
                <p className="hidden md:block md:text-xs lg:text-base">
                  {'入会说明'}
                </p>
              </Link>

              {/* 按钮 2：下载说明 */}
              <Link
                key={'bbb'}
                href={'/download'}
                rel="noopener noreferrer"
                className={classNames(
                  'leading-0 w-full transform cursor-pointer items-center justify-center rounded-lg text-white transition duration-300 ease-in-out hover:scale-95 md:h-full md:w-auto md:rounded-xl lg:rounded-2xl',
                  true
                    ? 'aspect-square md:aspect-auto md:gap-x-0.5 md:px-1.5 lg:gap-x-1.5 lg:px-3'
                    : 'aspect-square',
                   'flex'
                )}
                style={{
                  background: 'linear-gradient(to top right, #eb9b34, #f0a94d)',
                }}
              >
                <LinkIcon icon={'IoMdCloudDownload'} hasId={!!true} />
                <p className="hidden md:block md:text-xs lg:text-base">
                  {'下载说明'}
                </p>
              </Link>

               {/* 按钮 3：更多资源 */}
               <Link
                key={'ccc'}
                href={'/friends'}
                rel="noopener noreferrer"
                className={classNames(
                  'leading-0 w-full transform cursor-pointer items-center justify-center rounded-lg text-white transition duration-300 ease-in-out hover:scale-95 md:h-full md:w-auto md:rounded-xl lg:rounded-2xl',
                  true
                    ? 'aspect-square md:aspect-auto md:gap-x-0.5 md:px-1.5 lg:gap-x-1.5 lg:px-3'
                    : 'aspect-square',
                   'flex'
                )}
                style={{
                  background: 'linear-gradient(to top right, #0a69c6, #0088fa)',
                }}
              >
                <LinkIcon icon={'HiOutlineViewGridAdd'} hasId={!!true} />
                <p className="hidden md:block md:text-xs lg:text-base">
                  {'更多资源'}
                </p>
              </Link>
          </div>
        </div>
      </div>
    </WidgetContainer>
  )
}
