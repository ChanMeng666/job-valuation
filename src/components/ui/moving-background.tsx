'use client';

import React from 'react';

const MovingBackground = () => {
  // 创建单个图案区域
  const createPatternSection = (key: number) => {
    const emojis = ['🐂', '🐎', '🌿', '⛰️'];
    const rows = 20;
    const itemsPerRow = 20;

    return (
      <div 
        key={key}
        className="absolute w-full h-full"
        style={{
          transform: `translateY(${key * 98}%)`,
          marginTop: key === 0 ? '0' : '-2%',
          height: '102%',
        }}
      >
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div 
            key={rowIndex} 
            className="whitespace-nowrap"
            style={{ 
              marginTop: '-0.5rem',
              marginBottom: rowIndex === rows - 1 ? '-0.5rem' : '0',
            }}
          >
            {Array.from({ length: itemsPerRow }).map((_, colIndex) => (
              <span 
                key={colIndex} 
                className="inline-block text-5xl opacity-[0.15] select-none"
                style={{
                  padding: '1.25rem 1.25rem',
                }}
              >
                {emojis[(rowIndex + colIndex) % emojis.length]}
              </span>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-gradient-to-br from-slate-100 via-white to-slate-100 dark:from-slate-900 dark:via-gray-900 dark:to-slate-900">
      <div 
        className="absolute w-[400%] h-[400%] slow-bg-scroll"
        style={{
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden'
        }}
      >
        <div className="relative w-full h-full">
          {/* 创建50个区块以确保足够的覆盖和平滑过渡 */}
          {Array.from({ length: 50 }).map((_, index) => createPatternSection(index))}
        </div>
      </div>

      {/* 渐变遮罩 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-white/60 dark:from-black/60 dark:to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-transparent to-white/60 dark:from-black/60 dark:to-black/60" />
      </div>
    </div>
  );
};

export default MovingBackground;