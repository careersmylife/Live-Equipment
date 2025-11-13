
import React from 'react';
import { Equipment, EquipmentType, HealthStatus } from '../types';
import { CraneIcon } from './icons/CraneIcon';
import { TruckIcon } from './icons/TruckIcon';
import { RtgIcon } from './icons/RtgIcon';

interface EquipmentCardProps {
  equipment: Equipment;
}

const HealthIndicator: React.FC<{ status: HealthStatus }> = ({ status }) => {
  const baseClasses = "w-3 h-3 rounded-full";
  const statusConfig = {
    Operational: {
      bgColor: 'bg-green-500',
      shadowColor: 'shadow-[0_0_8px_2px_rgba(34,197,94,0.5)]',
      text: 'Operational',
    },
    Warning: {
      bgColor: 'bg-yellow-400',
      shadowColor: 'shadow-[0_0_8px_2px_rgba(250,204,21,0.5)]',
      text: 'Warning',
    },
    Error: {
      bgColor: 'bg-red-500',
      shadowColor: 'shadow-[0_0_8px_2px_rgba(239,68,68,0.5)]',
      text: 'Error',
    },
  };
  const config = statusConfig[status];

  return (
    <div className="flex items-center gap-2">
      <div className={`${baseClasses} ${config.bgColor} ${config.shadowColor}`}></div>
      <span className="text-sm font-medium">{config.text}</span>
    </div>
  );
};

const UtilizationBar: React.FC<{ value: number }> = ({ value }) => {
    const percentage = Math.round(value);
    const color = percentage > 85 ? 'bg-red-500' : percentage > 60 ? 'bg-yellow-500' : 'bg-green-500';
    return (
        <div>
            <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-medium text-gray-400">Utilization</span>
                <span className="text-sm font-bold">{percentage}%</span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2.5">
                <div className={`${color} h-2.5 rounded-full transition-all duration-500 ease-out`} style={{ width: `${percentage}%` }}></div>
            </div>
        </div>
    )
}

const EquipmentIcon: React.FC<{ type: EquipmentType }> = ({ type }) => {
    const iconProps = { className: "w-6 h-6 text-cyan-400" };
    switch (type) {
        case EquipmentType.Crane:
            return <CraneIcon {...iconProps} />;
        case EquipmentType.Truck:
            return <TruckIcon {...iconProps} />;
        case EquipmentType.RTG:
            return <RtgIcon {...iconProps} />;
        default:
            return null;
    }
};

const EquipmentCard: React.FC<EquipmentCardProps> = ({ equipment }) => {
  const { id, name, type, location, health, utilization } = equipment;
  const borderColor = health === 'Error' ? 'border-red-500/50' : health === 'Warning' ? 'border-yellow-400/50' : 'border-gray-700';

  return (
    <div className={`bg-gray-800/60 rounded-lg shadow-lg p-4 flex flex-col justify-between border ${borderColor} backdrop-blur-sm transition-all duration-300 hover:shadow-cyan-500/20 hover:border-cyan-500/50`}>
        <div>
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                    <EquipmentIcon type={type} />
                    <h3 className="font-bold text-lg text-white">{name}</h3>
                </div>
                <span className="text-xs font-mono bg-gray-700 px-2 py-1 rounded">{id}</span>
            </div>

            <div className="space-y-3 text-gray-300">
                <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-gray-400">Status:</span>
                    <HealthIndicator status={health} />
                </div>
                <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-gray-400">Location:</span>
                    <span className="font-mono">{`X: ${location.x}, Y: ${location.y}`}</span>
                </div>
            </div>
        </div>
        
        <div className="mt-4">
            <UtilizationBar value={utilization} />
        </div>
    </div>
  );
};

export default EquipmentCard;
