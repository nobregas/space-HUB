import React from 'react';

interface UsageData {
  period: string;
  checkins: number;
  reservations: number;
  events: number;
}

interface UsageChartProps {
  data: UsageData[];
  title: string;
}

const UsageChart: React.FC<UsageChartProps> = ({ data, title }) => {
  const maxValue = Math.max(
    ...data.flatMap(item => [item.checkins, item.reservations, item.events])
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-gray-700">{item.period}</span>
              <span className="text-gray-500">
                Total: {item.checkins + item.reservations + item.events}
              </span>
            </div>
            
            <div className="space-y-1">
              {/* Check-ins */}
              <div className="flex items-center space-x-3">
                <span className="text-xs text-blue-600 w-20">Check-ins</span>
                <div className="flex-1 bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(item.checkins / maxValue) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-600 w-8">{item.checkins}</span>
              </div>
              
              {/* Reservations */}
              <div className="flex items-center space-x-3">
                <span className="text-xs text-green-600 w-20">Reservas</span>
                <div className="flex-1 bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(item.reservations / maxValue) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-600 w-8">{item.reservations}</span>
              </div>
              
              {/* Events */}
              <div className="flex items-center space-x-3">
                <span className="text-xs text-purple-600 w-20">Eventos</span>
                <div className="flex-1 bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(item.events / maxValue) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-600 w-8">{item.events}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 flex items-center justify-center space-x-6 text-xs">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span>Check-ins</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span>Reservas</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-purple-500 rounded"></div>
          <span>Eventos</span>
        </div>
      </div>
    </div>
  );
};

export default UsageChart;