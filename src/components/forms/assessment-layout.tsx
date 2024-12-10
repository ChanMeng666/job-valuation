import { Button } from '@/components/ui/button'
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from '@/components/ui/card'

interface AssessmentLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onPrevious?: () => void;
  onNext?: () => void;
  isPreviousDisabled?: boolean;
  isNextDisabled?: boolean;
  nextButtonText?: string;
}

export function AssessmentLayout({
  title,
  subtitle,
  children,
  onPrevious,
  onNext,
  isPreviousDisabled = false,
  isNextDisabled = false,
  nextButtonText = '下一步'
}: AssessmentLayoutProps) {
  return (
    <div className="container max-w-3xl mx-auto py-8 px-4">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">{title}</CardTitle>
          {subtitle && (
            <CardDescription>{subtitle}</CardDescription>
          )}
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