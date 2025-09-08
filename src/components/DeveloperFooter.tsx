'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Github, Mail, Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface DeveloperFooterProps {
  variant?: 'simple' | 'detailed'
  className?: string
}

export function DeveloperFooter({ variant = 'simple', className = '' }: DeveloperFooterProps) {
  if (variant === 'simple') {
    return (
      <footer className={`border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 ${className}`}>
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="flex items-center space-x-3">
              <Image
                src="/chan_logo.svg"
                alt="陈猛头像"
                width={32}
                height={32}
                className="opacity-80"
              />
              <div className="text-sm text-muted-foreground">
                由 <span className="font-medium text-foreground">Chan Meng</span> 开发
              </div>
            </div>
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <Link 
                href="https://github.com/ChanMeng666" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                GitHub
              </Link>
              <Link 
                href="https://github.com/ChanMeng666/job-valuation" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                源代码
              </Link>
              <Link 
                href="mailto:chanmeng.dev@gmail.com" 
                className="hover:text-foreground transition-colors"
              >
                联系我
              </Link>
            </div>
          </div>
        </div>
      </footer>
    )
  }

  // Detailed version for results page
  return (
    <div className={`border-t border-gray-200 dark:border-gray-800 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 ${className}`}>
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto glass-card">
          <CardContent className="p-6">
            <div className="text-center space-y-6">
              {/* Developer Logo & Intro */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Image
                    src="/chan_logo.svg"
                    alt="陈猛头像"
                    width={64}
                    height={64}
                    className="opacity-90"
                  />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Chan Meng
                  </h3>
                  <p className="text-sm text-muted-foreground">全栈开发者 & AI工程师</p>
                </div>
              </div>

              {/* Call to Action */}
              <div className="space-y-3">
                <p className="text-sm text-center leading-relaxed">
                  喜欢这个项目？我专注于开发现代化Web应用、AI工具和数据分析平台。<br/>
                  <span className="font-medium text-blue-600">可为您定制类似的专业级应用</span>
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    asChild
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  >
                    <Link href="mailto:chanmeng.dev@gmail.com">
                      <Mail className="w-4 h-4 mr-2" />
                      联系定制开发
                    </Link>
                  </Button>
                  
                  <Button 
                    asChild
                    variant="outline"
                    size="sm"
                    className="border-blue-200 hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-950/30"
                  >
                    <Link 
                      href="https://github.com/ChanMeng666" 
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      查看作品集
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground border-t pt-4">
                <Link 
                  href="https://github.com/ChanMeng666/job-valuation" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-foreground transition-colors"
                >
                  <Star className="w-3 h-3" />
                  项目源码
                </Link>
                <Link 
                  href="mailto:chanmeng.dev@gmail.com" 
                  className="flex items-center gap-1 hover:text-foreground transition-colors"
                >
                  <Mail className="w-3 h-3" />
                  chanmeng.dev@gmail.com
                </Link>
                <Link 
                  href="https://github.com/ChanMeng666" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-foreground transition-colors"
                >
                  <Github className="w-3 h-3" />
                  @ChanMeng666
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
