import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAssessmentStore } from '@/store/assessment';
import { DIMENSIONS } from '@/types/assessment';

export function AssessmentForm() {
  const { scores, setScore } = useAssessmentStore();

  return (
    <div className="space-y-8">
      {DIMENSIONS.map((dimension) => (
        <Card key={dimension.id}>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                {dimension.title} (权重: {dimension.weight})
              </h3>
              {dimension.metrics.map((metric) => (
                <div key={metric.id} className="space-y-2">
                  <Label>{metric.title}</Label>
                  <RadioGroup
                    onValueChange={(value) => setScore(metric.id, parseInt(value))}
                    value={scores[metric.id]?.toString()}
                    className="flex space-x-4"
                  >
                    {[0,1,2,3,4,5,6,7,8,9,10].map((value) => (
                      <div key={value} className="flex items-center space-x-2">
                        <RadioGroupItem value={value.toString()} id={`${metric.id}-${value}`} />
                        <Label htmlFor={`${metric.id}-${value}`}>{value}</Label>
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