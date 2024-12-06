'use client'

import { ScoreInput } from '@/components/forms/score-input'
import { AssessmentLayout } from '@/components/forms/assessment-layout'
import { useAssessmentStore } from '@/store/assessment'
import { useRouter } from 'next/navigation'

export default function EnvironmentValuePage() {
  const router = useRouter()
  const {
    workEnvironment,
    teamRelationship,
    workAutonomy,
    valueAlignment,
    setEnvironmentAndValue,
    nextStep,
    previousStep
  } = useAssessmentStore()

  const handleNext = () => {
    nextStep()
    router.push('/assessment/result')
  }

  const handlePrevious = () => {
    previousStep()
    router.push('/assessment/salary-growth')
  }

  const isNextDisabled = !workEnvironment || !teamRelationship || !workAutonomy || !valueAlignment

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
          value={workEnvironment}
          onChange={(value) => setEnvironmentAndValue({
            workEnvironment: value,
            teamRelationship,
            workAutonomy,
            valueAlignment
          })}
        />

        <ScoreInput
          label="团队关系"
          description="评估与同事、上级的沟通和协作质量"
          value={teamRelationship}
          onChange={(value) => setEnvironmentAndValue({
            workEnvironment,
            teamRelationship: value,
            workAutonomy,
            valueAlignment
          })}
        />

        <ScoreInput
          label="工作自主度"
          description="评估在工作中的决策权和自主发挥空间"
          value={workAutonomy}
          onChange={(value) => setEnvironmentAndValue({
            workEnvironment,
            teamRelationship,
            workAutonomy: value,
            valueAlignment
          })}
        />

        <ScoreInput
          label="价值认同度"
          description="评估公司文化和价值观与个人的契合程度"
          value={valueAlignment}
          onChange={(value) => setEnvironmentAndValue({
            workEnvironment,
            teamRelationship,
            workAutonomy,
            valueAlignment: value
          })}
        />
      </div>
    </AssessmentLayout>
  )
}
