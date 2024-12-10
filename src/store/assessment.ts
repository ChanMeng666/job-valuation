import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AssessmentResult, BasicInfo } from '@/types/assessment';


interface AssessmentState {
  // 基本信息
  basicInfo: BasicInfo;
  
  // 评分记录
  scores: Record<string, number>;
  
  // 当前步骤
  currentStep: number;
  
  // 评估结果
  currentResult: AssessmentResult | null;
  
  // 历史记录
  history: Array<AssessmentResult>;
  
  // Actions
  setBasicInfo: (info: Partial<BasicInfo>) => void;
  setScore: (metricId: string, score: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  setResult: (result: AssessmentResult) => void;
  addToHistory: (assessment: AssessmentResult) => void;
  resetAssessment: () => void;
}

export const useAssessmentStore = create<AssessmentState>()(
  persist(
    (set) => ({
      // 初始状态
      basicInfo: {
        ageGroup: '',
        education: '',
        experience: '',
        cityTier: '',
        industry: '',
        jobCategory: '',
        jobLevel: '',
        jobType: ''
      },
      scores: {},
      currentStep: 0,
      currentResult: null,
      history: [],

      // Actions
      setBasicInfo: (info) => set((state) => ({
        basicInfo: {
          ...state.basicInfo,
          ...info
        }
      })),

      setScore: (metricId, score) => set((state) => ({
        scores: {
          ...state.scores,
          [metricId]: score
        }
      })),
      
      nextStep: () => set((state) => ({ 
        currentStep: Math.min(state.currentStep + 1, 4)
      })),
      
      previousStep: () => set((state) => ({ 
        currentStep: Math.max(state.currentStep - 1, 0)
      })),
      
      setResult: (result) => set({
        currentResult: result
      }),
      
      addToHistory: (assessment) => set((state) => ({
        history: [...state.history, assessment]
      })),
      
      resetAssessment: () => set({
        basicInfo: {
          ageGroup: '',
          education: '',
          experience: '',
          cityTier: '',
          industry: '',
          jobCategory: '',
          jobLevel: '',
          jobType: ''
        },
        scores: {},
        currentStep: 0,
        currentResult: null
      })
    }),
    {
      name: 'assessment-storage',
      partialize: (state) => ({
        history: state.history
      })
    }
  )
);