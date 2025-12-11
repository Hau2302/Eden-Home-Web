export interface RoomType {
  id: string;
  name: string;
  capacity: string;
  description: string;
  features: string[];
  image: string;
  tag: string;
}

export interface Amenity {
  iconClass: string;
  name: string;
}

export interface BlogPost {
  id: number;
  title: string;
  summary: string;
  date: string;
  image: string;
}

export interface BookingFormState {
  fullName: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  infants: number;
  arrivalTime: string;
  notes: string;
}