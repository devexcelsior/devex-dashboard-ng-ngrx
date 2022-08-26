export interface Vendor {
  id: number;
  name: string;
  url: string;
  description: string;
  longDescription?: string;
  category: string;
  promo: boolean;
}

export function compareVendors(v1: Vendor, v2: Vendor) {
  if (v1.name.toLowerCase() < v2.name.toLowerCase()) return -1;
  if (v1.name.toLowerCase() > v2.name.toLowerCase()) return 1;
  return 0;
}
