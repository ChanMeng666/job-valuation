import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { DIMENSIONS, Score } from '@/types/assessment';

interface Props {
  onScoreChange: (scores: Score[]) => void;
}

export function AssessmentForm({ onScoreChange }: Props) {
  const [scores, setScores] = React.useState<Score[]>([]);

  const handleScoreChange = (dimensionId: string, questionId: string, value: string) => {
    const newScores = [...scores];
    const scoreIndex = newScores.findIndex(s => s.dimensionId === dimensionId);
    const score = Number(value);

    if (scoreIndex === -1) {
      newScores.push({ dimensionId, score });
    } else {
      newScores[scoreIndex].score = score;
    }

    setScores(newScores);
    onScoreChange(newScores);
  };

  return (
    <div className="space-y-8">
      {DIMENSIONS.map((dimension) => (
        <Card key={dimension.id}>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                {dimension.title} (权重: {dimension.weight})
              </h3>
              {dimension.questions.map((question) => (
                <div key={question.id} className="space-y-2">
                  <Label>{question.text}</Label>
                  <RadioGroup
                    onValueChange={(value) => handleScoreChange(dimension.id, question.id, value)}
                    className="flex space-x-4"
                  >
                    {[0,1,2,3,4,5,6,7,8,9,10].map((value) => (
                      <div key={value} className="flex items-center space-x-2">
                        <RadioGroupItem value={value.toString()} id={`${question.id}-${value}`} />
                        <Label htmlFor={`${question.id}-${value}`}>{value}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}