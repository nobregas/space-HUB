import type { OccupancyData } from "@/types";
import React from "react";

interface OccupancyChartProps {
  data: OccupancyData;
}

const OccupancyChart: React.FC<OccupancyChartProps> = ({ data }) => {
  const maxCount = Math.max(...data.hourlyOccupancy.map((item) => item.count));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Ocupação por Hora
      </h3>
      <div className="flex items-end justify-center h-48 space-x-2">
        {data.hourlyOccupancy.map((item, index) => {
          const height = (item.count / maxCount) * 100;
          const isCurrentHour =
            new Date().getHours() === parseInt(item.hour.split(":")[0]);

          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full flex items-end justify-center h-40">
                <div
                  className={`w-full rounded-t-md transition-all duration-300 hover:opacity-80 ${
                    isCurrentHour
                      ? "bg-blue-500"
                      : item.count > 60
                      ? "bg-red-400"
                      : item.count > 30
                      ? "bg-orange-400"
                      : "bg-green-400"
                  }`}
                  style={{ height: `${height}%` }}
                  title={`${item.hour}: ${item.count} pessoas`}
                />
              </div>
              <div className="mt-2 text-xs text-gray-600 font-medium">
                {item.hour}
              </div>
              <div className="text-xs text-gray-500">{item.count}</div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex items-center justify-center space-x-4 text-xs">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-green-400 rounded"></div>
          <span>Baixa (&lt;30)</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-orange-400 rounded"></div>
          <span>Média (30-60)</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-red-400 rounded"></div>
          <span>Alta (&gt;60)</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span>Atual</span>
        </div>
      </div>
    </div>
  );
};

export default OccupancyChart;
