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
    <div className="container flex min-h-screen w-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-8">
        {/* 欢迎标题 */}
        <div className="text-center space-y-4 fade-in">
          <div className="floating-element">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={120}
              height={120}
              priority
              className="mx-auto"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
            职业价值评估
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            科学评估您的职业价值，智能分析职业发展方向
          </p>
        </div>

        {/* 主要内容卡片 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="card-modern p-8 slide-up">
            <CardHeader className="space-y-4">
              <CardTitle className="text-2xl text-center gradient-primary bg-clip-text text-transparent">
                专业评估系统
              </CardTitle>
              <CardDescription className="text-center text-lg">
                通过多维度科学评估，为您提供专业的职业发展建议
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  评估内容包括：
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30">
                    <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">1</span>
                    基本工作信息与背景
                  </li>
                  <li className="flex items-center gap-3 p-3 rounded-lg bg-purple-50 dark:bg-purple-950/30">
                    <span className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">2</span>
                    时间投入与工作强度
                  </li>
                  <li className="flex items-center gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/30">
                    <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">3</span>
                    薪资回报与发展空间
                  </li>
                  <li className="flex items-center gap-3 p-3 rounded-lg bg-orange-50 dark:bg-orange-950/30">
                    <span className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">4</span>
                    工作环境与价值认同
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="card-modern p-8 slide-up" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="space-y-4">
              <CardTitle className="text-2xl text-center gradient-secondary bg-clip-text text-transparent">
                评估特色
              </CardTitle>
              <CardDescription className="text-center text-lg">
                基于大数据与AI技术，提供个性化分析报告
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  系统优势：
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30">
                    ⚡ 快速评估，仅需 5-10 分钟
                  </li>
                  <li className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30">
                    🎯 基于行业大数据基准对比
                  </li>
                  <li className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-pink-50 to-orange-50 dark:from-pink-950/30 dark:to-orange-950/30">
                    📊 生成专业PDF评估报告
                  </li>
                  <li className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950/30 dark:to-yellow-950/30">
                    🔒 数据隐私，本地处理
                  </li>
                </ul>
              </div>

              <Button 
                className="w-full btn-modern text-lg py-4 hover:scale-105 transition-all duration-300" 
                onClick={handleStart}
              >
                立即开始评估 →
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* 信任指标 */}
        <div className="text-center space-y-4 fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 glass-card rounded-lg">
              <div className="text-2xl font-bold text-blue-600">10+</div>
              <div className="text-sm text-muted-foreground">评估维度</div>
            </div>
            <div className="p-4 glass-card rounded-lg">
              <div className="text-2xl font-bold text-purple-600">AI</div>
              <div className="text-sm text-muted-foreground">智能算法</div>
            </div>
            <div className="p-4 glass-card rounded-lg">
              <div className="text-2xl font-bold text-green-600">安全</div>
              <div className="text-sm text-muted-foreground">数据保护</div>
            </div>
            <div className="p-4 glass-card rounded-lg">
              <div className="text-2xl font-bold text-orange-600">免费</div>
              <div className="text-sm text-muted-foreground">完全免费</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
