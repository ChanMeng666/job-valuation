import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { DIMENSIONS, calculateScore } from '@/types/assessment';
import { useAssessmentStore } from '@/store/assessment';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

export function AssessmentResult() {
  const { scores } = useAssessmentStore();
  const result = calculateScore(scores, basicInfo);

  const radarData = Object.entries(result.dimensionScores).map(
    ([key, value]) => ({
      dimension: DIMENSIONS.find(d => d.id === key)?.title || key,
      value
    })
  );

  const categoryData = Object.entries(result.categoryScores).map(
    ([key, value]) => ({
      category: key,
      value: parseFloat(value.toFixed(1))
    })
  );

  const getScoreLevel = (score: number) => {
    if (score >= 90) return { 
      title: '极优质工作', 
      color: 'text-green-600',
      description: '当前工作非常适合你，建议继续保持'
    };
    if (score >= 80) return { 
      title: '优质工作', 
      color: 'text-blue-600',
      description: '工作质量良好，仍有提升空间'
    };
    if (score >= 70) return { 
      title: '良好工作', 
      color: 'text-yellow-600',
      description: '工作基本满意，需要关注改进空间'
    };
    if (score >= 60) return { 
      title: '一般工作', 
      color: 'text-orange-600',
      description: '建议积极寻找改进机会'
    };
    return { 
      title: '不太适合', 
      color: 'text-red-600',
      description: '建议慎重考虑是否需要调整工作'
    };
  };

  const overallScore = (result.balanceScore + result.matchScore) / 2;
  const { title: levelText, color: levelColor, description: levelDescription } = 
    getScoreLevel(overallScore);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">综合得分</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-center">
              {overallScore.toFixed(1)}
            </div>
            <div className={`text-center font-medium ${levelColor}`}>
              {levelText}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">付出与回报平衡度</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-center">
              {result.balanceScore.toFixed(1)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">岗位匹配度</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-center">
              {result.matchScore.toFixed(1)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Alert>
        <AlertTitle>评估结论</AlertTitle>
        <AlertDescription>{levelDescription}</AlertDescription>
      </Alert>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>维度分析</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis 
                  dataKey="dimension"
                  tick={{ fill: '#888', fontSize: 12 }}
                />
                <PolarRadiusAxis angle={30} domain={[0, 10]} />
                <Radar
                  name="得分"
                  dataKey="value"
                  stroke="#2563eb"
                  fill="#2563eb"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>类别分析</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="category"
                  tick={{ fill: '#888', fontSize: 12 }}
                />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Bar 
                  dataKey="value" 
                  fill="#2563eb"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>改进建议</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {result.suggestions.map((suggestion, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-medium">{suggestion.dimension}</h4>
                  <p className="text-sm text-muted-foreground">
                    {suggestion.suggestion}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}