// 'use client'

// import { ScoreInput } from '@/components/forms/score-input'
// import { AssessmentLayout } from '@/components/forms/assessment-layout'
// import { useAssessmentStore } from '@/store/assessment'
// import { useRouter } from 'next/navigation'

// export default function SalaryGrowthPage() {
//   const router = useRouter()
//   const {
//     salarySatisfaction,
//     growthPotential,
//     careerDevelopment,
//     setSalaryAndGrowth,
//     nextStep,
//     previousStep
//   } = useAssessmentStore()

//   const handleNext = () => {
//     nextStep()
//     router.push('/assessment/environment-value')
//   }

//   const handlePrevious = () => {
//     previousStep()
//     router.push('/assessment/time-skill')
//   }

//   const isNextDisabled = !salarySatisfaction || !growthPotential || !careerDevelopment

//   return (
//     <AssessmentLayout
//       title="薪资与发展评估"
//       onNext={handleNext}
//       onPrevious={handlePrevious}
//       isNextDisabled={isNextDisabled}
//     >
//       <div className="space-y-8">
//         <ScoreInput
//           label="薪资满意度"
//           description="评估当前薪资水平与你的期望的匹配程度"
//           value={salarySatisfaction}
//           onChange={(value) => setSalaryAndGrowth({
//             salarySatisfaction: value,
//             growthPotential,
//             careerDevelopment
//           })}
//         />

//         <ScoreInput
//           label="成长空间"
//           description="评估在当前工作中的学习和技能提升机会"
//           value={growthPotential}
//           onChange={(value) => setSalaryAndGrowth({
//             salarySatisfaction,
//             growthPotential: value,
//             careerDevelopment
//           })}
//         />

//         <ScoreInput
//           label="职业发展前景"
//           description="评估当前工作对你未来职业发展的帮助程度"
//           value={careerDevelopment}
//           onChange={(value) => setSalaryAndGrowth({
//             salarySatisfaction,
//             growthPotential,
//             careerDevelopment: value
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

export default function SalaryGrowthPage() {
  const router = useRouter()
  const { scores, setScore, nextStep, previousStep } = useAssessmentStore()

  const handleNext = () => {
    nextStep()
    router.push('/assessment/environment-value')
  }

  const handlePrevious = () => {
    previousStep()
    router.push('/assessment/time-skill')
  }

  const isNextDisabled = !scores['salary_satisfaction'] || 
                        !scores['growth_potential'] || 
                        !scores['career_development']

  return (
    <AssessmentLayout
      title="薪资与发展评估"
      onNext={handleNext}
      onPrevious={handlePrevious}
      isNextDisabled={isNextDisabled}
    >
      <div className="space-y-8">
        <ScoreInput
          label="薪资满意度"
          description="评估当前薪资水平与你的期望的匹配程度"
          value={scores['salary_satisfaction'] || 0}
          onChange={(value) => setScore('salary_satisfaction', value)}
        />

        <ScoreInput
          label="成长空间"
          description="评估在当前工作中的学习和技能提升机会"
          value={scores['growth_potential'] || 0}
          onChange={(value) => setScore('growth_potential', value)}
        />

        <ScoreInput
          label="职业发展前景"
          description="评估当前工作对你未来职业发展的帮助程度"
          value={scores['career_development'] || 0}
          onChange={(value) => setScore('career_development', value)}
        />
      </div>
    </AssessmentLayout>
  )
}