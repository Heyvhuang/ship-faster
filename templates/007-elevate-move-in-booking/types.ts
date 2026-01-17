export enum BookingStatus {
  PENDING_DEPOSIT = 'PENDING_DEPOSIT',
  PENDING_REVIEW = 'PENDING_REVIEW',
  CONFIRMED = 'CONFIRMED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface Slot {
  id: string;
  time: string; // "09:00 - 12:00"
  available: boolean;
}

export interface DaySchedule {
  date: string; // ISO date string
  slots: Slot[];
  isBlackout?: boolean;
}

export interface Booking {
  id: string;
  residentName: string;
  unit: string;
  date: string;
  timeSlot: string;
  depositAmount: number;
  status: BookingStatus;
  documentsUploaded: boolean;
  notes?: string;
}

export interface BuildingRules {
  moveInStart: string;
  moveInEnd: string;
  slotDuration: number;
  depositAmount: number;
  blackoutDays: string[]; // e.g., ["Sunday"]
}

// AI Service Types
export interface RuleExtractionResponse {
  moveInStart: string;
  moveInEnd: string;
  slotDuration: number;
  depositAmount: number;
  blackoutDays: string[];
}
