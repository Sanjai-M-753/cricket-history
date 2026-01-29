
import React from 'react';

interface StatBarProps {
  label: string;
  value: number | string;
  max?: number;
  color?: string;
}

const StatBar: React.FC<StatBarProps> = ({ label, value, max = 100, color = 'bg-emerald-600' }) => {
  const numericValue = typeof value === 'number' ? value : parseFloat(value);
  const percentage = Math.min(Math.max((numericValue / max) * 100, 5), 100);

  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs mb-1 font-semibold text-slate-600">
        <span>{label}</span>
        <span className="text-slate-900">{value}</span>
      </div>
      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} transition-all duration-700 ease-out`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default StatBar;
