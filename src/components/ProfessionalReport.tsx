'use client'

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, TrendingUp, Target, Lightbulb } from 'lucide-react';
import { AssessmentResult, DIMENSIONS } from '@/types/assessment';
import { INDUSTRY_BENCHMARKS, IndustryBenchmark } from '@/lib/advanced-assessment';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
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
  Tooltip
} from 'recharts';

interface ProfessionalReportProps {
  result: AssessmentResult;
}

export function ProfessionalReport({ result }: ProfessionalReportProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const generatePDF = async () => {
    setIsGenerating(true);
    setProgress(0);

    try {
      const reportElement = document.getElementById('professional-report');
      if (!reportElement) return;

      // 更新进度
      setProgress(20);

      // 创建PDF
      const canvas = await html2canvas(reportElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      setProgress(60);

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      setProgress(90);

      // 生成文件名
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `职业评估报告_${result.basicInfo.industry}_${timestamp}.pdf`;

      pdf.save(filename);
      setProgress(100);

      setTimeout(() => {
        setIsGenerating(false);
        setProgress(0);
      }, 1000);
    } catch (error) {
      console.error('PDF生成失败:', error);
      setIsGenerating(false);
      setProgress(0);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLevel = (score: number) => {
    if (score >= 8) return '优秀';
    if (score >= 6) return '良好';
    if (score >= 4) return '一般';
    return '需改进';
  };

  const industryBenchmark = INDUSTRY_BENCHMARKS[result.basicInfo.industry] || INDUSTRY_BENCHMARKS['其他'];

  // 准备图表数据
  const radarData = Object.entries(result.dimensionScores).map(([key, value]) => ({
    dimension: DIMENSIONS.find(d => d.id === key)?.title || key,
    score: value,
    benchmark: getBenchmarkScore(key, industryBenchmark)
  }));

  const categoryData = Object.entries(result.categoryScores).map(([key, value]) => ({
    category: key,
    score: parseFloat(value.toFixed(1)),
    benchmark: getCategoryBenchmark(key, industryBenchmark)
  }));

  const swotData = generateSWOTAnalysis(result);
  const careerPath = generateCareerPath(result);

  return (
    <div className="space-y-6">
      {/* 报告生成按钮 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            专业评估报告
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                生成包含详细分析、行业对比和发展建议的专业PDF报告
              </p>
              {isGenerating && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span>生成进度: {progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )}
            </div>
            <Button 
              onClick={generatePDF}
              disabled={isGenerating}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              {isGenerating ? '生成中...' : '下载报告'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 报告预览内容 */}
      <div id="professional-report" className="space-y-8 p-8 bg-white">
        {/* 报告头部 */}
        <div className="text-center border-b pb-6">
          <h1 className="text-3xl font-bold mb-2">职业价值评估专业报告</h1>
          <p className="text-lg text-muted-foreground">
            {result.basicInfo.industry} • {result.basicInfo.jobCategory} • {result.basicInfo.jobLevel}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            生成时间: {new Date().toLocaleString('zh-CN')}
          </p>
        </div>

        {/* 执行摘要 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              执行摘要
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {((result.balanceScore + result.matchScore) / 2).toFixed(1)}
                </div>
                <div className="text-sm text-muted-foreground">综合得分</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {result.balanceScore.toFixed(1)}
                </div>
                <div className="text-sm text-muted-foreground">平衡度</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {result.matchScore.toFixed(1)}
                </div>
                <div className="text-sm text-muted-foreground">匹配度</div>
              </div>
            </div>
            <div className="prose max-w-none">
              <p>
                基于您在{result.basicInfo.industry}行业{result.basicInfo.jobCategory}岗位的评估结果，
                您的职业综合得分为{((result.balanceScore + result.matchScore) / 2).toFixed(1)}分。
                这表明您当前的工作{getOverallAssessment(result)}。
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 维度分析 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              维度分析对比
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-80">
                <h3 className="text-lg font-semibold mb-4">雷达图分析</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 10]} />
                    <Radar
                      name="您的得分"
                      dataKey="score"
                      stroke="#2563eb"
                      fill="#2563eb"
                      fillOpacity={0.6}
                    />
                    <Radar
                      name="行业基准"
                      dataKey="benchmark"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.3}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="h-80">
                <h3 className="text-lg font-semibold mb-4">类别对比</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis domain={[0, 10]} />
                    <Tooltip />
                    <Bar dataKey="score" fill="#2563eb" name="您的得分" />
                    <Bar dataKey="benchmark" fill="#10b981" name="行业基准" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SWOT分析 */}
        <Card>
          <CardHeader>
            <CardTitle>SWOT分析</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">优势 (Strengths)</h4>
                  <ul className="space-y-1 text-sm">
                    {swotData.strengths.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-600">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">机会 (Opportunities)</h4>
                  <ul className="space-y-1 text-sm">
                    {swotData.opportunities.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">劣势 (Weaknesses)</h4>
                  <ul className="space-y-1 text-sm">
                    {swotData.weaknesses.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-yellow-600">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2">威胁 (Threats)</h4>
                  <ul className="space-y-1 text-sm">
                    {swotData.threats.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-red-600">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 发展建议 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              发展建议与行动计划
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {result.suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="flex-shrink-0">
                    <Badge 
                      variant={suggestion.priority === 'high' ? 'destructive' : 
                              suggestion.priority === 'medium' ? 'default' : 'secondary'}
                    >
                      {suggestion.priority === 'high' ? '高优先级' : 
                       suggestion.priority === 'medium' ? '中优先级' : '低优先级'}
                    </Badge>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2">{suggestion.dimension}</h4>
                    <p className="text-sm text-muted-foreground">{suggestion.suggestion}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 职业发展路径 */}
        <Card>
          <CardHeader>
            <CardTitle>职业发展路径建议</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {careerPath.map((path, index) => (
                <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-blue-600">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{path.phase}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{path.timeframe}</p>
                    <p className="text-sm">{path.description}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {path.actions.map((action, actionIndex) => (
                        <Badge key={actionIndex} variant="outline" className="text-xs">
                          {action}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// 辅助函数
function getBenchmarkScore(dimensionId: string, benchmark: IndustryBenchmark): number {
  const mapping: Record<string, number> = {
    'time_investment': 10 - (benchmark.workIntensity || 7),
    'skill_match': benchmark.growthPotential || 7,
    'compensation': 7,
    'work_intensity': 10 - (benchmark.workIntensity || 7),
    'growth_potential': benchmark.growthPotential || 7,
    'job_security': benchmark.jobSecurity || 7
  };
  return mapping[dimensionId] || 7;
}

function getCategoryBenchmark(category: string, benchmark: IndustryBenchmark): number {
  const mapping: Record<string, number> = {
    '付出': 10 - (benchmark.workIntensity || 7),
    '回报': 7,
    '匹配度': benchmark.growthPotential || 7
  };
  return mapping[category] || 7;
}

function getOverallAssessment(result: AssessmentResult): string {
  const score = (result.balanceScore + result.matchScore) / 2;
  if (score >= 8) return '表现优异，建议继续保持';
  if (score >= 6) return '整体良好，有提升空间';
  if (score >= 4) return '处于平均水平，需要关注改进';
  return '存在较大改进空间，建议制定详细的提升计划';
}

function generateSWOTAnalysis(result: AssessmentResult) {
  const strengths = [];
  const weaknesses = [];
  const opportunities = [];
  const threats = [];

  // 基于维度得分分析
  Object.entries(result.dimensionScores).forEach(([dimensionId, score]) => {
    const dimension = DIMENSIONS.find(d => d.id === dimensionId);
    if (!dimension) return;

    if (score >= 8) {
      strengths.push(`${dimension.title}表现优秀`);
    } else if (score < 5) {
      weaknesses.push(`${dimension.title}需要改进`);
    }
  });

  // 基于行业和经验生成机会和威胁
  const experience = result.basicInfo.experience;

  if (result.basicInfo.industry === '互联网/IT') {
    opportunities.push('行业发展迅速，技术更新带来新机遇');
    threats.push('技术迭代快，需要持续学习');
  }

  if (experience === '1-3年') {
    opportunities.push('处于职业发展黄金期，成长空间大');
  } else if (experience === '10年以上') {
    opportunities.push('经验丰富，可考虑管理岗位发展');
    threats.push('需要关注技能更新，避免被淘汰');
  }

  return {
    strengths: strengths.length > 0 ? strengths : ['待分析'],
    weaknesses: weaknesses.length > 0 ? weaknesses : ['待分析'],
    opportunities: opportunities.length > 0 ? opportunities : ['待分析'],
    threats: threats.length > 0 ? threats : ['待分析']
  };
}

function generateCareerPath(result: AssessmentResult) {
  const experience = result.basicInfo.experience;
  
  const paths = [];
  
  if (experience === '1年以下' || experience === '1-3年') {
    paths.push({
      phase: '技能提升期',
      timeframe: '未来1-2年',
      description: '重点提升专业技能，积累项目经验',
      actions: ['参加培训', '承担挑战性项目', '寻找导师']
    });
    paths.push({
      phase: '经验积累期',
      timeframe: '2-3年后',
      description: '扩大工作范围，培养综合能力',
      actions: ['跨部门协作', '学习管理技能', '建立人脉']
    });
  } else if (experience === '3-5年') {
    paths.push({
      phase: '职业发展期',
      timeframe: '未来1-2年',
      description: '明确职业方向，争取晋升机会',
      actions: ['申请晋升', '学习领导力', '拓展视野']
    });
  }
  
  paths.push({
    phase: '长期规划',
    timeframe: '5年以上',
    description: '根据个人兴趣和市场需求，制定长期发展规划',
    actions: ['考虑转行', '创业准备', '行业专家']
  });
  
  return paths;
} 