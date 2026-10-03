export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface DeliveryMethod {
  id: string;
  title: string;
  description: string;
  estimatedDays: string;
  price: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  slug: string;
  image: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
}

export type OrderStatus = "processing" | "shipped" | "delivered" | "cancelled";

export interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  deliveryMethod: DeliveryMethod;
  paymentLast4: string;
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  trackingNumber?: string;
  estimatedDelivery?: string;
}
