
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CountdownProgressProps {
  weddingDate: string;
  completedTasks: number;
  totalTasks: number;
}

export const CountdownProgress: React.FC<CountdownProgressProps> = ({
  weddingDate,
  completedTasks,
  totalTasks,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  useEffect(() => {
    if (!weddingDate) return;

    const calculateTimeLeft = () => {
      const difference = +new Date(weddingDate) - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  if (!weddingDate) {
    return (
      <Card className="mb-6 bg-gradient-to-r from-rose-100 to-pink-100 dark:from-rose-900/20 dark:to-pink-900/20 border-rose-200 dark:border-rose-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">💕</div>
              <div>
                <p className="font-medium text-rose-700 dark:text-rose-300">Countdown & Progress</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Atur tanggal pernikahan untuk melihat countdown</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-rose-600 dark:text-rose-400">{Math.round(progressPercentage)}%</div>
              <div className="text-xs text-gray-600 dark:text-gray-300">Progress</div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const isPast = +new Date(weddingDate) < +new Date();

  return (
    <Card className="mb-6 bg-gradient-to-r from-rose-100 to-pink-100 dark:from-rose-900/20 dark:to-pink-900/20 border-rose-200 dark:border-rose-800">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">💐</span>
            <CardTitle className="text-lg font-semibold text-rose-700 dark:text-rose-300">
              {isPast ? 'Selamat Atas Pernikahan!' : 'Countdown Hari Bahagia'}
            </CardTitle>
          </div>
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
        <div className="space-y-4">
          {/* Progress Bar */}
          <div className="relative">
            <Progress value={progressPercentage} className="h-4" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-medium text-white drop-shadow-md">
                {Math.round(progressPercentage)}%
              </span>
            </div>
          </div>

          {/* Countdown Display */}
          {!isPast && (
            <div className="grid grid-cols-4 gap-2 text-center">
              <div>
                <div className="text-xl font-bold text-rose-600 dark:text-rose-400">{timeLeft.days}</div>
                <div className="text-xs text-gray-600 dark:text-gray-300">Hari</div>
              </div>
              <div>
                <div className="text-xl font-bold text-rose-600 dark:text-rose-400">{timeLeft.hours}</div>
                <div className="text-xs text-gray-600 dark:text-gray-300">Jam</div>
              </div>
              <div>
                <div className="text-xl font-bold text-rose-600 dark:text-rose-400">{timeLeft.minutes}</div>
                <div className="text-xs text-gray-600 dark:text-gray-300">Menit</div>
              </div>
              <div>
                <div className="text-xl font-bold text-rose-600 dark:text-rose-400">{timeLeft.seconds}</div>
                <div className="text-xs text-gray-600 dark:text-gray-300">Detik</div>
              </div>
            </div>
          )}

          {isExpanded && (
            <div className="space-y-2 pt-2 border-t border-rose-200 dark:border-rose-700">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                <span>Tugas Selesai: {completedTasks}</span>
                <span>Total Tugas: {totalTasks}</span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 text-center">
                {new Date(weddingDate).toLocaleDateString('id-ID', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
