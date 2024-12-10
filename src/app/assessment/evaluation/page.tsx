'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AssessmentLayout } from '@/components/forms/assessment-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { useAssessmentStore } from '@/store/assessment'
import { DIMENSIONS } from '@/types/assessment'

export default function EvaluationPage() {
  const router = useRouter()
  const { scores, setScore, nextStep, previousStep } = useAssessmentStore()
  const [activeTab, setActiveTab] = useState(DIMENSIONS[0].id)

  const handleNext = () => {
    nextStep()
    router.push('/assessment/result')
  }

  const handlePrevious = () => {
    previousStep()
    router.push('/assessment/basic')
  }

  // 检查是否所有必填项都已填写
  const isComplete = (dimensionId: string) => {
    const dimension = DIMENSIONS.find(d => d.id === dimensionId)
    if (!dimension) return false
    return dimension.metrics.every(metric => scores[metric.id] !== undefined)
  }

  // 计算总体完成进度
  const totalProgress = () => {
    const totalMetrics = DIMENSIONS.reduce((sum, d) => sum + d.metrics.length, 0)
    const completedMetrics = Object.keys(scores).length
    return (completedMetrics / totalMetrics) * 100
  }

  // 检查是否所有维度都已完成评估
  const isAllComplete = DIMENSIONS.every(d => isComplete(d.id))

  return (
    <AssessmentLayout
      title="工作评估"
      subtitle="请根据实际情况为每个维度打分"
      onNext={handleNext}
      onPrevious={handlePrevious}
      isNextDisabled={!isAllComplete}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>总体完成进度</span>
            <span>{Math.round(totalProgress())}%</span>
          </div>
          <Progress value={totalProgress()} className="h-2" />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 h-auto">
            {["付出", "回报", "匹配度"].map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {["付出", "回报", "匹配度"].map((category) => (
            <TabsContent key={category} value={category}>
              <div className="space-y-6">
                {DIMENSIONS.filter(d => d.category === category).map((dimension) => (
                  <Card key={dimension.id}>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center justify-between">
                        <span>{dimension.title}</span>
                        <span className="text-sm font-normal">
                          {isComplete(dimension.id) ? '已完成' : '未完成'}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {dimension.metrics.map((metric) => (
                          <div key={metric.id} className="space-y-4">
                            <div>
                              <Label className="text-base">{metric.title}</Label>
                              <p className="text-sm text-muted-foreground">
                                {metric.description}
                              </p>
                            </div>
                            <RadioGroup
                              value={scores[metric.id]?.toString()}
                              onValueChange={(value) =>
                                setScore(metric.id, parseInt(value))
                              }
                              className="grid gap-4"
                            >
                              {metric.levels.map((level) => (
                                <Label
                                  key={level.score}
                                  className="flex items-center space-x-2 p-4 rounded-lg border cursor-pointer hover:bg-accent"
                                >
                                  <RadioGroupItem value={level.score.toString()} />
                                  <div className="flex-1">
                                    <div className="flex justify-between">
                                      <span>{level.description}</span>
                                      <span className="text-muted-foreground">
                                        {level.score}分
                                      </span>
                                    </div>
                                  </div>
                                </Label>
                              ))}
                            </RadioGroup>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </AssessmentLayout>
  )
}