export type BookingStatus = "pending" | "confirmed" | "cancelled" | "checked_in" | "checked_out";

export type RoomType = {
  id: string;
  name: string;
  description: string | null;
  base_price_cents: number;
  max_guests: number;
  created_at: string;
};

export type Room = {
  id: string;
  room_number: string;
  room_type_id: string;
  is_active: boolean;
  created_at: string;
};

export type Booking = {
  id: string;
  user_id: string | null;
  room_id: string | null;
  price_total_cents: number;
  check_in: string;   // date
  check_out: string;  // date
  guests_count: number;
  status: BookingStatus;
  customer_email: string;
  customer_name: string | null;
  created_at: string;
  updated_at: string;
};