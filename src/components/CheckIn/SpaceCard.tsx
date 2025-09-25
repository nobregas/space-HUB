import React from "react";

interface SpaceCardProps {
  spaceName: string;
  capacity: number;
  occupancy: number;
  isSelected: boolean;
  onClick: () => void;
}

const SpaceCard: React.FC<SpaceCardProps> = ({
  spaceName,
  capacity,
  occupancy,
  isSelected,
  onClick,
}) => {
  const occupancyPercentage = capacity > 0 ? (occupancy / capacity) * 100 : 0;

  const getOccupancyColor = () => {
    if (occupancyPercentage >= 100) {
      return "bg-red-500";
    }
    if (occupancyPercentage > 0) {
      return "bg-yellow-500";
    }
    return "bg-green-500";
  };

  return (
    <div
      className={`p-4 rounded-lg shadow-md cursor-pointer transition-all bg-white hover:bg-gray-50 hover:scale-101 hover:shadow-lgx ${
        isSelected ? "ring-2 ring-blue-500" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold">{spaceName}</h3>
        <div className={`w-4 h-4 rounded-full ${getOccupancyColor()}`}></div>
      </div>
      <p className="text-sm text-gray-600">
        Ocupação: {occupancy}/{capacity}
      </p>
    </div>
  );
};

export default SpaceCard;
