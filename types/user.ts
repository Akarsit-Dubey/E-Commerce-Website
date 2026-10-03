import { ShippingAddress } from "./order";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  memberSince: string;
  preferredCurrency: string;
}

export interface SavedAddress extends ShippingAddress {
  id: string;
  isDefault: boolean;
  label: string;
}
