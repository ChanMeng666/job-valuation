// GEO Analytics - 追踪AI引用和转化数据

interface CitationData {
  query: string;
  source: string;
  position: number;
  timestamp: number;
  userAgent: string;
  pageUrl: string;
}

interface ConversionData {
  source: string;
  action: string;
  timestamp: number;
  sessionId: string;
  pageUrl: string;
  userId?: string;
}

interface QueryCoverageData {
  query: string;
  isCovered: boolean;
  timestamp: number;
  pageUrl: string;
  relevanceScore?: number;
}

interface GEOKPIs {
  citationSuccessRate: {
    totalAIQueries: number;
    successfulCitations: number;
    citationRate: number;
  };
  
  aiTrafficConversion: {
    aiTraffic: number;
    assessmentStarts: number;
    completionRate: number;
    conversionRate: number;
  };
  
  averageCitationPosition: {
    top3Citations: number;
    top5Citations: number;
    top10Citations: number;
    averagePosition: number;
  };
  
  linkCarryRate: {
    citationsWithLinks: number;
    totalCitations: number;
    linkCarryRate: number;
  };
  
  queryCoverage: {
    uniqueQueries: number;
    coveredQueries: number;
    coverageRate: number;
  };
  
  contentRelevanceScore: {
    averageRelevanceScore: number;
    highRelevanceQueries: number;
    lowRelevanceQueries: number;
  };
}

export class GEOAnalytics {
  private static sessionId: string = '';
  private static isInitialized = false;

  // 初始化分析系统
  static init() {
    if (this.isInitialized) return;
    
    this.sessionId = this.generateSessionId();
    this.isInitialized = true;
    
    // 监听页面可见性变化
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
          this.trackPageView();
        }
      });
    }
  }

  // 生成会话ID
  private static generateSessionId(): string {
    return `geo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // 获取会话ID
  static getSessionId(): string {
    if (!this.sessionId) {
      this.sessionId = this.generateSessionId();
    }
    return this.sessionId;
  }

  // 追踪AI引用
  static trackCitation(query: string, source: string, position: number) {
    const citationData: CitationData = {
      query,
      source,
      position,
      timestamp: Date.now(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      pageUrl: typeof window !== 'undefined' ? window.location.href : ''
    };
    
    this.sendToAnalytics('citation', citationData);
    console.log('GEO Analytics: Citation tracked', citationData);
  }

  // 追踪转化行为
  static trackConversion(source: string, action: string, userId?: string) {
    const conversionData: ConversionData = {
      source,
      action,
      timestamp: Date.now(),
      sessionId: this.getSessionId(),
      pageUrl: typeof window !== 'undefined' ? window.location.href : '',
      userId
    };
    
    this.sendToAnalytics('conversion', conversionData);
    console.log('GEO Analytics: Conversion tracked', conversionData);
  }

  // 追踪查询覆盖情况
  static trackQueryCoverage(query: string, isCovered: boolean, relevanceScore?: number) {
    const coverageData: QueryCoverageData = {
      query,
      isCovered,
      timestamp: Date.now(),
      pageUrl: typeof window !== 'undefined' ? window.location.href : '',
      relevanceScore
    };
    
    this.sendToAnalytics('query_coverage', coverageData);
    console.log('GEO Analytics: Query coverage tracked', coverageData);
  }

  // 追踪页面访问
  static trackPageView(pageName?: string) {
    const pageViewData = {
      pageName: pageName || (typeof window !== 'undefined' ? window.location.pathname : ''),
      timestamp: Date.now(),
      sessionId: this.getSessionId(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      referrer: typeof document !== 'undefined' ? document.referrer : ''
    };
    
    this.sendToAnalytics('page_view', pageViewData);
  }

  // 追踪评估开始
  static trackAssessmentStart(source: string = 'direct') {
    this.trackConversion(source, 'assessment_start');
  }

  // 追踪评估完成
  static trackAssessmentComplete(duration: number, score: number) {
    this.trackConversion('assessment', 'assessment_complete');
    this.sendToAnalytics('assessment_complete', {
      duration,
      score,
      timestamp: Date.now(),
      sessionId: this.getSessionId()
    });
  }

  // 追踪结果导出
  static trackResultExport(format: string = 'pdf') {
    this.trackConversion('result', 'export', format);
  }

  // 追踪AI指令交互
  static trackAIInteraction(interactionType: string, details?: unknown) {
    this.sendToAnalytics('ai_interaction', {
      interactionType,
      details,
      timestamp: Date.now(),
      sessionId: this.getSessionId(),
      pageUrl: typeof window !== 'undefined' ? window.location.href : ''
    });
  }

  // 发送数据到分析服务
  private static sendToAnalytics(event: string, data: unknown) {
    // 在开发环境中，数据发送到控制台
    if (process.env.NODE_ENV === 'development') {
      console.log(`GEO Analytics [${event}]:`, data);
      return;
    }

    // 在生产环境中，可以发送到实际的分析服务
    try {
      // 这里可以集成实际的分析服务，如 Google Analytics, Mixpanel 等
      if (typeof window !== 'undefined' && (window as unknown as { gtag?: (command: string, event: string, parameters: Record<string, unknown>) => void }).gtag) {
        (window as unknown as { gtag: (command: string, event: string, parameters: Record<string, unknown>) => void }).gtag('event', event, {
          custom_parameter: data
        });
      }

      // 或者发送到自定义的分析端点
      fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event,
          data,
          timestamp: Date.now()
        })
      }).catch((error: Error) => {
        console.warn('Failed to send analytics data:', error);
      });
    } catch (error) {
      console.warn('Analytics error:', error);
    }
  }

  // 获取KPI数据（模拟数据，实际应该从分析服务获取）
  static async getKPIs(): Promise<GEOKPIs> {
    // 这里应该从实际的分析服务获取数据
    // 目前返回模拟数据用于演示
    return {
      citationSuccessRate: {
        totalAIQueries: 1250,
        successfulCitations: 312,
        citationRate: 0.25
      },
      aiTrafficConversion: {
        aiTraffic: 1250,
        assessmentStarts: 312,
        completionRate: 0.78,
        conversionRate: 0.25
      },
      averageCitationPosition: {
        top3Citations: 45,
        top5Citations: 78,
        top10Citations: 156,
        averagePosition: 6.2
      },
      linkCarryRate: {
        citationsWithLinks: 234,
        totalCitations: 312,
        linkCarryRate: 0.75
      },
      queryCoverage: {
        uniqueQueries: 450,
        coveredQueries: 312,
        coverageRate: 0.69
      },
      contentRelevanceScore: {
        averageRelevanceScore: 8.2,
        highRelevanceQueries: 234,
        lowRelevanceQueries: 78
      }
    };
  }

  // 检查是否为AI流量
  static isAITraffic(): boolean {
    if (typeof navigator === 'undefined') return false;
    
    const userAgent = navigator.userAgent.toLowerCase();
    const aiBots = [
      'gptbot',
      'claude-web',
      'perplexitybot',
      'bingbot',
      'duckduckbot',
      'applebot',
      'googlebot'
    ];
    
    return aiBots.some(bot => userAgent.includes(bot));
  }

  // 检测AI查询来源
  static detectAISource(): string {
    if (typeof document === 'undefined') return 'unknown';
    
    const referrer = document.referrer.toLowerCase();
    
    if (referrer.includes('chat.openai.com')) return 'chatgpt';
    if (referrer.includes('claude.ai')) return 'claude';
    if (referrer.includes('perplexity.ai')) return 'perplexity';
    if (referrer.includes('bing.com')) return 'bing';
    if (referrer.includes('google.com')) return 'google';
    
    return 'direct';
  }
}

// 自动初始化
if (typeof window !== 'undefined') {
  GEOAnalytics.init();
}
