import React, { useState } from 'react';
import { Search, Cloud, CloudRain, Sun, Wind, Droplets, Eye, Gauge } from 'lucide-react';
import { WeatherCard } from './components/WeatherCard';
import { ForecastCard } from './components/ForecastCard';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';

// Mock weather data
const getMockWeatherData = (city: string) => {
  const currentTemp = Math.floor(Math.random() * 20) + 10;
  const baseDate = new Date();
  
  return {
    city: city,
    country: 'TR',
    current: {
      temp: currentTemp,
      feels_like: currentTemp - 2,
      humidity: 65,
      wind_speed: 12,
      pressure: 1013,
      visibility: 10,
      description: 'Parçalı Bulutlu',
      icon: 'partly-cloudy'
    },
    forecast: Array.from({ length: 5 }, (_, i) => {
      const date = new Date(baseDate);
      date.setDate(date.getDate() + i + 1);
      return {
        date: date,
        temp_max: currentTemp + Math.floor(Math.random() * 5),
        temp_min: currentTemp - Math.floor(Math.random() * 5),
        description: i % 2 === 0 ? 'Güneşli' : 'Az Bulutlu',
        icon: i % 2 === 0 ? 'sunny' : 'partly-cloudy'
      };
    })
  };
};

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const data = getMockWeatherData(city);
      setWeatherData(data);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Cloud className="w-10 h-10 text-blue-500" />
            <h1 className="text-blue-900">Hava Durumu</h1>
          </div>
          <p className="text-gray-600">5 günlük hava tahmini</p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-12">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Şehir adı giriniz..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="flex-1 h-12 px-4 rounded-full border-2 border-gray-200 focus:border-blue-400 transition-colors"
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="h-12 px-6 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Search className="w-5 h-5 mr-2" />
              Ara
            </Button>
          </div>
        </form>

        {/* Weather Content */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">Yükleniyor...</p>
          </div>
        )}

        {!isLoading && weatherData && (
          <div className="space-y-8">
            {/* Current Weather */}
            <WeatherCard data={weatherData} />

            {/* Weather Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 text-gray-500 mb-2">
                  <Wind className="w-4 h-4" />
                  <span className="text-sm">Rüzgar</span>
                </div>
                <p className="text-gray-900">{weatherData.current.wind_speed} km/s</p>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 text-gray-500 mb-2">
                  <Droplets className="w-4 h-4" />
                  <span className="text-sm">Nem</span>
                </div>
                <p className="text-gray-900">{weatherData.current.humidity}%</p>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 text-gray-500 mb-2">
                  <Gauge className="w-4 h-4" />
                  <span className="text-sm">Basınç</span>
                </div>
                <p className="text-gray-900">{weatherData.current.pressure} hPa</p>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 text-gray-500 mb-2">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm">Görüş</span>
                </div>
                <p className="text-gray-900">{weatherData.current.visibility} km</p>
              </div>
            </div>

            {/* 5-Day Forecast */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="mb-6 text-gray-900">5 Günlük Tahmin</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                {weatherData.forecast.map((day: any, index: number) => (
                  <ForecastCard key={index} data={day} />
                ))}
              </div>
            </div>
          </div>
        )}

        {!isLoading && !weatherData && (
          <div className="text-center py-12">
            <Cloud className="w-24 h-24 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">Hava durumu bilgisi görmek için bir şehir arayın</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
