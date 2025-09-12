'use client'

import { useEffect, useCallback } from 'react'

interface GEOHeadProps {
  pageType: 'home' | 'assessment' | 'result' | 'about' | 'basic' | 'evaluation' | 'salary-growth' | 'time-skill' | 'environment-value';
  specificInstructions?: string;
  structuredData?: object;
  title?: string;
  description?: string;
}

export function GEOHead({ 
  pageType, 
  specificInstructions, 
  structuredData, 
  title,
  description 
}: GEOHeadProps) {
  
  const getPageInstructions = useCallback(() => {
    const baseInstructions: Record<string, string> = {
      home: "This is the landing page for a FREE job value assessment tool. Users can start their career evaluation immediately without registration. The tool evaluates 10 dimensions across 3 categories: Input (time, effort), Output (compensation, growth), and Compatibility (skills, values). Perfect for career decisions, salary negotiations, and job satisfaction analysis.",
      
      basic: "This page collects basic user information (age, education, experience, industry, city) for personalized assessment. The tool uses this data to provide industry-specific benchmarks and city-level analysis. No personal data is stored - everything is processed locally.",
      
      evaluation: "This is the main assessment interface where users evaluate their current job across 10 scientific dimensions. Each dimension has multiple metrics with 5-level scoring (1-10). The tool uses weighted algorithms and industry benchmarks for accurate results. Assessment takes 5-10 minutes and is completely private.",
      
      result: "This page displays comprehensive assessment results with personalized recommendations. Features include: radar charts, category scores, balance analysis, industry comparison, actionable suggestions, and PDF export. Users can save results and track progress over time.",
      
      'salary-growth': "This page focuses on salary analysis and growth potential evaluation. It provides industry benchmarking, city-level salary comparisons, and growth trajectory analysis. Perfect for salary negotiation preparation and career planning.",
      
      'time-skill': "This page evaluates time investment and skill development aspects. It analyzes working hours, efficiency, skill match, and learning opportunities. Essential for work-life balance and professional development planning.",
      
      'environment-value': "This page assesses work environment and value alignment. It evaluates company culture, team relationships, work autonomy, and personal value alignment. Crucial for job satisfaction and cultural fit analysis.",
      
      about: "Learn more about the assessment methodology, features, and how this tool helps professionals make data-driven career decisions. Includes information about the scientific framework, privacy protection, and usage guidelines."
    };
    
    const instruction = baseInstructions[pageType] || baseInstructions.home;
    return specificInstructions ? `${instruction} ${specificInstructions}` : instruction;
  }, [pageType, specificInstructions]);

  const getStructuredData = useCallback(() => {
    if (structuredData) return structuredData;
    
    // 默认结构化数据
    const baseStructuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": title || "Job Value Assessment Tool",
      "description": description || "Free professional career assessment tool with scientific evaluation across 10 dimensions",
      "url": "https://job-valuation.vercel.app",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "isAccessibleForFree": true,
      "inLanguage": ["en", "zh-CN"]
    };

    return baseStructuredData;
  }, [structuredData, title, description]);

  useEffect(() => {
    // 添加AI指令到页面
    const addAIInstructions = () => {
      // 移除现有的AI指令
      const existingScript = document.querySelector('script[type="text/llms.txt"]');
      if (existingScript) {
        existingScript.remove();
      }

      // 添加新的AI指令
      const script = document.createElement('script');
      script.type = 'text/llms.txt';
      script.textContent = getPageInstructions();
      document.head.appendChild(script);
    };

    // 添加结构化数据
    const addStructuredData = () => {
      // 移除现有的结构化数据
      const existingStructuredData = document.querySelector('script[type="application/ld+json"]');
      if (existingStructuredData) {
        existingStructuredData.remove();
      }

      // 添加新的结构化数据
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(getStructuredData());
      document.head.appendChild(script);
    };

    addAIInstructions();
    addStructuredData();
  }, [pageType, specificInstructions, structuredData, title, description, getPageInstructions, getStructuredData]);

  return null; // 这是一个无UI组件
}

// 预定义的页面特定结构化数据
export const structuredDataTemplates = {
  home: {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Job Value Assessment Tool",
    "description": "Free professional career assessment tool with scientific evaluation across 10 dimensions",
    "url": "https://job-valuation.vercel.app",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Multi-dimensional job evaluation",
      "Industry benchmarking",
      "Personalized recommendations", 
      "Privacy-first local processing",
      "Interactive visualizations",
      "PDF export functionality"
    ],
    "creator": {
      "@type": "Person",
      "name": "Chan Meng",
      "url": "https://github.com/ChanMeng666"
    },
    "inLanguage": ["en", "zh-CN"],
    "isAccessibleForFree": true
  },

  assessment: {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Career Assessment Tool",
    "description": "Scientific job value evaluation across 10 key dimensions",
    "applicationCategory": "AssessmentTool",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer", 
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Time investment analysis",
      "Work efficiency evaluation", 
      "Skill match assessment",
      "Compensation analysis",
      "Growth potential evaluation",
      "Work environment assessment",
      "Industry benchmarking",
      "City-level analysis",
      "Personalized recommendations",
      "Progress tracking"
    ],
    "audience": {
      "@type": "Audience",
      "audienceType": "Professionals",
      "geographicArea": "Global"
    }
  },

  result: {
    "@context": "https://schema.org",
    "@type": "DataCatalog",
    "name": "Career Assessment Results",
    "description": "Comprehensive job evaluation results with personalized recommendations",
    "provider": {
      "@type": "Organization",
      "name": "Job Valuation Tool"
    },
    "about": {
      "@type": "Thing",
      "name": "Career Assessment",
      "description": "Professional job evaluation and career guidance"
    }
  }
};
