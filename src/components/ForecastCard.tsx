import React from 'react';
import { Sun, Cloud } from 'lucide-react';

interface ForecastCardProps {
  data: {
    date: Date;
    temp_max: number;
    temp_min: number;
    description: string;
    icon: string;
  };
}

export function ForecastCard({ data }: ForecastCardProps) {
  const getDayName = (date: Date) => {
    const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    return days[date.getDay()];
  };

  const getWeatherIcon = (iconType: string) => {
    switch (iconType) {
      case 'sunny':
        return <Sun className="w-10 h-10 text-yellow-500" />;
      default:
        return <Cloud className="w-10 h-10 text-gray-400" />;
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-shadow">
      <p className="text-sm text-gray-600 mb-3">
        {getDayName(data.date)}
      </p>
      
      <div className="flex justify-center mb-3">
        {getWeatherIcon(data.icon)}
      </div>

      <div className="text-center">
        <div className="flex items-center justify-center gap-2">
          <span className="text-gray-900">{data.temp_max}°</span>
          <span className="text-gray-400">{data.temp_min}°</span>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {data.description}
        </p>
      </div>
    </div>
  );
}
