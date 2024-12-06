import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

interface AssessmentLayoutProps {
  title: string
  children: React.ReactNode
  onPrevious?: () => void
  onNext?: () => void
  isPreviousDisabled?: boolean
  isNextDisabled?: boolean
  nextButtonText?: string
}

export function AssessmentLayout({
  title,
  children,
  onPrevious,
  onNext,
  isPreviousDisabled = false,
  isNextDisabled = false,
  nextButtonText = '下一步'
}: AssessmentLayoutProps) {
  return (
    <div className="container max-w-3xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{title}</CardTitle>
        </CardHeader>
        
        <CardContent>
          {children}
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={isPreviousDisabled}
          >
            上一步
          </Button>
          <Button
            onClick={onNext}
            disabled={isNextDisabled}
          >
            {nextButtonText}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
