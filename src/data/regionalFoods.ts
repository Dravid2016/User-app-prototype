// data/regionalFoods.ts

export interface RegionalFood {
  id: 'tamilnadu' | 'kerala' | 'karnataka' | 'andhra' | 'telangana';
  name: string;
  subtitle: string;
  image: string;
}

export const regionalFoods: RegionalFood[] = [
  {
    id: "tamilnadu",
    name: "Tamil Nadu",
    subtitle: "Temple kitchens & classics",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "kerala",
    name: "Kerala",
    subtitle: "Coconut, spice & tradition",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "karnataka",
    name: "Karnataka",
    subtitle: "From Udupi to Mysuru",
    image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "andhra",
    name: "Andhra",
    subtitle: "Bold spice & heritage",
    image: "https://images.unsplash.com/photo-1627440562306-0775a6c3826f?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "telangana",
    name: "Telangana",
    subtitle: "Nawabi slow-dum heritage",
    image: "https://images.unsplash.com/photo-1599933310672-0402b8d009b0?auto=format&fit=crop&q=80&w=600",
  }
];
