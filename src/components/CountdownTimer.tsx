
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface CountdownTimerProps {
  weddingDate: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ weddingDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

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
      <Card className="bg-gradient-to-r from-rose-100 to-pink-100 dark:from-rose-900/20 dark:to-pink-900/20 border-rose-200 dark:border-rose-800">
        <CardContent className="p-6 text-center">
          <div className="text-2xl mb-2">💕</div>
          <p className="text-gray-600 dark:text-gray-300">Atur tanggal pernikahan Anda untuk melihat countdown</p>
        </CardContent>
      </Card>
    );
  }

  const isPast = +new Date(weddingDate) < +new Date();

  return (
    <Card className="bg-gradient-to-r from-rose-100 to-pink-100 dark:from-rose-900/20 dark:to-pink-900/20 border-rose-200 dark:border-rose-800">
      <CardContent className="p-6">
        <div className="text-center">
          <div className="text-3xl mb-2">💐</div>
          <h3 className="text-lg font-semibold text-rose-700 dark:text-rose-300 mb-4">
            {isPast ? 'Selamat Atas Pernikahan Anda!' : 'Countdown Hari Bahagia'}
          </h3>
          
          {!isPast && (
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-rose-600 dark:text-rose-400">{timeLeft.days}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Hari</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-rose-600 dark:text-rose-400">{timeLeft.hours}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Jam</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-rose-600 dark:text-rose-400">{timeLeft.minutes}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Menit</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-rose-600 dark:text-rose-400">{timeLeft.seconds}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Detik</div>
              </div>
            </div>
          )}
          
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
            {new Date(weddingDate).toLocaleDateString('id-ID', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
