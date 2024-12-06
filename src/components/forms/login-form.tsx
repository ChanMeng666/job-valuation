'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export function LoginForm() {
  const router = useRouter()

  const handleDemoLogin = () => {
    router.push('/assessment/start') // 直接跳转到评估问卷页面
  }

  return (
    <div className="space-y-6">
      <Button 
        type="button" 
        className="w-full"
        onClick={handleDemoLogin}
      >
        进入评估系统
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        点击按钮直接进入评估系统
      </p>
    </div>
  )
}
