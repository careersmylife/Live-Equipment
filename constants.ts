
import { Equipment, EquipmentType } from './types';

export const INITIAL_EQUIPMENT_DATA: Equipment[] = [
  { id: 'C01', name: 'Crane Alpha', type: EquipmentType.Crane, location: { x: 120, y: 340 }, health: 'Operational', utilization: 75 },
  { id: 'C02', name: 'Crane Bravo', type: EquipmentType.Crane, location: { x: 150, y: 355 }, health: 'Operational', utilization: 88 },
  { id: 'T01', name: 'Truck 1', type: EquipmentType.Truck, location: { x: 250, y: 110 }, health: 'Operational', utilization: 45 },
  { id: 'T02', name: 'Truck 2', type: EquipmentType.Truck, location: { x: 50, y: 220 }, health: 'Warning', utilization: 95 },
  { id: 'T03', name: 'Truck 3', type: EquipmentType.Truck, location: { x: 400, y: 50 }, health: 'Operational', utilization: 60 },
  { id: 'RTG01', name: 'RTG Gantry 1', type: EquipmentType.RTG, location: { x: 300, y: 450 }, health: 'Operational', utilization: 82 },
  { id: 'RTG02', name: 'RTG Gantry 2', type: EquipmentType.RTG, location: { x: 310, y: 480 }, health: 'Error', utilization: 0 },
  { id: 'C03', name: 'Crane Charlie', type: EquipmentType.Crane, location: { x: 180, y: 360 }, health: 'Warning', utilization: 92 },
  { id: 'T04', name: 'Truck 4', type: EquipmentType.Truck, location: { x: 180, y: 150 }, health: 'Operational', utilization: 30 },
  { id: 'RTG03', name: 'RTG Gantry 3', type: EquipmentType.RTG, location: { x: 320, y: 510 }, health: 'Operational', utilization: 70 },
  { id: 'T05', name: 'Truck 5', type: EquipmentType.Truck, location: { x: 90, y: 400 }, health: 'Operational', utilization: 55 },
  { id: 'C04', name: 'Crane Delta', type: EquipmentType.Crane, location: { x: 210, y: 370 }, health: 'Operational', utilization: 65 },
];
