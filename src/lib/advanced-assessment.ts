import { BasicInfo, DIMENSIONS, AssessmentResult } from '@/types/assessment';

// 行业基准数据类型
export interface IndustryBenchmark {
  salary: { min: number; max: number; average: number };
  workIntensity: number;
  growthPotential: number;
  jobSecurity: number;
  commonSkills: string[];
  careerRisk: number;
}

// 行业基准数据
export const INDUSTRY_BENCHMARKS: Record<string, IndustryBenchmark> = {
  '互联网/IT': {
    salary: { min: 8000, max: 50000, average: 18000 },
    workIntensity: 7.5,
    growthPotential: 8.2,
    jobSecurity: 6.8,
    commonSkills: ['编程', '产品思维', '项目管理'],
    careerRisk: 0.3
  },
  '金融/银行/保险': {
    salary: { min: 6000, max: 40000, average: 15000 },
    workIntensity: 8.0,
    growthPotential: 7.5,
    jobSecurity: 8.5,
    commonSkills: ['金融分析', '风险管理', '客户服务'],
    careerRisk: 0.2
  },
  '教育培训': {
    salary: { min: 4000, max: 20000, average: 8000 },
    workIntensity: 6.5,
    growthPotential: 6.0,
    jobSecurity: 8.0,
    commonSkills: ['教学能力', '沟通技巧', '专业知识'],
    careerRisk: 0.1
  },
  '医疗健康': {
    salary: { min: 6000, max: 35000, average: 12000 },
    workIntensity: 8.5,
    growthPotential: 7.0,
    jobSecurity: 9.0,
    commonSkills: ['医疗知识', '责任心', '沟通能力'],
    careerRisk: 0.1
  },
  '制造业': {
    salary: { min: 5000, max: 25000, average: 10000 },
    workIntensity: 7.0,
    growthPotential: 6.5,
    jobSecurity: 7.5,
    commonSkills: ['技术技能', '质量控制', '流程管理'],
    careerRisk: 0.4
  },
  '其他': {
    salary: { min: 4000, max: 30000, average: 12000 },
    workIntensity: 7.0,
    growthPotential: 7.0,
    jobSecurity: 7.0,
    commonSkills: ['通用技能', '适应能力', '学习能力'],
    careerRisk: 0.3
  }
};

// 城市等级系数类型
interface CityCoefficient {
  salaryMultiplier: number;
  livingCost: number;
  opportunityIndex: number;
}

// 城市等级系数
export const CITY_COEFFICIENTS: Record<string, CityCoefficient> = {
  '一线城市': { salaryMultiplier: 1.5, livingCost: 1.8, opportunityIndex: 1.4 },
  '新一线城市': { salaryMultiplier: 1.2, livingCost: 1.4, opportunityIndex: 1.2 },
  '二线城市': { salaryMultiplier: 1.0, livingCost: 1.0, opportunityIndex: 1.0 },
  '三线城市': { salaryMultiplier: 0.8, livingCost: 0.7, opportunityIndex: 0.8 },
  '其他': { salaryMultiplier: 0.6, livingCost: 0.5, opportunityIndex: 0.6 }
};

// 经验等级系数类型
interface ExperienceCoefficient {
  salaryExpectation: number;
  careerStability: number;
  growthPotential: number;
}

// 经验等级系数
export const EXPERIENCE_COEFFICIENTS: Record<string, ExperienceCoefficient> = {
  '1年以下': { salaryExpectation: 0.6, careerStability: 0.4, growthPotential: 1.2 },
  '1-3年': { salaryExpectation: 0.8, careerStability: 0.6, growthPotential: 1.1 },
  '3-5年': { salaryExpectation: 1.0, careerStability: 0.8, growthPotential: 1.0 },
  '5-10年': { salaryExpectation: 1.3, careerStability: 1.0, growthPotential: 0.9 },
  '10年以上': { salaryExpectation: 1.5, careerStability: 1.2, growthPotential: 0.7 }
};

// 智能权重调整算法
export function calculateDynamicWeights(basicInfo: BasicInfo): Record<string, number> {
  const baseWeights = DIMENSIONS.reduce((weights, dimension) => {
    weights[dimension.id] = dimension.weight;
    return weights;
  }, {} as Record<string, number>);

  // 根据年龄段调整权重
  const ageAdjustments = getAgeBasedAdjustments(basicInfo.ageGroup);
  
  // 根据经验调整权重
  const experienceAdjustments = getExperienceBasedAdjustments(basicInfo.experience);
  
  // 根据行业调整权重
  const industryAdjustments = getIndustryBasedAdjustments(basicInfo.industry);
  
  // 根据城市等级调整权重
  const cityAdjustments = getCityBasedAdjustments(basicInfo.cityTier);

  // 应用所有调整
  const adjustedWeights = { ...baseWeights };
  Object.keys(adjustedWeights).forEach(dimensionId => {
    adjustedWeights[dimensionId] *= 
      (ageAdjustments[dimensionId] || 1) *
      (experienceAdjustments[dimensionId] || 1) *
      (industryAdjustments[dimensionId] || 1) *
      (cityAdjustments[dimensionId] || 1);
  });

  return adjustedWeights;
}

function getAgeBasedAdjustments(ageGroup: string): Record<string, number> {
  const adjustments: Record<string, Record<string, number>> = {
    '25岁以下': { 
      'compensation': 0.8,  // 年轻人更注重成长
      'skill_match': 1.2,
      'growth_potential': 1.3
    },
    '25-30岁': { 
      'compensation': 1.0,
      'skill_match': 1.1,
      'growth_potential': 1.2
    },
    '31-35岁': { 
      'compensation': 1.2,  // 职业发展期更注重薪资
      'work_environment': 1.1,
      'career_development': 1.1
    },
    '36-40岁': { 
      'compensation': 1.3,
      'work_environment': 1.2,
      'job_security': 1.2
    },
    '41-45岁': { 
      'compensation': 1.2,
      'job_security': 1.3,
      'work_environment': 1.3
    },
    '45岁以上': { 
      'job_security': 1.4,
      'work_environment': 1.3,
      'compensation': 1.1
    }
  };

  return adjustments[ageGroup] || {};
}

function getExperienceBasedAdjustments(experience: string): Record<string, number> {
  const adjustments: Record<string, Record<string, number>> = {
    '1年以下': { 
      'skill_match': 1.3,
      'growth_potential': 1.4,
      'compensation': 0.7
    },
    '1-3年': { 
      'skill_match': 1.2,
      'growth_potential': 1.3,
      'compensation': 0.9
    },
    '3-5年': { 
      'compensation': 1.1,
      'career_development': 1.2
    },
    '5-10年': { 
      'compensation': 1.2,
      'work_autonomy': 1.2,
      'team_relationship': 1.1
    },
    '10年以上': { 
      'compensation': 1.3,
      'work_autonomy': 1.3,
      'job_security': 1.2
    }
  };

  return adjustments[experience] || {};
}

function getIndustryBasedAdjustments(industry: string): Record<string, number> {
  const adjustments: Record<string, Record<string, number>> = {
    '互联网/IT': { 
      'growth_potential': 1.2,
      'skill_match': 1.1,
      'work_intensity': 1.2
    },
    '金融/银行/保险': { 
      'compensation': 1.2,
      'job_security': 1.1,
      'work_environment': 1.1
    },
    '教育培训': { 
      'value_alignment': 1.3,
      'work_environment': 1.2,
      'compensation': 0.9
    },
    '医疗健康': { 
      'value_alignment': 1.2,
      'job_security': 1.2,
      'work_intensity': 1.1
    }
  };

  return adjustments[industry] || {};
}

function getCityBasedAdjustments(cityTier: string): Record<string, number> {
  const adjustments: Record<string, Record<string, number>> = {
    '一线城市': { 
      'compensation': 1.3,
      'growth_potential': 1.2,
      'time_investment': 1.2
    },
    '新一线城市': { 
      'compensation': 1.1,
      'growth_potential': 1.1
    },
    '三线城市': { 
      'work_environment': 1.2,
      'time_investment': 0.9
    },
    '其他': { 
      'work_environment': 1.3,
      'time_investment': 0.8
    }
  };

  return adjustments[cityTier] || {};
}

// 交叉分析算法
export function performCrossAnalysis(
  scores: Record<string, number>, 
  _basicInfo: BasicInfo
): {
  correlationMatrix: Record<string, Record<string, number>>;
  insights: string[];
  riskFactors: string[];
} {
  const insights: string[] = [];
  const riskFactors: string[] = [];
  
  // 分析工作强度与薪资的匹配度
  const workIntensityAvg = (scores['working_hours'] + scores['overtime_frequency']) / 2;
  const compensationAvg = (scores['salary_level'] + scores['benefit_package']) / 2;
  
  if (workIntensityAvg > 8 && compensationAvg < 6) {
    riskFactors.push('工作强度与薪资回报不匹配，可能导致职业倦怠');
  }
  
  // 分析技能匹配与成长潜力
  const skillMatchAvg = (scores['skill_requirement'] + scores['skill_growth']) / 2;
  const growthPotentialAvg = scores['career_development'] || 0;
  
  if (skillMatchAvg > 8 && growthPotentialAvg < 6) {
    insights.push('技能匹配度高但成长空间有限，建议寻找新的挑战机会');
  }
  
  // 分析工作环境与团队关系
  const workEnvScore = scores['work_environment'] || 0;
  const teamScore = scores['team_relationship'] || 0;
  
  if (workEnvScore > 8 && teamScore > 8) {
    insights.push('工作环境和团队关系都很好，这是职业发展的重要优势');
  }
  
  // 计算相关性矩阵（简化版本）
  const correlationMatrix = calculateCorrelationMatrix(scores);
  
  return {
    correlationMatrix,
    insights,
    riskFactors
  };
}

function calculateCorrelationMatrix(scores: Record<string, number>): Record<string, Record<string, number>> {
  const matrix: Record<string, Record<string, number>> = {};
  const scoreKeys = Object.keys(scores);
  
  scoreKeys.forEach(key1 => {
    matrix[key1] = {};
    scoreKeys.forEach(key2 => {
      if (key1 === key2) {
        matrix[key1][key2] = 1;
      } else {
        // 简化的相关性计算
        const score1 = scores[key1];
        const score2 = scores[key2];
        matrix[key1][key2] = Math.abs(score1 - score2) / 10;
      }
    });
  });
  
  return matrix;
}

// 高级评估算法
export function calculateAdvancedScore(
  scores: Record<string, number>, 
  basicInfo: BasicInfo
): AssessmentResult {
  // 获取动态权重
  const dynamicWeights = calculateDynamicWeights(basicInfo);
  
  // 计算各维度得分
  const dimensionScores: Record<string, number> = {};
  DIMENSIONS.forEach(dimension => {
    const dimensionMetrics = dimension.metrics.map(m => scores[m.id] || 0);
    const average = dimensionMetrics.reduce((a, b) => a + b, 0) / dimensionMetrics.length;
    dimensionScores[dimension.id] = average;
  });
  
  // 计算加权分类得分
  const categoryScores: Record<string, number> = {};
  const categories = ["付出", "回报", "匹配度"];
  
  categories.forEach(category => {
    const categoryDimensions = DIMENSIONS.filter(d => d.category === category);
    const weightedSum = categoryDimensions.reduce((sum, dimension) => {
      const weight = dynamicWeights[dimension.id] || dimension.weight;
      return sum + (dimensionScores[dimension.id] || 0) * weight;
    }, 0);
    const totalWeight = categoryDimensions.reduce((sum, d) => {
      return sum + (dynamicWeights[d.id] || d.weight);
    }, 0);
    categoryScores[category] = weightedSum / totalWeight;
  });
  
  // 执行交叉分析
  const crossAnalysis = performCrossAnalysis(scores, basicInfo);
  
  // 计算行业基准对比
  const industryBenchmark = INDUSTRY_BENCHMARKS[basicInfo.industry] || INDUSTRY_BENCHMARKS['其他'];
  const cityCoeff = CITY_COEFFICIENTS[basicInfo.cityTier] || CITY_COEFFICIENTS['其他'];
  
  // 计算平衡度（考虑行业特点）
  const balanceScore = calculateBalanceScore(categoryScores, industryBenchmark);
  
  // 计算匹配度（考虑个人背景）
  const matchScore = calculateMatchScore(categoryScores, basicInfo, industryBenchmark);
  
  // 生成智能建议
  const suggestions = generateAdvancedSuggestions(
    dimensionScores,
    basicInfo,
    crossAnalysis,
    industryBenchmark
  );
  
  return {
    basicInfo,
    dimensionScores,
    categoryScores,
    balanceScore,
    matchScore,
    suggestions,
    timestamp: Date.now(),
    // 新增字段
    crossAnalysis,
    industryComparison: {
      benchmark: industryBenchmark,
      cityCoefficient: cityCoeff
    }
  };
}

function calculateBalanceScore(
  categoryScores: Record<string, number>,
  _industryBenchmark: IndustryBenchmark
): number {
  const inputOutput = Math.abs(categoryScores["付出"] - categoryScores["回报"]);
  const baseBalance = 10 - inputOutput;
  
  // 根据行业特点调整平衡度
  const industryAdjustment = _industryBenchmark.workIntensity > 8 ? 0.8 : 1.0;
  
  return Math.max(0, baseBalance * industryAdjustment);
}

function calculateMatchScore(
  categoryScores: Record<string, number>,
  basicInfo: BasicInfo,
  _industryBenchmark: IndustryBenchmark
): number {
  const baseMatchScore = categoryScores["匹配度"];
  
  // 根据经验等级调整
  const expCoeff = EXPERIENCE_COEFFICIENTS[basicInfo.experience] || 
                   EXPERIENCE_COEFFICIENTS['3-5年'];
  
  const adjustedScore = baseMatchScore * expCoeff.careerStability;
  
  return Math.min(10, adjustedScore);
}

interface CrossAnalysis {
  correlationMatrix: Record<string, Record<string, number>>;
  insights: string[];
  riskFactors: string[];
}

function generateAdvancedSuggestions(
  dimensionScores: Record<string, number>,
  basicInfo: BasicInfo,
  crossAnalysis: CrossAnalysis,
  _industryBenchmark: IndustryBenchmark
): Array<{ dimension: string; score: number; suggestion: string; priority: 'high' | 'medium' | 'low' }> {
  const suggestions: Array<{ dimension: string; score: number; suggestion: string; priority: 'high' | 'medium' | 'low' }> = [];
  
  // 确保参数被使用
  if (!_industryBenchmark) {
    throw new Error('Industry benchmark is required');
  }
  
  // 基于维度得分的建议
  Object.entries(dimensionScores).forEach(([dimensionId, score]) => {
    if (score < 6) {
      const dimension = DIMENSIONS.find(d => d.id === dimensionId);
      const suggestion = generateContextualSuggestion(dimensionId, score, basicInfo, _industryBenchmark);
      const priority = score < 4 ? 'high' : score < 6 ? 'medium' : 'low';
      
      suggestions.push({
        dimension: dimension?.title || dimensionId,
        score,
        suggestion,
        priority
      });
    }
  });
  
  // 基于交叉分析的建议
  crossAnalysis.riskFactors.forEach((risk: string) => {
    suggestions.push({
      dimension: '综合分析',
      score: 0,
      suggestion: risk,
      priority: 'high'
    });
  });
  
  crossAnalysis.insights.forEach((insight: string) => {
    suggestions.push({
      dimension: '发展机会',
      score: 0,
      suggestion: insight,
      priority: 'medium'
    });
  });
  
  // 按优先级排序
  return suggestions.sort((a, b) => {
    const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });
}

function generateContextualSuggestion(
  dimensionId: string,
  score: number,
  basicInfo: BasicInfo,
  _industryBenchmark: IndustryBenchmark
): string {
  const baseAdvice: Record<string, string> = {
    'time_investment': `在${basicInfo.industry}行业中，工作时间管理尤为重要。建议制定更好的时间规划，与团队讨论工作效率优化方案。`,
    'skill_match': `对于${basicInfo.jobCategory}岗位，建议重点提升${_industryBenchmark.commonSkills?.join('、')}等核心技能。`,
    'compensation': `在${basicInfo.cityTier}的${basicInfo.industry}行业，当前薪资可能低于市场平均水平。建议准备绩效数据，主动与管理层讨论薪资调整。`,
    'work_intensity': `${basicInfo.industry}行业的工作强度通常较高，建议学习压力管理技巧，寻求更好的工作生活平衡。`,
    'growth_potential': `以您${basicInfo.experience}的经验，建议积极寻找挑战性项目，加速职业发展。`
  };
  
  return baseAdvice[dimensionId] || '建议深入分析当前状况，制定针对性的改进计划。';
} 