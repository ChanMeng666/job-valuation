import React from 'react'
import { Card } from '@/components/ui/card'

interface ScoreInputProps {
  value: number
  onChange: (value: number) => void
  label: string
  description?: string
}

export function ScoreInput({ value, onChange, label, description }: ScoreInputProps) {
  const scores = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const getScoreColor = (score: number) => {
    if (score <= 3) return 'bg-red-100 hover:bg-red-200'
    if (score <= 6) return 'bg-yellow-100 hover:bg-yellow-200'
    if (score <= 8) return 'bg-green-100 hover:bg-green-200'
    return 'bg-emerald-100 hover:bg-emerald-200'
  }

  const getScoreDescription = (score: number) => {
    if (score <= 3) return '不满意'
    if (score <= 6) return '一般'
    if (score <= 8) return '满意'
    return '非常满意'
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-base font-medium">{label}</label>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      
      <div className="grid grid-cols-10 gap-2">
        {scores.map((score) => (
          <Card
            key={score}
            className={`${
              getScoreColor(score)
            } cursor-pointer transition-colors p-2 ${
              value === score ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => onChange(score)}
          >
            <div className="text-center">
              <div className="font-medium">{score}</div>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-sm text-muted-foreground text-center">
        {value ? `当前评分: ${value}分 (${getScoreDescription(value)})` : '请选择评分'}
      </div>
    </div>
  )
}
