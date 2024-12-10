'use client'

import { ScoreInput } from '@/components/forms/score-input'
import { AssessmentLayout } from '@/components/forms/assessment-layout'
import { useAssessmentStore } from '@/store/assessment'
import { useRouter } from 'next/navigation'

export default function EnvironmentValuePage() {
  const router = useRouter()
  const { scores, setScore, nextStep, previousStep } = useAssessmentStore()

  const handleNext = () => {
    nextStep()
    router.push('/assessment/result')
  }

  const handlePrevious = () => {
    previousStep()
    router.push('/assessment/salary-growth')
  }

  const isNextDisabled = !scores['work_environment'] || 
                        !scores['team_relationship'] || 
                        !scores['work_autonomy'] || 
                        !scores['value_alignment']

  return (
    <AssessmentLayout
      title="环境与价值评估"
      onNext={handleNext}
      onPrevious={handlePrevious}
      isNextDisabled={isNextDisabled}
      nextButtonText="完成评估"
    >
      <div className="space-y-8">
        <ScoreInput
          label="工作环境"
          description="评估办公环境、通勤条件等硬件设施的满意度"
          value={scores['work_environment'] || 0}
          onChange={(value) => setScore('work_environment', value)}
        />

        <ScoreInput
          label="团队关系"
          description="评估与同事、上级的沟通和协作质量"
          value={scores['team_relationship'] || 0}
          onChange={(value) => setScore('team_relationship', value)}
        />

        <ScoreInput
          label="工作自主度"
          description="评估在工作中的决策权和自主发挥空间"
          value={scores['work_autonomy'] || 0}
          onChange={(value) => setScore('work_autonomy', value)}
        />

        <ScoreInput
          label="价值认同度"
          description="评估公司文化和价值观与个人的契合程度"
          value={scores['value_alignment'] || 0}
          onChange={(value) => setScore('value_alignment', value)}
        />
      </div>
    </AssessmentLayout>
  )
}