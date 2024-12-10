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

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { AssessmentLayout } from '@/components/forms/assessment-layout'
import { useAssessmentStore } from '@/store/assessment'
import { useRouter } from 'next/navigation'

const industries = [
  '互联网/IT',
  '金融',
  '教育',
  '医疗健康',
  '制造业',
  '零售',
  '房地产',
  '其他'
]

const experienceLevels = [
  '应届毕业',
  '1-3年',
  '3-5年',
  '5-10年',
  '10年以上'
]

export default function BasicInfoPage() {
  const router = useRouter()
  const { 
    jobInfo,
    setJobInfo,
    nextStep
  } = useAssessmentStore()

  const handleNext = () => {
    nextStep()
    router.push('/assessment/evaluation')
  }

  const isNextDisabled = !jobInfo.title || !jobInfo.company || !jobInfo.industry || !jobInfo.experience

  return (
    <AssessmentLayout
      title="基本信息"
      subtitle="请填写您当前工作的基本信息"
      onNext={handleNext}
      isPreviousDisabled={true}
      isNextDisabled={isNextDisabled}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>职位名称</Label>
          <Input
            placeholder="请输入您的职位名称"
            value={jobInfo.title}
            onChange={(e) => setJobInfo({
              ...jobInfo,
              title: e.target.value
            })}
          />
        </div>

        <div className="space-y-2">
          <Label>公司名称</Label>
          <Input
            placeholder="请输入您的公司名称"
            value={jobInfo.company}
            onChange={(e) => setJobInfo({
              ...jobInfo,
              company: e.target.value
            })}
          />
        </div>

        <div className="space-y-2">
          <Label>所属行业</Label>
          <Select
            value={jobInfo.industry}
            onValueChange={(value) => setJobInfo({
              ...jobInfo,
              industry: value
            })}
          >
            <SelectTrigger>
              <SelectValue placeholder="选择所属行业" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>工作年限</Label>
          <Select
            value={jobInfo.experience}
            onValueChange={(value) => setJobInfo({
              ...jobInfo,
              experience: value
            })}
          >
            <SelectTrigger>
              <SelectValue placeholder="选择工作年限" />
            </SelectTrigger>
            <SelectContent>
              {experienceLevels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </AssessmentLayout>
  )
}