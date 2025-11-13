import React from 'react';
import { CustomAlert, EquipmentType } from '../types';
import { PlusIcon } from './icons/PlusIcon';
import { TrashIcon } from './icons/TrashIcon';
import ToggleSwitch from './ToggleSwitch';

interface SidebarProps {
    filters: (EquipmentType | 'All')[];
    activeFilter: EquipmentType | 'All';
    onFilterChange: (filter: EquipmentType | 'All') => void;
    customAlerts: CustomAlert[];
    onAddAlert: () => void;
    onDeleteAlert: (id: string) => void;
    onToggleAlert: (id: string) => void;
}

const getAlertDescription = (alert: CustomAlert): string => {
    const equipmentName = alert.equipmentName;
    if (alert.metric === 'health') {
        return `${equipmentName} status is ${alert.threshold}`;
    }
    const operator = alert.condition === 'gt' ? '>' : '<';
    return `${equipmentName} utilization ${operator} ${alert.threshold}%`;
};

const Sidebar: React.FC<SidebarProps> = ({
    filters,
    activeFilter,
    onFilterChange,
    customAlerts,
    onAddAlert,
    onDeleteAlert,
    onToggleAlert,
}) => {
    return (
        <aside className="w-64 bg-gray-800/30 p-4 border-r border-gray-700 flex flex-col">
            <div>
                <h2 className="text-lg font-semibold mb-4 text-gray-300">Equipment Types</h2>
                <nav className="flex flex-col space-y-2">
                    {filters.map(filter => (
                        <button
                            key={filter}
                            onClick={() => onFilterChange(filter)}
                            className={`px-4 py-2 text-left rounded-md text-sm font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 ${
                                activeFilter === filter
                                    ? 'bg-cyan-500 text-white shadow-md'
                                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700 hover:text-white'
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                </nav>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-700 flex-1 flex flex-col min-h-0">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-300">Custom Alerts</h2>
                    <button
                        onClick={onAddAlert}
                        className="p-1.5 bg-gray-700/50 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                        aria-label="Create new alert"
                    >
                        <PlusIcon className="w-5 h-5" />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto space-y-2 pr-1 -mr-1">
                    {customAlerts.length === 0 && (
                        <p className="text-sm text-gray-500 text-center">No custom alerts created.</p>
                    )}
                    {customAlerts.map(alert => (
                        <div key={alert.id} className="bg-gray-700/40 p-2.5 rounded-md text-sm">
                            <p className="text-gray-200 font-medium mb-2">{getAlertDescription(alert)}</p>
                            <div className="flex justify-between items-center">
                                <ToggleSwitch 
                                    checked={alert.isEnabled}
                                    onChange={() => onToggleAlert(alert.id)}
                                />
                                <button
                                    onClick={() => onDeleteAlert(alert.id)}
                                    className="p-1 text-gray-500 hover:text-red-400 transition-colors"
                                    aria-label={`Delete alert for ${alert.equipmentName}`}
                                >
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
