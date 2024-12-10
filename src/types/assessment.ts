// export interface Question {
//   id: string;
//   text: string;
// }

// export interface Dimension {
//   id: string;
//   title: string;
//   weight: number;
//   questions: Question[];
// }

// export interface Score {
//   dimensionId: string;
//   score: number;
// }

// export const DIMENSIONS: Dimension[] = [
//   {
//     id: 'time',
//     title: '时间投入',
//     weight: 1.2,
//     questions: [
//       { id: 'time_1', text: '工作时长是否合理？' },
//       { id: 'time_2', text: '加班频率如何？' },
//       { id: 'time_3', text: '通勤时间是否可接受？' },
//       { id: 'time_4', text: '工作时间是否灵活？' },
//       { id: 'time_5', text: '是否影响个人生活？' },
//     ]
//   },
//   {
//     id: 'ability',
//     title: '能力匹配',
//     weight: 1.0,
//     questions: [
//       { id: 'ability_1', text: '岗位要求与个人能力是否匹配？' },
//       { id: 'ability_2', text: '现有技能是否得到充分运用？' },
//       { id: 'ability_3', text: '学习曲线是否合适？' },
//       { id: 'ability_4', text: '技能提升空间如何？' },
//       { id: 'ability_5', text: '是否有能力发挥的平台？' },
//     ]
//   },
//   // ... 其他8个维度类似定义
// ];

// export const calculateScore = (scores: Score[]): number => {
//   const totalWeight = DIMENSIONS.reduce((sum, dim) => sum + dim.weight, 0);
//   const weightedSum = scores.reduce((sum, score) => {
//     const dimension = DIMENSIONS.find(d => d.id === score.dimensionId);
//     return sum + (score.score * (dimension?.weight || 1));
//   }, 0);
  
//   return (weightedSum / totalWeight) * 10;
// };





// 基本信息相关类型
export interface PersonalInfo {
  ageGroup: string;
  education: string;
  experience: string;
  cityTier: string;
}

export interface JobInfo {
  industry: string;
  jobCategory: string;
  jobLevel: string;
  jobType: string;
}

export interface BasicInfo extends PersonalInfo, JobInfo {}

// 选项常量
export const AGE_GROUPS = [
  '25岁以下',
  '25-30岁',
  '31-35岁',
  '36-40岁',
  '41-45岁',
  '45岁以上'
] as const;

export const EDUCATION_LEVELS = [
  '高中/中专',
  '大专',
  '本科',
  '硕士',
  '博士',
  '其他'
] as const;

export const EXPERIENCE_LEVELS = [
  '1年以下',
  '1-3年',
  '3-5年',
  '5-10年',
  '10年以上'
] as const;

export const CITY_TIERS = [
  '一线城市',
  '新一线城市',
  '二线城市',
  '三线城市',
  '其他'
] as const;

export const INDUSTRIES = [
  '互联网/IT',
  '金融/银行/保险',
  '教育培训',
  '医疗健康',
  '房地产/建筑',
  '制造业',
  '文化传媒',
  '商业服务',
  '消费零售',
  '其他'
] as const;

export const JOB_CATEGORIES = [
  '技术/研发',
  '产品',
  '设计',
  '运营',
  '市场/营销',
  '销售',
  '人力资源',
  '财务',
  '行政',
  '其他'
] as const;

export const JOB_LEVELS = [
  '初级/助理',
  '中级',
  '高级',
  '专家/资深',
  '经理/主管',
  '总监',
  'C级/VP'
] as const;

export const JOB_TYPES = [
  '全职',
  '兼职',
  '实习',
  '自由职业',
  '其他'
] as const;

export interface Level {
  score: number;
  description: string;
}

export interface Metric {
  id: string;
  title: string;
  description: string;
  levels: Level[];
}

export interface Dimension {
  id: string;
  title: string;
  weight: number;
  category: "付出" | "回报" | "匹配度";
  description: string;
  metrics: Metric[];
}

export interface CategoryScore {
  category: string;
  score: number;
  dimensions: {
    id: string;
    score: number;
  }[];
}

export interface AssessmentResult {
  id?: string;
  date?: string;
  basicInfo: BasicInfo;
  dimensionScores: Record<string, number>;
  categoryScores: Record<string, number>;
  balanceScore: number;
  matchScore: number;
  suggestions: Array<{
    dimension: string;
    score: number;
    suggestion: string;
  }>;
  timestamp: number;
}

export interface HistoricalAssessment {
  id: string;
  result: AssessmentResult;
  date: string;
  jobInfo: {
    title: string;
    company: string;
    industry: string;
  };
}

export const DIMENSIONS: Dimension[] = [
  {
    id: "time_investment",
    title: "时间投入",
    weight: 1.2,
    category: "付出",
    description: "评估工作时间投入的合理性与对个人生活的影响",
    metrics: [
      {
        id: "working_hours",
        title: "工作时长",
        description: "日常工作时间是否合理",
        levels: [
          { score: 2, description: "经常超过12小时" },
          { score: 4, description: "经常10-12小时" },
          { score: 6, description: "通常8-10小时" },
          { score: 8, description: "标准8小时" },
          { score: 10, description: "弹性工作制，时间自由" }
        ]
      },
      {
        id: "overtime_frequency",
        title: "加班频率",
        description: "额外工作时间的要求",
        levels: [
          { score: 2, description: "每周加班3次以上" },
          { score: 4, description: "每周加班1-2次" },
          { score: 6, description: "每月加班3-4次" },
          { score: 8, description: "偶尔加班" },
          { score: 10, description: "几乎不加班" }
        ]
      },
      {
        id: "commute_time",
        title: "通勤时间",
        description: "往返工作地点所需时间",
        levels: [
          { score: 2, description: "单程超过2小时" },
          { score: 4, description: "单程1-2小时" },
          { score: 6, description: "单程45分钟-1小时" },
          { score: 8, description: "单程30-45分钟" },
          { score: 10, description: "在家办公或通勤很短" }
        ]
      }
    ]
  },
  {
    id: "work_efficiency",
    title: "工作效率",
    weight: 1.3,
    category: "付出",
    description: "评估工作效率与资源利用情况",
    metrics: [
      {
        id: "task_completion",
        title: "任务完成效率",
        description: "完成工作任务的速度和质量",
        levels: [
          { score: 2, description: "经常延期，质量不佳" },
          { score: 4, description: "偶尔延期，质量一般" },
          { score: 6, description: "按时完成，质量尚可" },
          { score: 8, description: "提前完成，质量良好" },
          { score: 10, description: "高效优质地完成任务" }
        ]
      },
      {
        id: "resource_utilization",
        title: "资源利用",
        description: "工作资源的使用效率",
        levels: [
          { score: 2, description: "资源浪费严重" },
          { score: 4, description: "资源利用率不高" },
          { score: 6, description: "资源利用基本合理" },
          { score: 8, description: "较好地利用资源" },
          { score: 10, description: "资源利用非常高效" }
        ]
      }
    ]
  },
  {
    id: "skill_match",
    title: "技能匹配",
    weight: 1.1,
    category: "匹配度",
    description: "评估个人技能与岗位要求的匹配程度",
    metrics: [
      {
        id: "skill_requirement",
        title: "技能要求",
        description: "岗位所需技能与个人技能的匹配度",
        levels: [
          { score: 2, description: "严重不符合要求" },
          { score: 4, description: "部分符合要求" },
          { score: 6, description: "基本符合要求" },
          { score: 8, description: "较好地符合要求" },
          { score: 10, description: "完全符合要求" }
        ]
      },
      {
        id: "skill_growth",
        title: "技能成长",
        description: "工作中的技能提升机会",
        levels: [
          { score: 2, description: "几乎没有提升机会" },
          { score: 4, description: "提升机会较少" },
          { score: 6, description: "有一定提升机会" },
          { score: 8, description: "提升机会较多" },
          { score: 10, description: "提升机会非常多" }
        ]
      }
    ]
  },
  {
    id: "compensation",
    title: "薪资回报",
    weight: 1.5,
    category: "回报",
    description: "评估薪资待遇与付出的匹配度",
    metrics: [
      {
        id: "salary_level",
        title: "薪资水平",
        description: "与行业平均水平比较",
        levels: [
          { score: 2, description: "远低于行业水平" },
          { score: 4, description: "略低于行业水平" },
          { score: 6, description: "与行业持平" },
          { score: 8, description: "略高于行业水平" },
          { score: 10, description: "远高于行业水平" }
        ]
      },
      {
        id: "benefit_package",
        title: "福利待遇",
        description: "综合福利packages评估",
        levels: [
          { score: 2, description: "基础福利都很少" },
          { score: 4, description: "仅有基础福利" },
          { score: 6, description: "福利尚可" },
          { score: 8, description: "福利较为丰富" },
          { score: 10, description: "福利非常优厚" }
        ]
      },
      {
        id: "salary_growth",
        title: "薪资增长",
        description: "薪资提升的空间与速度",
        levels: [
          { score: 2, description: "几乎没有增长" },
          { score: 4, description: "增长缓慢" },
          { score: 6, description: "正常增长" },
          { score: 8, description: "增长较快" },
          { score: 10, description: "增长非常快" }
        ]
      }
    ]
  }
  // ... 其他维度定义
];

export function calculateScore(results: Record<string, number>): AssessmentResult {
  // 计算各维度得分
  const dimensionScores: Record<string, number> = {};
  DIMENSIONS.forEach(dimension => {
    const dimensionMetrics = dimension.metrics.map(m => results[m.id] || 0);
    const average = dimensionMetrics.reduce((a, b) => a + b, 0) / dimensionMetrics.length;
    dimensionScores[dimension.id] = average;
  });

  // 计算分类得分
  const categoryScores: Record<string, number> = {};
  const categories = ["付出", "回报", "匹配度"];
  categories.forEach(category => {
    const categoryDimensions = DIMENSIONS.filter(d => d.category === category);
    const weightedSum = categoryDimensions.reduce((sum, dimension) => {
      return sum + (dimensionScores[dimension.id] || 0) * dimension.weight;
    }, 0);
    const totalWeight = categoryDimensions.reduce((sum, d) => sum + d.weight, 0);
    categoryScores[category] = weightedSum / totalWeight;
  });

  // 计算平衡度
  const balanceScore = 10 - Math.abs(categoryScores["付出"] - categoryScores["回报"]);

  // 计算匹配度
  const matchScore = categoryScores["匹配度"];

  // 生成建议
  const suggestions = Object.entries(dimensionScores)
    .filter(([_, score]) => score < 6)
    .map(([dimensionId, score]) => {
      const dimension = DIMENSIONS.find(d => d.id === dimensionId);
      return {
        dimension: dimension?.title || dimensionId,
        score,
        suggestion: generateSuggestion(dimensionId, score)
      };
    });

  return {
    dimensionScores,
    categoryScores,
    balanceScore,
    matchScore,
    suggestions,
    timestamp: Date.now()
  };
}

function generateSuggestion(dimensionId: string): string {
  // 根据维度和得分生成具体建议
  const suggestions: Record<string, string> = {
    time_investment: "建议与管理层沟通工作时间安排，寻求更好的工作生活平衡",
    work_efficiency: "考虑采用更高效的工作方法，合理规划任务时间",
    skill_match: "建议制定个人技能提升计划，持续学习相关技能",
    compensation: "建议在年度绩效考核时与主管讨论薪资调整空间"
  };
  
  return suggestions[dimensionId] || "建议进行深入分析并制定改进计划";
}