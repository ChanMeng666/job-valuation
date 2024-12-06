'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAssessmentStore } from '@/store/assessment'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts'

export default function ResultPage() {
  const router = useRouter()
  const assessment = useAssessmentStore()

  // 计算总分
  const calculateTotalScore = () => {
    const scores = [
      assessment.timeInvestment,
      assessment.skillMatch,
      assessment.workIntensity,
      assessment.salarySatisfaction,
      assessment.growthPotential,
      assessment.careerDevelopment,
      assessment.workEnvironment,
      assessment.teamRelationship,
      assessment.workAutonomy,
      assessment.valueAlignment
    ]
    
    const totalScore = scores.reduce((a, b) => a + b, 0) / scores.length
    return totalScore.toFixed(1)
  }

  // 准备雷达图数据
  const chartData = [
    {
      category: '时间投入',
      value: assessment.timeInvestment,
      fullMark: 10
    },
    {
      category: '能力匹配',
      value: assessment.skillMatch,
      fullMark: 10
    },
    {
      category: '薪资满意',
      value: assessment.salarySatisfaction,
      fullMark: 10
    },
    {
      category: '成长空间',
      value: assessment.growthPotential,
      fullMark: 10
    },
    {
      category: '工作环境',
      value: assessment.workEnvironment,
      fullMark: 10
    },
    {
      category: '团队关系',
      value: assessment.teamRelationship,
      fullMark: 10
    }
  ]

  const handleStartOver = () => {
    assessment.resetAssessment()
    router.push('/assessment/start')
  }

  const scoreLevel = (score: number) => {
    if (score >= 8) return { text: '优秀', color: 'text-green-600' }
    if (score >= 6) return { text: '良好', color: 'text-blue-600' }
    if (score >= 4) return { text: '一般', color: 'text-yellow-600' }
    return { text: '需改善', color: 'text-red-600' }
  }

  const totalScore = calculateTotalScore()
  const { text: levelText, color: levelColor } = scoreLevel(parseFloat(totalScore))

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl text-center">工作性价比评估结果</CardTitle>
          <CardDescription className="text-center">
            基于您的评估，我们生成了以下分析报告
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">{totalScore}</div>
            <div className={`font-medium ${levelColor}`}>{levelText}</div>
          </div>

          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={chartData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="category" />
                <PolarRadiusAxis angle={30} domain={[0, 10]} />
                <Radar
                  name="得分"
                  dataKey="value"
                  stroke="#6366F1"
                  fill="#6366F1"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">评估维度分析：</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries({
                '时间投入评分': assessment.timeInvestment,
                '能力匹配评分': assessment.skillMatch,
                '工作强度评分': assessment.workIntensity,
                '薪资满意评分': assessment.salarySatisfaction,
                '成长空间评分': assessment.growthPotential,
                '职业发展评分': assessment.careerDevelopment,
                '工作环境评分': assessment.workEnvironment,
                '团队关系评分': assessment.teamRelationship,
                '工作自主评分': assessment.workAutonomy,
                '价值认同评分': assessment.valueAlignment,
              }).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">{key}:</span>
                  <span className={`font-medium ${scoreLevel(value).color}`}>
                    {value} ({scoreLevel(value).text})
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <Button onClick={handleStartOver}>
              重新评估
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
