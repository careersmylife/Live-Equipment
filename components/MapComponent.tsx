
import React from 'react';
import { Equipment, EquipmentType, HealthStatus } from '../types';

interface MapComponentProps {
  equipmentList: Equipment[];
}

const MAP_WIDTH = 500;
const MAP_HEIGHT = 600;

const getHealthColor = (status: HealthStatus) => {
  switch (status) {
    case 'Operational':
      return '#22c55e'; // green-500
    case 'Warning':
      return '#facc15'; // yellow-400
    case 'Error':
      return '#ef4444'; // red-500
    default:
      return '#9ca3af'; // gray-400
  }
};

const getEquipmentTypeInitial = (type: EquipmentType) => {
    switch(type) {
        case EquipmentType.Crane: return 'C';
        case EquipmentType.Truck: return 'T';
        case EquipmentType.RTG: return 'R';
    }
}


const MapComponent: React.FC<MapComponentProps> = ({ equipmentList }) => {
  return (
    <div className="bg-gray-800/60 rounded-lg shadow-lg p-4 border border-gray-700 backdrop-blur-sm mb-6">
        <h2 className="text-xl font-bold text-white mb-4">Equipment Location Map</h2>
        <div className="relative w-full overflow-x-auto" style={{ height: `${MAP_HEIGHT}px` }}>
            <svg
                className="bg-gray-900 rounded"
                width="100%"
                height="100%"
                viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
                preserveAspectRatio="xMidYMid meet"
                aria-labelledby="mapTitle"
            >
                <title id="mapTitle">Real-time map of port equipment locations.</title>
                {/* Grid Lines */}
                <defs>
                    <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(107, 114, 128, 0.2)" strokeWidth="0.5"/>
                    </pattern>
                    <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                    <rect width="100" height="100" fill="url(#smallGrid)"/>
                    <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(107, 114, 128, 0.4)" strokeWidth="1"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Equipment Markers */}
                {equipmentList.map((eq) => (
                    <g key={eq.id} transform={`translate(${eq.location.x}, ${eq.location.y})`} className="transition-transform duration-500 ease-linear" role="img" aria-label={`${eq.name} at position ${eq.location.x}, ${eq.location.y}`}>
                        <circle
                            cx="0"
                            cy="0"
                            r="8"
                            fill={getHealthColor(eq.health)}
                            stroke="#f9fafb"
                            strokeWidth="1.5"
                            className="opacity-80"
                        >
                            <title>{`${eq.name} (${eq.id})\nStatus: ${eq.health}\nLocation: X:${eq.location.x}, Y:${eq.location.y}`}</title>
                        </circle>
                        <text
                            x="0"
                            y="0"
                            textAnchor="middle"
                            dy=".3em"
                            fontSize="9"
                            fill="#000"
                            fontWeight="bold"
                            style={{ pointerEvents: 'none' }}
                        >
                            {getEquipmentTypeInitial(eq.type)}
                        </text>
                    </g>
                ))}
            </svg>
        </div>
    </div>
  );
};

export default MapComponent;
