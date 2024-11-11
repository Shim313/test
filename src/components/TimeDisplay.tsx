import React from 'react';
import { Clock } from 'lucide-react';

interface TimeDisplayProps {
  currentYear: number;
  targetYear: number;
}

export function TimeDisplay({ currentYear, targetYear }: TimeDisplayProps) {
  const yearDiff = targetYear - currentYear;
  const direction = yearDiff > 0 ? 'Future' : yearDiff < 0 ? 'Past' : 'Present';
  
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg border border-blue-500/30">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Clock className="text-blue-400" />
          Temporal Location
        </h3>
        <span className={`px-3 py-1 rounded-full text-sm ${
          direction === 'Present' 
            ? 'bg-green-500/20 text-green-400' 
            : 'bg-blue-500/20 text-blue-400'
        }`}>
          {direction}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="text-gray-400 text-sm">Current Year</span>
          <div className="text-2xl font-mono text-white">{currentYear}</div>
        </div>
        <div>
          <span className="text-gray-400 text-sm">Target Year</span>
          <div className="text-2xl font-mono text-blue-400">{targetYear}</div>
        </div>
      </div>
      {yearDiff !== 0 && (
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-400">
            {Math.abs(yearDiff)} years into the {direction.toLowerCase()}
          </span>
        </div>
      )}
    </div>
  );
}