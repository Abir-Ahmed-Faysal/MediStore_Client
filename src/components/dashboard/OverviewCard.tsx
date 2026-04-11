'use client';

import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface OverviewCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
  onClick?: () => void;
}

export const OverviewCard: React.FC<OverviewCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = 'blue',
  onClick,
}) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    red: 'bg-red-50 text-red-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    purple: 'bg-purple-50 text-purple-600',
  };

  const borderClasses = {
    blue: 'border-l-blue-500',
    green: 'border-l-green-500',
    red: 'border-l-red-500',
    yellow: 'border-l-yellow-500',
    purple: 'border-l-purple-500',
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${borderClasses[color]} ${
        onClick ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 font-medium">{title}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{value}</h3>
          </div>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}

          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-sm font-semibold ${
              trend.isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              {trend.isPositive ? (
                <TrendingUp size={16} />
              ) : (
                <TrendingDown size={16} />
              )}
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>

        {Icon && (
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
            <Icon size={28} />
          </div>
        )}
      </div>
    </div>
  );
};

interface OverviewGridProps {
  cards: OverviewCardProps[];
  columns?: 1 | 2 | 3 | 4;
}

export const OverviewGrid: React.FC<OverviewGridProps> = ({ cards, columns = 4 }) => {
  const colClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid ${colClasses[columns]} gap-6`}>
      {cards.map((card, idx) => (
        <OverviewCard key={idx} {...card} />
      ))}
    </div>
  );
};
