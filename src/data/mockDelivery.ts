export type DeliveryStatus = "preparing" | "picked_up" | "on_the_way" | "delivered";
export type RiderStatus = "online" | "offline" | "busy";
export type ZoneLoad = "normal" | "busy" | "high_demand";

export interface ActiveDelivery {
  id: string;
  orderId: string;
  customerName: string;
  pickupStore: string;
  deliveryAddress: string;
  rider: string | null;
  status: DeliveryStatus;
  eta: string;
  priority: "normal" | "express";
  isDelayed: boolean;
  isNearby: boolean;
  isHighDemand: boolean;
  placedAt: string;
  progressPercent: number;
}

export interface Rider {
  id: string;
  name: string;
  avatar: string;
  location: string;
  activeOrders: number;
  status: RiderStatus;
  phone: string;
  rating: number;
  totalDeliveries: number;
}

export interface DeliveryZone {
  id: string;
  name: string;
  activeOrders: number;
  ridersAvailable: number;
  avgDeliveryTime: string;
  load: ZoneLoad;
}

export const mockDeliveries: ActiveDelivery[] = [
  { id: "D-001", orderId: "BK-20401", customerName: "Arjun Mehta", pickupStore: "BlitzMart Central", deliveryAddress: "Sector 62, Noida", rider: "Rahul Sharma", status: "on_the_way", eta: "4 min", priority: "express", isDelayed: false, isNearby: true, isHighDemand: false, placedAt: "2 min ago", progressPercent: 75 },
  { id: "D-002", orderId: "BK-20402", customerName: "Priya Nair", pickupStore: "FreshBasket HSR", deliveryAddress: "HSR Layout, Bangalore", rider: "Amit Kumar", status: "picked_up", eta: "9 min", priority: "normal", isDelayed: false, isNearby: false, isHighDemand: true, placedAt: "5 min ago", progressPercent: 50 },
  { id: "D-003", orderId: "BK-20403", customerName: "Rohan Gupta", pickupStore: "QuickGrocery Andheri", deliveryAddress: "Andheri West, Mumbai", rider: "Vikram Joshi", status: "preparing", eta: "14 min", priority: "normal", isDelayed: false, isNearby: false, isHighDemand: false, placedAt: "1 min ago", progressPercent: 10 },
  { id: "D-004", orderId: "BK-20404", customerName: "Sneha Reddy", pickupStore: "DailyNeeds Koramangala", deliveryAddress: "Koramangala 4th Block, Bangalore", rider: "Deepak Singh", status: "on_the_way", eta: "6 min", priority: "express", isDelayed: false, isNearby: true, isHighDemand: false, placedAt: "8 min ago", progressPercent: 65 },
  { id: "D-005", orderId: "BK-20405", customerName: "Karan Patel", pickupStore: "BlitzMart Bandra", deliveryAddress: "Bandra East, Mumbai", rider: null, status: "preparing", eta: "—", priority: "normal", isDelayed: true, isNearby: false, isHighDemand: false, placedAt: "12 min ago", progressPercent: 5 },
  { id: "D-006", orderId: "BK-20406", customerName: "Meera Singh", pickupStore: "FreshBasket Indiranagar", deliveryAddress: "Indiranagar, Bangalore", rider: "Suresh Yadav", status: "delivered", eta: "—", priority: "normal", isDelayed: false, isNearby: false, isHighDemand: false, placedAt: "20 min ago", progressPercent: 100 },
  { id: "D-007", orderId: "BK-20407", customerName: "Ankit Jain", pickupStore: "QuickGrocery CP", deliveryAddress: "Connaught Place, Delhi", rider: "Rajesh Verma", status: "on_the_way", eta: "3 min", priority: "express", isDelayed: false, isNearby: true, isHighDemand: true, placedAt: "6 min ago", progressPercent: 85 },
  { id: "D-008", orderId: "BK-20408", customerName: "Divya Kapoor", pickupStore: "BlitzMart Salt Lake", deliveryAddress: "Salt Lake Sector V, Kolkata", rider: "Manoj Das", status: "picked_up", eta: "11 min", priority: "normal", isDelayed: false, isNearby: false, isHighDemand: false, placedAt: "4 min ago", progressPercent: 40 },
  { id: "D-009", orderId: "BK-20409", customerName: "Siddharth Iyer", pickupStore: "DailyNeeds Powai", deliveryAddress: "Powai, Mumbai", rider: "Amit Kumar", status: "on_the_way", eta: "7 min", priority: "normal", isDelayed: true, isNearby: false, isHighDemand: false, placedAt: "15 min ago", progressPercent: 60 },
  { id: "D-010", orderId: "BK-20410", customerName: "Ritu Sharma", pickupStore: "FreshBasket Whitefield", deliveryAddress: "Whitefield, Bangalore", rider: "Deepak Singh", status: "delivered", eta: "—", priority: "normal", isDelayed: false, isNearby: false, isHighDemand: false, placedAt: "25 min ago", progressPercent: 100 },
  { id: "D-011", orderId: "BK-20411", customerName: "Harsh Agarwal", pickupStore: "BlitzMart Gurgaon", deliveryAddress: "DLF Phase 3, Gurgaon", rider: null, status: "preparing", eta: "—", priority: "express", isDelayed: false, isNearby: false, isHighDemand: true, placedAt: "1 min ago", progressPercent: 8 },
  { id: "D-012", orderId: "BK-20412", customerName: "Pooja Mishra", pickupStore: "QuickGrocery Lajpat", deliveryAddress: "Lajpat Nagar, Delhi", rider: "Naveen Tiwari", status: "picked_up", eta: "8 min", priority: "normal", isDelayed: false, isNearby: true, isHighDemand: false, placedAt: "7 min ago", progressPercent: 45 },
  { id: "D-013", orderId: "BK-20413", customerName: "Varun Bhat", pickupStore: "DailyNeeds MG Road", deliveryAddress: "MG Road, Bangalore", rider: "Suresh Yadav", status: "on_the_way", eta: "5 min", priority: "express", isDelayed: false, isNearby: false, isHighDemand: false, placedAt: "10 min ago", progressPercent: 70 },
  { id: "D-014", orderId: "BK-20414", customerName: "Nisha Tiwari", pickupStore: "BlitzMart Park Street", deliveryAddress: "Park Street, Kolkata", rider: "Manoj Das", status: "delivered", eta: "—", priority: "normal", isDelayed: false, isNearby: false, isHighDemand: false, placedAt: "30 min ago", progressPercent: 100 },
  { id: "D-015", orderId: "BK-20415", customerName: "Gaurav Saxena", pickupStore: "FreshBasket Noida", deliveryAddress: "Sector 18, Noida", rider: "Rahul Sharma", status: "preparing", eta: "16 min", priority: "normal", isDelayed: true, isNearby: false, isHighDemand: false, placedAt: "14 min ago", progressPercent: 12 },
];

export const mockRiders: Rider[] = [
  { id: "R-01", name: "Rahul Sharma", avatar: "RS", location: "Sector 62, Noida", activeOrders: 2, status: "busy", phone: "+91 98765 43210", rating: 4.8, totalDeliveries: 1240 },
  { id: "R-02", name: "Amit Kumar", avatar: "AK", location: "HSR Layout, Bangalore", activeOrders: 2, status: "busy", phone: "+91 98765 43211", rating: 4.6, totalDeliveries: 980 },
  { id: "R-03", name: "Vikram Joshi", avatar: "VJ", location: "Andheri, Mumbai", activeOrders: 1, status: "busy", phone: "+91 98765 43212", rating: 4.9, totalDeliveries: 1560 },
  { id: "R-04", name: "Deepak Singh", avatar: "DS", location: "Koramangala, Bangalore", activeOrders: 1, status: "busy", phone: "+91 98765 43213", rating: 4.5, totalDeliveries: 870 },
  { id: "R-05", name: "Suresh Yadav", avatar: "SY", location: "Indiranagar, Bangalore", activeOrders: 1, status: "busy", phone: "+91 98765 43214", rating: 4.7, totalDeliveries: 1100 },
  { id: "R-06", name: "Rajesh Verma", avatar: "RV", location: "CP, Delhi", activeOrders: 1, status: "busy", phone: "+91 98765 43215", rating: 4.4, totalDeliveries: 760 },
  { id: "R-07", name: "Manoj Das", avatar: "MD", location: "Salt Lake, Kolkata", activeOrders: 1, status: "busy", phone: "+91 98765 43216", rating: 4.8, totalDeliveries: 1320 },
  { id: "R-08", name: "Naveen Tiwari", avatar: "NT", location: "Lajpat Nagar, Delhi", activeOrders: 1, status: "busy", phone: "+91 98765 43217", rating: 4.3, totalDeliveries: 640 },
  { id: "R-09", name: "Sanjay Patil", avatar: "SP", location: "Viman Nagar, Pune", activeOrders: 0, status: "online", phone: "+91 98765 43218", rating: 4.6, totalDeliveries: 920 },
  { id: "R-10", name: "Ravi Pandey", avatar: "RP", location: "Gomti Nagar, Lucknow", activeOrders: 0, status: "offline", phone: "+91 98765 43219", rating: 4.1, totalDeliveries: 410 },
];

export const mockZones: DeliveryZone[] = [
  { id: "Z-01", name: "Kolkata North", activeOrders: 8, ridersAvailable: 2, avgDeliveryTime: "12 min", load: "busy" },
  { id: "Z-02", name: "Salt Lake", activeOrders: 4, ridersAvailable: 3, avgDeliveryTime: "9 min", load: "normal" },
  { id: "Z-03", name: "Park Street", activeOrders: 12, ridersAvailable: 1, avgDeliveryTime: "18 min", load: "high_demand" },
  { id: "Z-04", name: "HSR Layout", activeOrders: 6, ridersAvailable: 4, avgDeliveryTime: "10 min", load: "normal" },
  { id: "Z-05", name: "Koramangala", activeOrders: 9, ridersAvailable: 2, avgDeliveryTime: "14 min", load: "busy" },
  { id: "Z-06", name: "Andheri West", activeOrders: 11, ridersAvailable: 1, avgDeliveryTime: "16 min", load: "high_demand" },
  { id: "Z-07", name: "Connaught Place", activeOrders: 7, ridersAvailable: 3, avgDeliveryTime: "11 min", load: "busy" },
  { id: "Z-08", name: "Sector 62, Noida", activeOrders: 3, ridersAvailable: 5, avgDeliveryTime: "8 min", load: "normal" },
];

export const deliveryStatusConfig: Record<DeliveryStatus, { label: string; color: string }> = {
  preparing: { label: "Preparing", color: "bg-accent/15 text-accent border-accent/25" },
  picked_up: { label: "Picked Up", color: "bg-blue-500/15 text-blue-400 border-blue-500/25" },
  on_the_way: { label: "On The Way", color: "bg-primary/15 text-primary border-primary/25" },
  delivered: { label: "Delivered", color: "bg-muted text-muted-foreground border-border" },
};

export const zoneLoadConfig: Record<ZoneLoad, { label: string; color: string }> = {
  normal: { label: "Normal", color: "bg-primary/15 text-primary border-primary/25" },
  busy: { label: "Busy", color: "bg-accent/15 text-accent border-accent/25" },
  high_demand: { label: "High Demand", color: "bg-destructive/15 text-destructive border-destructive/25" },
};
