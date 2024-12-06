'use client';

import { useState } from 'react';
import { AssessmentForm } from '@/components/AssessmentForm';
import { AssessmentResult } from '@/components/AssessmentResult';
import { Score } from '@/types/assessment';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function AssessmentPage() {
  const [scores, setScores] = useState<Score[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = () => {
    setShowResult(true);
  };

  const handleReset = () => {
    setScores([]);
    setShowResult(false);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">工作性价比评估</h1>
      
      {!showResult ? (
        <>
          <AssessmentForm onScoreChange={setScores} />
          <div className="mt-6 flex justify-end space-x-4">
            <Button variant="outline" onClick={handleReset}>重置</Button>
            <Button onClick={handleSubmit}>提交评估</Button>
          </div>
        </>
      ) : (
        <Card className="p-6">
          <AssessmentResult scores={scores} />
          <div className="mt-6 flex justify-end">
            <Button variant="outline" onClick={handleReset}>重新评估</Button>
          </div>
        </Card>
      )}
    </div>
  );
}