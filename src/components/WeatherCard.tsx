import React from 'react';
import { MapPin, Sun, Cloud, CloudRain } from 'lucide-react';

interface WeatherCardProps {
  data: {
    city: string;
    country: string;
    current: {
      temp: number;
      feels_like: number;
      description: string;
      icon: string;
    };
  };
}

export function WeatherCard({ data }: WeatherCardProps) {
  const getWeatherIcon = (iconType: string) => {
    switch (iconType) {
      case 'sunny':
        return <Sun className="w-24 h-24 text-yellow-400" />;
      case 'rainy':
        return <CloudRain className="w-24 h-24 text-blue-400" />;
      default:
        return <Cloud className="w-24 h-24 text-gray-400" />;
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-8 shadow-lg text-white">
      <div className="flex items-center gap-2 mb-6">
        <MapPin className="w-5 h-5" />
        <h2 className="text-white">
          {data.city}, {data.country}
        </h2>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-6xl">{data.current.temp}°</span>
          </div>
          <p className="mt-2 text-blue-100">
            Hissedilen: {data.current.feels_like}°
          </p>
          <p className="mt-1 text-blue-100 capitalize">
            {data.current.description}
          </p>
        </div>

        <div className="opacity-80">
          {getWeatherIcon(data.current.icon)}
        </div>
      </div>
    </div>
  );
}
