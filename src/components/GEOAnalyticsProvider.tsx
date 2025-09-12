'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { GEOAnalytics } from '@/lib/geo-analytics'

interface GEOAnalyticsProviderProps {
  children: React.ReactNode
}

export function GEOAnalyticsProvider({ children }: GEOAnalyticsProviderProps) {
  const pathname = usePathname()

  useEffect(() => {
    // 初始化GEO分析
    GEOAnalytics.init()

    // 追踪页面访问
    GEOAnalytics.trackPageView(pathname)

    // 检测AI流量
    if (GEOAnalytics.isAITraffic()) {
      const source = GEOAnalytics.detectAISource()
      GEOAnalytics.trackConversion(source, 'ai_visit')
      console.log('AI traffic detected from:', source)
    }

    // 追踪AI指令交互
    const handleAIInteraction = (event: CustomEvent) => {
      GEOAnalytics.trackAIInteraction(event.detail.type, event.detail.data)
    }

    // 监听自定义AI交互事件
    window.addEventListener('geo-ai-interaction', handleAIInteraction as EventListener)

    return () => {
      window.removeEventListener('geo-ai-interaction', handleAIInteraction as EventListener)
    }
  }, [pathname])

  return <>{children}</>
}

// 用于触发AI交互事件的工具函数
export const triggerAIInteraction = (type: string, data?: any) => {
  if (typeof window !== 'undefined') {
    const event = new CustomEvent('geo-ai-interaction', {
      detail: { type, data }
    })
    window.dispatchEvent(event)
  }
}
