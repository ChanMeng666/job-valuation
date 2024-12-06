import { create } from 'zustand'

export interface AssessmentState {
  // 基本信息
  jobType: string
  industry: string
  yearsOfExperience: string
  currentPosition: string

  // 时间与能力评估
  timeInvestment: number
  skillMatch: number
  workIntensity: number

  // 薪资与发展评估
  salarySatisfaction: number
  growthPotential: number
  careerDevelopment: number

  // 环境与价值评估
  workEnvironment: number
  teamRelationship: number
  workAutonomy: number
  valueAlignment: number

  // 当前步骤
  currentStep: number

  // Actions
  setBasicInfo: (info: {
    jobType: string
    industry: string
    yearsOfExperience: string
    currentPosition: string
  }) => void
  setTimeAndSkill: (info: {
    timeInvestment: number
    skillMatch: number
    workIntensity: number
  }) => void
  setSalaryAndGrowth: (info: {
    salarySatisfaction: number
    growthPotential: number
    careerDevelopment: number
  }) => void
  setEnvironmentAndValue: (info: {
    workEnvironment: number
    teamRelationship: number
    workAutonomy: number
    valueAlignment: number
  }) => void
  nextStep: () => void
  previousStep: () => void
  resetAssessment: () => void
}

export const useAssessmentStore = create<AssessmentState>((set) => ({
  // 初始状态
  jobType: '',
  industry: '',
  yearsOfExperience: '',
  currentPosition: '',
  timeInvestment: 0,
  skillMatch: 0,
  workIntensity: 0,
  salarySatisfaction: 0,
  growthPotential: 0,
  careerDevelopment: 0,
  workEnvironment: 0,
  teamRelationship: 0,
  workAutonomy: 0,
  valueAlignment: 0,
  currentStep: 0,

  // Actions
  setBasicInfo: (info) => set(info),
  
  setTimeAndSkill: (info) => set(info),
  
  setSalaryAndGrowth: (info) => set(info),
  
  setEnvironmentAndValue: (info) => set(info),
  
  nextStep: () => set((state) => ({ 
    currentStep: Math.min(state.currentStep + 1, 4)
  })),
  
  previousStep: () => set((state) => ({ 
    currentStep: Math.max(state.currentStep - 1, 0)
  })),
  
  resetAssessment: () => set({
    jobType: '',
    industry: '',
    yearsOfExperience: '',
    currentPosition: '',
    timeInvestment: 0,
    skillMatch: 0,
    workIntensity: 0,
    salarySatisfaction: 0,
    growthPotential: 0,
    careerDevelopment: 0,
    workEnvironment: 0,
    teamRelationship: 0,
    workAutonomy: 0,
    valueAlignment: 0,
    currentStep: 0,
  }),
}))
