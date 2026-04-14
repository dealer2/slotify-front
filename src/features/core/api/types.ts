// src/api/types.ts

export interface Company {
  id: string;
  name: string;
  slug: string;
  logoUrl: string;
  email: string;
  phone: string;
  timezone: string;
  active: boolean;  
}

export interface Branch {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  countryId: number;
  latitude: number;
  longitude: number;
  active: boolean; 
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  photoUrl?: string;
  position?: string;
  active: boolean;
}