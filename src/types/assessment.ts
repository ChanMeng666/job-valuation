export interface Question {
  id: string;
  text: string;
}

export interface Dimension {
  id: string;
  title: string;
  weight: number;
  questions: Question[];
}

export interface Score {
  dimensionId: string;
  score: number;
}

export const DIMENSIONS: Dimension[] = [
  {
    id: 'time',
    title: '时间投入',
    weight: 1.2,
    questions: [
      { id: 'time_1', text: '工作时长是否合理？' },
      { id: 'time_2', text: '加班频率如何？' },
      { id: 'time_3', text: '通勤时间是否可接受？' },
      { id: 'time_4', text: '工作时间是否灵活？' },
      { id: 'time_5', text: '是否影响个人生活？' },
    ]
  },
  {
    id: 'ability',
    title: '能力匹配',
    weight: 1.0,
    questions: [
      { id: 'ability_1', text: '岗位要求与个人能力是否匹配？' },
      { id: 'ability_2', text: '现有技能是否得到充分运用？' },
      { id: 'ability_3', text: '学习曲线是否合适？' },
      { id: 'ability_4', text: '技能提升空间如何？' },
      { id: 'ability_5', text: '是否有能力发挥的平台？' },
    ]
  },
  // ... 其他8个维度类似定义
];

export const calculateScore = (scores: Score[]): number => {
  const totalWeight = DIMENSIONS.reduce((sum, dim) => sum + dim.weight, 0);
  const weightedSum = scores.reduce((sum, score) => {
    const dimension = DIMENSIONS.find(d => d.id === score.dimensionId);
    return sum + (score.score * (dimension?.weight || 1));
  }, 0);
  
  return (weightedSum / totalWeight) * 10;
};