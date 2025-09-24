export interface Room {
  id: string;
  name: string;
  capacity: number;
  equipment: string[];
  location: string;
  image: string;
  isAvailable: boolean;
}

export interface Reservation {
  id: string;
  roomId: string;
  roomName: string;
  userId: string;
  userName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: ReservationStatus;
  purpose: string;
  attendees: User[];
}

export type ReservationStatus = 'confirmed' | 'pending' | 'cancelled';


export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isCheckedIn: boolean;
  checkInTime?: string;
  skills: string[];
  interests: string[];
  role: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  organizer: string;
  attendees: number;
  maxAttendees: number;
  type: EventType;
  image: string;
}

export type EventType = 'workshop' | 'networking' | 'presentation' | 'social';


export interface OccupancyData {
  totalCapacity: number;
  currentOccupancy: number;
  availableRooms: number;
  totalRooms: number;
  hourlyOccupancy: { hour: string; count: number }[];
}

export type CheckinStatus = "waiting" | "checked-in" | "checked-out";

export interface CheckinEntry {
  id: string;
  user: User;
  space: string;
  startTime: string;
  endTime: string;
  status: CheckinStatus;
  attendees?: User[];
}