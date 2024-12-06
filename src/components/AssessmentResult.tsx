import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { DIMENSIONS, Score, calculateScore } from '@/types/assessment';

interface Props {
  scores: Score[];
}

export function AssessmentResult({ scores }: Props) {
  const finalScore = calculateScore(scores);
  
  const getScoreLevel = (score: number) => {
    if (score >= 90) return { title: '极优质工作', description: '继续保持，这份工作非常适合你' };
    if (score >= 80) return { title: '优质工作', description: '工作质量良好，仍有提升空间' };
    if (score >= 70) return { title: '良好工作', description: '工作基本令人满意，建议关注改进点' };
    if (score >= 60) return { title: '一般工作', description: '工作尚可接受，需要积极改善' };
    return { title: '建议考虑换工作', description: '当前工作可能不太适合你，建议寻找新的机会' };
  };

  const level = getScoreLevel(finalScore);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">总体评分</h3>
        <Progress value={finalScore} className="h-4" />
        <p className="text-right">{Math.round(finalScore)} / 100</p>
      </div>

      <Alert>
        <AlertTitle>{level.title}</AlertTitle>
        <AlertDescription>{level.description}</AlertDescription>
      </Alert>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">各维度得分</h3>
        {DIMENSIONS.map((dimension) => {
          const score = scores.find(s => s.dimensionId === dimension.id)?.score || 0;
          return (
            <div key={dimension.id} className="space-y-2">
              <div className="flex justify-between">
                <span>{dimension.title}</span>
                <span>{score} × {dimension.weight}</span>
              </div>
              <Progress value={score * 10} className="h-2" />
            </div>
          );
        })}
      </div>
    </div>
  );
}