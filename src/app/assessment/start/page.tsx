'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useAssessmentStore } from '@/store/assessment'
import Image from 'next/image'


export default function AssessmentStartPage() {
  const router = useRouter()
  const resetAssessment = useAssessmentStore((state) => state.resetAssessment)

  const handleStart = () => {
    resetAssessment() // 重置所有评估数据
    router.push('/assessment/basic')
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1">
          {/* 添加logo */}
          <div className="flex justify-center mb-4">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={100}
              height={100}
              priority
            />
          </div>
          <CardTitle className="text-2xl text-center">开始您的工作评估</CardTitle>
          <CardDescription className="text-center">
            通过回答一系列问题，帮助您客观评估当前工作
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">评估内容包括：</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>基本工作信息</li>
              <li>时间与能力投入</li>
              <li>薪资与发展空间</li>
              <li>工作环境与价值认同</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">评估说明：</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>评估过程约需 5-10 分钟</li>
              <li>请根据实际情况如实回答</li>
              <li>所有数据仅用于分析，不会对外分享</li>
            </ul>
          </div>

          <Button className="w-full" onClick={handleStart}>
            开始评估
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
