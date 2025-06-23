
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CompactProgressProps {
  completedTasks: number;
  totalTasks: number;
}

export const CompactProgress: React.FC<CompactProgressProps> = ({
  completedTasks,
  totalTasks,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-rose-600 dark:text-rose-400">
            Progress Persiapan
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          <div className="relative">
            <Progress value={progressPercentage} className="h-3" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-medium text-white drop-shadow-md">
                {Math.round(progressPercentage)}%
              </span>
            </div>
          </div>
          {isExpanded && (
            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-300">
              <span>Tugas Selesai: {completedTasks}</span>
              <span>Total Tugas: {totalTasks}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
