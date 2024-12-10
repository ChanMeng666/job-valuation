// 'use client'

// import { ScoreInput } from '@/components/forms/score-input'
// import { AssessmentLayout } from '@/components/forms/assessment-layout'
// import { useAssessmentStore } from '@/store/assessment'
// import { useRouter } from 'next/navigation'

// export default function TimeSkillPage() {
//   const router = useRouter()
//   const {
//     timeInvestment,
//     skillMatch,
//     workIntensity,
//     setTimeAndSkill,
//     nextStep,
//     previousStep
//   } = useAssessmentStore()

//   const handleNext = () => {
//     nextStep()
//     router.push('/assessment/salary-growth')
//   }

//   const handlePrevious = () => {
//     previousStep()
//     router.push('/assessment/basic')
//   }

//   const isNextDisabled = !timeInvestment || !skillMatch || !workIntensity

//   return (
//     <AssessmentLayout
//       title="时间与能力评估"
//       onNext={handleNext}
//       onPrevious={handlePrevious}
//       isNextDisabled={isNextDisabled}
//     >
//       <div className="space-y-8">
//         <ScoreInput
//           label="时间投入"
//           description="评估你在工作时间投入的合理程度（1分表示时间投入过多，10分表示时间投入合理）"
//           value={timeInvestment}
//           onChange={(value) => setTimeAndSkill({
//             timeInvestment: value,
//             skillMatch,
//             workIntensity
//           })}
//         />

//         <ScoreInput
//           label="能力匹配度"
//           description="评估你的技能和经验与工作要求的匹配程度"
//           value={skillMatch}
//           onChange={(value) => setTimeAndSkill({
//             timeInvestment,
//             skillMatch: value,
//             workIntensity
//           })}
//         />

//         <ScoreInput
//           label="工作强度"
//           description="评估工作压力和强度的合理程度（1分表示强度过大，10分表示强度适中）"
//           value={workIntensity}
//           onChange={(value) => setTimeAndSkill({
//             timeInvestment,
//             skillMatch,
//             workIntensity: value
//           })}
//         />
//       </div>
//     </AssessmentLayout>
//   )
// }


'use client'

import { ScoreInput } from '@/components/forms/score-input'
import { AssessmentLayout } from '@/components/forms/assessment-layout'
import { useAssessmentStore } from '@/store/assessment'
import { useRouter } from 'next/navigation'

export default function TimeSkillPage() {
  const router = useRouter()
  const { scores, setScore, nextStep, previousStep } = useAssessmentStore()

  const handleNext = () => {
    nextStep()
    router.push('/assessment/salary-growth')
  }

  const handlePrevious = () => {
    previousStep()
    router.push('/assessment/basic')
  }

  const isNextDisabled = !scores['time_investment'] || 
                        !scores['skill_match'] || 
                        !scores['work_intensity']

  return (
    <AssessmentLayout
      title="时间与能力评估"
      onNext={handleNext}
      onPrevious={handlePrevious}
      isNextDisabled={isNextDisabled}
    >
      <div className="space-y-8">
        <ScoreInput
          label="时间投入"
          description="评估你在工作时间投入的合理程度（1分表示时间投入过多，10分表示时间投入合理）"
          value={scores['time_investment'] || 0}
          onChange={(value) => setScore('time_investment', value)}
        />

        <ScoreInput
          label="能力匹配度"
          description="评估你的技能和经验与工作要求的匹配程度"
          value={scores['skill_match'] || 0}
          onChange={(value) => setScore('skill_match', value)}
        />

        <ScoreInput
          label="工作强度"
          description="评估工作压力和强度的合理程度（1分表示强度过大，10分表示强度适中）"
          value={scores['work_intensity'] || 0}
          onChange={(value) => setScore('work_intensity', value)}
        />
      </div>
    </AssessmentLayout>
  )
}