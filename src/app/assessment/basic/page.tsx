// 'use client'

// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
// import { AssessmentLayout } from '@/components/forms/assessment-layout'
// import { useAssessmentStore } from '@/store/assessment'
// import { useRouter } from 'next/navigation'

// const industries = [
//   '互联网/IT',
//   '金融',
//   '教育',
//   '医疗健康',
//   '制造业',
//   '零售',
//   '房地产',
//   '其他'
// ]

// const jobTypes = [
//   '全职',
//   '兼职',
//   '实习',
//   '自由职业',
//   '其他'
// ]

// const experienceLevels = [
//   '应届毕业',
//   '1-3年',
//   '3-5年',
//   '5-10年',
//   '10年以上'
// ]

// export default function BasicInfoPage() {
//   const router = useRouter()
//   const { 
//     jobType, 
//     industry, 
//     yearsOfExperience, 
//     currentPosition,
//     setBasicInfo,
//     nextStep
//   } = useAssessmentStore()

//   const handleNext = () => {
//     nextStep()
//     router.push('/assessment/time-skill')
//   }

//   const isNextDisabled = !jobType || !industry || !yearsOfExperience || !currentPosition

//   return (
//     <AssessmentLayout
//       title="基本信息"
//       onNext={handleNext}
//       isPreviousDisabled={true}
//       isNextDisabled={isNextDisabled}
//     >
//       <div className="space-y-6">
//         <div className="space-y-2">
//           <Label>工作类型</Label>
//           <Select
//             value={jobType}
//             onValueChange={(value) => setBasicInfo({ 
//               jobType: value,
//               industry,
//               yearsOfExperience,
//               currentPosition
//             })}
//           >
//             <SelectTrigger>
//               <SelectValue placeholder="选择工作类型" />
//             </SelectTrigger>
//             <SelectContent>
//               {jobTypes.map((type) => (
//                 <SelectItem key={type} value={type}>
//                   {type}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>

//         <div className="space-y-2">
//           <Label>所属行业</Label>
//           <Select
//             value={industry}
//             onValueChange={(value) => setBasicInfo({
//               jobType,
//               industry: value,
//               yearsOfExperience,
//               currentPosition
//             })}
//           >
//             <SelectTrigger>
//               <SelectValue placeholder="选择所属行业" />
//             </SelectTrigger>
//             <SelectContent>
//               {industries.map((ind) => (
//                 <SelectItem key={ind} value={ind}>
//                   {ind}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>

//         <div className="space-y-2">
//           <Label>工作年限</Label>
//           <Select
//             value={yearsOfExperience}
//             onValueChange={(value) => setBasicInfo({
//               jobType,
//               industry,
//               yearsOfExperience: value,
//               currentPosition
//             })}
//           >
//             <SelectTrigger>
//               <SelectValue placeholder="选择工作年限" />
//             </SelectTrigger>
//             <SelectContent>
//               {experienceLevels.map((level) => (
//                 <SelectItem key={level} value={level}>
//                   {level}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>

//         <div className="space-y-2">
//           <Label>当前职位</Label>
//           <Input
//             placeholder="请输入您的职位名称"
//             value={currentPosition}
//             onChange={(e) => setBasicInfo({
//               jobType,
//               industry,
//               yearsOfExperience,
//               currentPosition: e.target.value
//             })}
//           />
//         </div>
//       </div>
//     </AssessmentLayout>
//   )
// }


'use client'

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { AssessmentLayout } from '@/components/forms/assessment-layout'
import { useAssessmentStore } from '@/store/assessment'
import { useRouter } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import {
  AGE_GROUPS,
  EDUCATION_LEVELS,
  EXPERIENCE_LEVELS,
  CITY_TIERS,
  INDUSTRIES,
  JOB_CATEGORIES,
  JOB_LEVELS,
  JOB_TYPES
} from '@/types/assessment'
import { Progress } from '@/components/ui/progress'

export default function BasicInfoPage() {
  const router = useRouter()
  const { basicInfo, setBasicInfo, nextStep } = useAssessmentStore()

  const handleNext = () => {
    nextStep()
    router.push('/assessment/evaluation')
  }

  // 计算完成度
  const getCompletionPercentage = () => {
    const totalFields = 8 // 总字段数
    const completedFields = Object.values(basicInfo).filter(Boolean).length
    return (completedFields / totalFields) * 100
  }

  const isNextDisabled = !(
    basicInfo.ageGroup &&
    basicInfo.education &&
    basicInfo.experience &&
    basicInfo.cityTier &&
    basicInfo.industry &&
    basicInfo.jobCategory &&
    basicInfo.jobLevel &&
    basicInfo.jobType
  )

  return (
    <AssessmentLayout
      title="基本信息"
      subtitle="完善个人和职位信息，获得更准确的评估结果"
      onNext={handleNext}
      isPreviousDisabled={true}
      isNextDisabled={isNextDisabled}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>完成进度</span>
            <span>{Math.round(getCompletionPercentage())}%</span>
          </div>
          <Progress value={getCompletionPercentage()} className="h-2" />
        </div>

        <Tabs defaultValue="personal" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="personal">个人信息</TabsTrigger>
            <TabsTrigger value="job">职位信息</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal">
            <Card>
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-2">
                  <Label>年龄段</Label>
                  <Select
                    value={basicInfo.ageGroup}
                    onValueChange={(value) => setBasicInfo({ ageGroup: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择年龄段" />
                    </SelectTrigger>
                    <SelectContent>
                      {AGE_GROUPS.map((age) => (
                        <SelectItem key={age} value={age}>
                          {age}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>教育程度</Label>
                  <Select
                    value={basicInfo.education}
                    onValueChange={(value) => setBasicInfo({ education: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择教育程度" />
                    </SelectTrigger>
                    <SelectContent>
                      {EDUCATION_LEVELS.map((edu) => (
                        <SelectItem key={edu} value={edu}>
                          {edu}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>工作年限</Label>
                  <Select
                    value={basicInfo.experience}
                    onValueChange={(value) => setBasicInfo({ experience: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择工作年限" />
                    </SelectTrigger>
                    <SelectContent>
                      {EXPERIENCE_LEVELS.map((exp) => (
                        <SelectItem key={exp} value={exp}>
                          {exp}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>所在城市级别</Label>
                  <Select
                    value={basicInfo.cityTier}
                    onValueChange={(value) => setBasicInfo({ cityTier: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择城市级别" />
                    </SelectTrigger>
                    <SelectContent>
                      {CITY_TIERS.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="job">
            <Card>
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-2">
                  <Label>所属行业</Label>
                  <Select
                    value={basicInfo.industry}
                    onValueChange={(value) => setBasicInfo({ industry: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择所属行业" />
                    </SelectTrigger>
                    <SelectContent>
                      {INDUSTRIES.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>职位类别</Label>
                  <Select
                    value={basicInfo.jobCategory}
                    onValueChange={(value) => setBasicInfo({ jobCategory: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择职位类别" />
                    </SelectTrigger>
                    <SelectContent>
                      {JOB_CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>职位级别</Label>
                  <Select
                    value={basicInfo.jobLevel}
                    onValueChange={(value) => setBasicInfo({ jobLevel: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择职位级别" />
                    </SelectTrigger>
                    <SelectContent>
                      {JOB_LEVELS.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>工作性质</Label>
                  <Select
                    value={basicInfo.jobType}
                    onValueChange={(value) => setBasicInfo({ jobType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择工作性质" />
                    </SelectTrigger>
                    <SelectContent>
                      {JOB_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AssessmentLayout>
  )
}