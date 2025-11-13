export enum EquipmentType {
  Crane = 'Crane',
  Truck = 'Truck',
  RTG = 'RTG',
}

export type HealthStatus = 'Operational' | 'Warning' | 'Error';

export interface Equipment {
  id: string;
  name: string;
  type: EquipmentType;
  location: {
    x: number;
    y: number;
  };
  health: HealthStatus;
  utilization: number; // percentage 0-100
}

export interface Notification {
  id: string;
  message: string;
  type: 'Warning' | 'Error';
  timestamp: number;
}

type HealthAlert = {
    metric: 'health';
    threshold: 'Warning' | 'Error';
}

type UtilizationAlert = {
    metric: 'utilization';
    condition: 'gt' | 'lt'; // greater than or less than
    threshold: number;
}

export type CustomAlert = {
  id: string;
  equipmentId: string; // 'all' for all equipment
  equipmentName: string; // To display in UI
  isEnabled: boolean;
  isTriggeredFor: string[]; // List of equipment IDs that have currently triggered this alert.
} & (HealthAlert | UtilizationAlert)
