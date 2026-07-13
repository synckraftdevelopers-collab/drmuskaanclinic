export interface SubService {
  name: string;
  description: string;
  benefits: string[];
  duration: string;
  priceEstimate?: string;
}

export interface Service {
  id: "hair" | "skin" | "homeopathy";
  title: string;
  tagline: string;
  description: string;
  iconName: string; // lucide icon identifier
  subServices: SubService[];
  homeopathicSynergy: string; // how homeopathy complements this service
}

export interface Appointment {
  id?: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  subService: string;
  date: string;
  time: string;
  notes?: string;
  status?: "Confirmed" | "Pending" | "Completed";
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  service: string;
  date: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: Date;
}
