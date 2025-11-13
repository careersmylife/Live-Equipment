import React, { useState, useEffect, useMemo } from 'react';
import { Equipment, EquipmentType, Notification as NotificationType, CustomAlert } from './types';
import { INITIAL_EQUIPMENT_DATA } from './constants';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import EquipmentCard from './components/EquipmentCard';
import MapComponent from './components/MapComponent';
import NotificationContainer from './components/NotificationContainer';
import AlertModal from './components/AlertModal';

const App: React.FC = () => {
  const [equipmentList, setEquipmentList] = useState<Equipment[]>(INITIAL_EQUIPMENT_DATA);
  const [activeFilter, setActiveFilter] = useState<EquipmentType | 'All'>('All');
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [customAlerts, setCustomAlerts] = useState<CustomAlert[]>([]);
  const [isAlertModalOpen, setAlertModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setEquipmentList(prevList => {
        const newList = prevList.map(eq => {
          let newUtilization = eq.utilization + (Math.random() * 6 - 3);
          newUtilization = Math.max(0, Math.min(100, newUtilization));

          let newX = eq.location.x + (Math.random() * 4 - 2);
          let newY = eq.location.y + (Math.random() * 4 - 2);
          newX = Math.max(10, Math.min(490, newX));
          newY = Math.max(10, Math.min(590, newY));

          let newLocation = {
            x: newX,
            y: newY,
          };

          let newHealth = eq.health;
          if (eq.health !== 'Error') {
            const randomFactor = Math.random();
            if (randomFactor < 0.01) {
              newHealth = 'Error';
            } else if (randomFactor < 0.05) {
              newHealth = 'Warning';
            } else if (eq.health === 'Warning' && randomFactor > 0.8) {
              newHealth = 'Operational';
            }
          }
          
          if(newHealth === 'Error') {
              newUtilization = 0;
          }

          return {
            ...eq,
            utilization: parseFloat(newUtilization.toFixed(1)),
            location: {
                x: parseFloat(newLocation.x.toFixed(2)),
                y: parseFloat(newLocation.y.toFixed(2)),
            },
            health: newHealth,
          };
        });

        const standardNotifications: NotificationType[] = [];
        newList.forEach(currentEq => {
            const prevEq = prevList.find(p => p.id === currentEq.id);
            if (prevEq && prevEq.health !== currentEq.health) {
                 const isEscalation = (prevEq.health === 'Operational' && (currentEq.health === 'Warning' || currentEq.health === 'Error')) ||
                                    (prevEq.health === 'Warning' && currentEq.health === 'Error');
                if (isEscalation) {
                    standardNotifications.push({
                        id: `${currentEq.id}-${Date.now()}`,
                        message: `${currentEq.name} status changed to ${currentEq.health}.`,
                        type: currentEq.health,
                        timestamp: Date.now(),
                    });
                }
            }
        });

        // Check Custom Alerts
        const updatedAlerts = JSON.parse(JSON.stringify(customAlerts)) as CustomAlert[];
        const customNotifications: NotificationType[] = [];

        updatedAlerts.forEach((alert) => {
            if (!alert.isEnabled) return;

            const currentlyTriggeringIds = new Set<string>();
            const equipmentToCheck = alert.equipmentId === 'all'
                ? newList
                : newList.filter(eq => eq.id === alert.equipmentId);

            equipmentToCheck.forEach(eq => {
                let conditionMet = false;
                if (alert.metric === 'health') {
                    conditionMet = eq.health === alert.threshold;
                } else { // utilization
                    if (alert.condition === 'gt') {
                        conditionMet = eq.utilization > alert.threshold;
                    } else { // 'lt'
                        conditionMet = eq.utilization < alert.threshold;
                    }
                }

                if (conditionMet) {
                    currentlyTriggeringIds.add(eq.id);
                    if (!alert.isTriggeredFor.includes(eq.id)) {
                        let message = `Custom Alert: ${eq.name} has a status of ${eq.health}.`;
                        if (alert.metric === 'utilization') {
                            message = `Custom Alert: ${eq.name} utilization (${eq.utilization}%) is ${alert.condition === 'gt' ? 'above' : 'below'} ${alert.threshold}%.`
                        }
                        customNotifications.push({
                            id: `${alert.id}-${eq.id}-${Date.now()}`,
                            message,
                            type: 'Warning',
                            timestamp: Date.now(),
                        });
                    }
                }
            });
            alert.isTriggeredFor = Array.from(currentlyTriggeringIds);
        });

        setCustomAlerts(updatedAlerts);

        if (standardNotifications.length > 0 || customNotifications.length > 0) {
            setNotifications(prevNotifications => [...standardNotifications, ...customNotifications, ...prevNotifications].slice(0, 5));
        }
        
        return newList;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [customAlerts]);

  const filteredEquipment = useMemo(() => {
    if (activeFilter === 'All') {
      return equipmentList;
    }
    return equipmentList.filter(eq => eq.type === activeFilter);
  }, [equipmentList, activeFilter]);
  
  const equipmentTypes: (EquipmentType | 'All')[] = ['All', ...Object.values(EquipmentType)];

  const handleDismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleAddAlert = (alertData: Omit<CustomAlert, 'id' | 'isEnabled' | 'isTriggeredFor'>) => {
    const newAlert: CustomAlert = {
        ...alertData,
        id: `alert-${Date.now()}`,
        isEnabled: true,
        isTriggeredFor: [],
    };
    setCustomAlerts(prev => [...prev, newAlert]);
    setAlertModalOpen(false);
  };

  const handleDeleteAlert = (id: string) => {
    setCustomAlerts(prev => prev.filter(a => a.id !== id));
  };

  const handleToggleAlert = (id: string) => {
    setCustomAlerts(prev => prev.map(a => a.id === id ? { ...a, isEnabled: !a.isEnabled } : a));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-200 font-sans">
      <NotificationContainer notifications={notifications} onDismiss={handleDismissNotification} />
      <AlertModal 
        isOpen={isAlertModalOpen}
        onClose={() => setAlertModalOpen(false)}
        onSave={handleAddAlert}
        equipmentList={equipmentList}
      />
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
            filters={equipmentTypes}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            customAlerts={customAlerts}
            onAddAlert={() => setAlertModalOpen(true)}
            onDeleteAlert={handleDeleteAlert}
            onToggleAlert={handleToggleAlert}
        />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <MapComponent equipmentList={equipmentList} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">
            {filteredEquipment.map(equipment => (
              <EquipmentCard key={equipment.id} equipment={equipment} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
