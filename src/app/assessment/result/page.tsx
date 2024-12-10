// 'use client'

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
// import { useAssessmentStore } from '@/store/assessment'
// import { Button } from '@/components/ui/button'
// import { useRouter } from 'next/navigation'
// import {
//   Radar,
//   RadarChart,
//   PolarGrid,
//   PolarAngleAxis,
//   PolarRadiusAxis,
//   ResponsiveContainer
// } from 'recharts'

// export default function ResultPage() {
//   const router = useRouter()
//   const assessment = useAssessmentStore()

//   // 计算总分
//   const calculateTotalScore = () => {
//     const scores = [
//       assessment.timeInvestment,
//       assessment.skillMatch,
//       assessment.workIntensity,
//       assessment.salarySatisfaction,
//       assessment.growthPotential,
//       assessment.careerDevelopment,
//       assessment.workEnvironment,
//       assessment.teamRelationship,
//       assessment.workAutonomy,
//       assessment.valueAlignment
//     ]
    
//     const totalScore = scores.reduce((a, b) => a + b, 0) / scores.length
//     return totalScore.toFixed(1)
//   }

//   // 准备雷达图数据
//   const chartData = [
//     {
//       category: '时间投入',
//       value: assessment.timeInvestment,
//       fullMark: 10
//     },
//     {
//       category: '能力匹配',
//       value: assessment.skillMatch,
//       fullMark: 10
//     },
//     {
//       category: '薪资满意',
//       value: assessment.salarySatisfaction,
//       fullMark: 10
//     },
//     {
//       category: '成长空间',
//       value: assessment.growthPotential,
//       fullMark: 10
//     },
//     {
//       category: '工作环境',
//       value: assessment.workEnvironment,
//       fullMark: 10
//     },
//     {
//       category: '团队关系',
//       value: assessment.teamRelationship,
//       fullMark: 10
//     }
//   ]

//   const handleStartOver = () => {
//     assessment.resetAssessment()
//     router.push('/assessment/start')
//   }

//   const scoreLevel = (score: number) => {
//     if (score >= 8) return { text: '优秀', color: 'text-green-600' }
//     if (score >= 6) return { text: '良好', color: 'text-blue-600' }
//     if (score >= 4) return { text: '一般', color: 'text-yellow-600' }
//     return { text: '需改善', color: 'text-red-600' }
//   }

//   const totalScore = calculateTotalScore()
//   const { text: levelText, color: levelColor } = scoreLevel(parseFloat(totalScore))

//   return (
//     <div className="container max-w-4xl mx-auto py-8 px-4">
//       <Card className="mb-8">
//         <CardHeader>
//           <CardTitle className="text-2xl text-center">工作性价比评估结果</CardTitle>
//           <CardDescription className="text-center">
//             基于您的评估，我们生成了以下分析报告
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           <div className="text-center">
//             <div className="text-4xl font-bold mb-2">{totalScore}</div>
//             <div className={`font-medium ${levelColor}`}>{levelText}</div>
//           </div>

//           <div className="h-[400px] w-full">
//             <ResponsiveContainer width="100%" height="100%">
//               <RadarChart data={chartData}>
//                 <PolarGrid />
//                 <PolarAngleAxis dataKey="category" />
//                 <PolarRadiusAxis angle={30} domain={[0, 10]} />
//                 <Radar
//                   name="得分"
//                   dataKey="value"
//                   stroke="#6366F1"
//                   fill="#6366F1"
//                   fillOpacity={0.6}
//                 />
//               </RadarChart>
//             </ResponsiveContainer>
//           </div>

//           <div className="space-y-4">
//             <h3 className="text-lg font-medium">评估维度分析：</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {Object.entries({
//                 '时间投入评分': assessment.timeInvestment,
//                 '能力匹配评分': assessment.skillMatch,
//                 '工作强度评分': assessment.workIntensity,
//                 '薪资满意评分': assessment.salarySatisfaction,
//                 '成长空间评分': assessment.growthPotential,
//                 '职业发展评分': assessment.careerDevelopment,
//                 '工作环境评分': assessment.workEnvironment,
//                 '团队关系评分': assessment.teamRelationship,
//                 '工作自主评分': assessment.workAutonomy,
//                 '价值认同评分': assessment.valueAlignment,
//               }).map(([key, value]) => (
//                 <div key={key} className="flex justify-between items-center p-2 bg-gray-50 rounded">
//                   <span className="text-sm">{key}:</span>
//                   <span className={`font-medium ${scoreLevel(value).color}`}>
//                     {value} ({scoreLevel(value).text})
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="flex justify-center">
//             <Button onClick={handleStartOver}>
//               重新评估
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }



'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useAssessmentStore } from '@/store/assessment'
import { calculateScore, DIMENSIONS } from '@/types/assessment'
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

export default function ResultPage() {
  const router = useRouter()
  const { 
    scores, 
    basicInfo,
    currentResult,
    setResult,
    addToHistory,
    resetAssessment 
  } = useAssessmentStore()

  useEffect(() => {
    if (Object.keys(scores).length === 0) {
      router.push('/assessment/start')
      return
    }

    const result = calculateScore(scores, basicInfo)
    setResult(result)
    
    // 添加到历史记录
    addToHistory({
      ...result,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    })
  }, [scores, basicInfo, router, setResult, addToHistory])

  const handleStartOver = () => {
    resetAssessment()
    router.push('/assessment/start')
  }

  if (!currentResult) return null

  const radarData = Object.entries(currentResult.dimensionScores).map(
    ([key, value]) => ({
      dimension: DIMENSIONS.find(d => d.id === key)?.title || key,
      value
    })
  )

  const categoryData = Object.entries(currentResult.categoryScores).map(
    ([key, value]) => ({
      category: key,
      value: parseFloat(value.toFixed(1))
    })
  )

  const getScoreLevel = (score: number) => {
    if (score >= 90) return { 
      title: '优秀', 
      color: 'text-green-600',
      description: '当前工作非常适合你，建议继续保持'
    }
    if (score >= 80) return { 
      title: '良好', 
      color: 'text-blue-600',
      description: '工作质量良好，仍有提升空间'
    }
    if (score >= 70) return { 
      title: '一般', 
      color: 'text-yellow-600',
      description: '工作基本满意，需要关注改进空间'
    }
    if (score >= 60) return { 
      title: '待改善', 
      color: 'text-orange-600',
      description: '建议认真考虑改善方案'
    }
    return { 
      title: '不适合', 
      color: 'text-red-600',
      description: '建议慎重考虑是否需要调整工作'
    }
  }

  const overallScore = 
    (currentResult.balanceScore + currentResult.matchScore) / 2
  const { title: levelText, color: levelColor, description: levelDescription } = 
    getScoreLevel(overallScore)

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">工作性价比评估结果</CardTitle>
          <CardDescription className="text-center">
            基于您的评估，我们生成了以下分析报告
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">综合得分</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-center">
                  {overallScore.toFixed(1)}
                </div>
                <div className={`text-center font-medium ${levelColor}`}>
                  {levelText}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">付出与回报平衡度</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-center">
                  {currentResult.balanceScore.toFixed(1)}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">岗位匹配度</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-center">
                  {currentResult.matchScore.toFixed(1)}
                </div>
              </CardContent>
            </Card>
          </div>

          <Alert>
            <AlertTitle>评估结论</AlertTitle>
            <AlertDescription>{levelDescription}</AlertDescription>
          </Alert>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>维度分析</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis 
                      dataKey="dimension"
                      tick={{ fill: '#888', fontSize: 12 }}
                    />
                    <PolarRadiusAxis angle={30} domain={[0, 10]} />
                    <Radar
                      name="得分"
                      dataKey="value"
                      stroke="#2563eb"
                      fill="#2563eb"
                      fillOpacity={0.6}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>类别分析</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="category"
                      tick={{ fill: '#888', fontSize: 12 }}
                    />
                    <YAxis domain={[0, 10]} />
                    <Tooltip />
                    <Bar 
                      dataKey="value" 
                      fill="#2563eb"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>改进建议</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentResult.suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-medium">{suggestion.dimension}</h4>
                      <p className="text-sm text-muted-foreground">
                        {suggestion.suggestion}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center space-x-4">
            <Button size="lg" onClick={handleStartOver}>
              重新评估
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}