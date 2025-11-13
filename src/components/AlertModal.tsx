import React, { useState, useEffect } from 'react';
import { Equipment, CustomAlert, HealthStatus } from '../types';

type AlertData = Omit<CustomAlert, 'id' | 'isEnabled' | 'isTriggeredFor'>;

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (alert: AlertData) => void;
  equipmentList: Equipment[];
}

const AlertModal: React.FC<AlertModalProps> = ({ isOpen, onClose, onSave, equipmentList }) => {
  const [equipmentId, setEquipmentId] = useState('all');
  const [metric, setMetric] = useState<'health' | 'utilization'>('health');
  const [healthThreshold, setHealthThreshold] = useState<HealthStatus>('Warning');
  const [utilizationCondition, setUtilizationCondition] = useState<'gt' | 'lt'>('gt');
  const [utilizationThreshold, setUtilizationThreshold] = useState(80);

  useEffect(() => {
    if (isOpen) {
      // Reset form on open
      setEquipmentId('all');
      setMetric('health');
      setHealthThreshold('Warning');
      setUtilizationCondition('gt');
      setUtilizationThreshold(80);
    }
  }, [isOpen]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const equipmentName = equipmentId === 'all'
        ? 'All Equipment'
        : equipmentList.find(eq => eq.id === equipmentId)?.name || '';

    // FIX: Construct alertData with a ternary to avoid excess property errors on union types.
    // This allows TypeScript to correctly validate each object literal against the corresponding member of the discriminated union.
    const alertData: AlertData = metric === 'health'
        ? {
            equipmentId,
            equipmentName,
            metric: 'health',
            threshold: healthThreshold
        }
        : {
            equipmentId,
            equipmentName,
            metric: 'utilization',
            condition: utilizationCondition,
            threshold: utilizationThreshold
        };
    onSave(alertData);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="alert-modal-title"
    >
      <div
        className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md m-4 border border-gray-700"
        onClick={e => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <h2 id="alert-modal-title" className="text-xl font-bold text-white mb-4">Create Custom Alert</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="equipment" className="block text-sm font-medium text-gray-300 mb-1">Equipment</label>
                <select
                  id="equipment"
                  value={equipmentId}
                  onChange={e => setEquipmentId(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                >
                  <option value="all">All Equipment</option>
                  {equipmentList.map(eq => (
                    <option key={eq.id} value={eq.id}>{eq.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="metric" className="block text-sm font-medium text-gray-300 mb-1">Metric</label>
                <select
                  id="metric"
                  value={metric}
                  onChange={e => setMetric(e.target.value as 'health' | 'utilization')}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                >
                  <option value="health">Health Status</option>
                  <option value="utilization">Utilization</option>
                </select>
              </div>
              
              {metric === 'health' ? (
                <div>
                  <label htmlFor="health-threshold" className="block text-sm font-medium text-gray-300 mb-1">Trigger when status is</label>
                  <select
                    id="health-threshold"
                    value={healthThreshold}
                    onChange={e => setHealthThreshold(e.target.value as HealthStatus)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  >
                    <option value="Warning">Warning</option>
                    <option value="Error">Error</option>
                  </select>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="util-condition" className="block text-sm font-medium text-gray-300 mb-1">Trigger when</label>
                    <select
                      id="util-condition"
                      value={utilizationCondition}
                      onChange={e => setUtilizationCondition(e.target.value as 'gt' | 'lt')}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    >
                      <option value="gt">Above</option>
                      <option value="lt">Below</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="util-threshold" className="block text-sm font-medium text-gray-300 mb-1">Threshold (%)</label>
                    <input
                      type="number"
                      id="util-threshold"
                      value={utilizationThreshold}
                      onChange={e => setUtilizationThreshold(parseInt(e.target.value, 10))}
                      min="0"
                      max="100"
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-gray-700/50 px-6 py-3 flex justify-end gap-3 rounded-b-lg">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md text-sm font-medium bg-gray-600 text-gray-200 hover:bg-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md text-sm font-medium bg-cyan-600 text-white hover:bg-cyan-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500"
            >
              Save Alert
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AlertModal;
