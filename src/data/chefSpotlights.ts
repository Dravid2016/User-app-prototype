// data/chefSpotlights.ts

export interface ChefSpotlightItem {
  id: string;
  chef: string;
  region: string;
  title: string;
  description: string;
  image: string;
  prepTime: string;
  price: number;
}

export const chefSpotlights: ChefSpotlightItem[] = [
  {
    id: "ghee-podi-dosa",
    chef: "ANNA KITCHEN",
    region: "SOUTH INDIAN",
    title: "Ghee Podi Masala Dosa",
    description: "Crispy golden dosa brushed with aromatic podi, spicy green chutney and authentic South Indian sides.",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&q=80&w=600",
    prepTime: "25 min",
    price: 120
  },
  {
    id: "karimeen-pollichathu",
    chef: "KUTTANAD HOUSE",
    region: "KERALA SPEC",
    title: "Karimeen Pollichathu",
    description: "Pearl spot fish marinated in traditional red spices, wrapped in banana leaf and charcoal grilled.",
    image: "https://images.unsplash.com/photo-1545642191-23d6a715fbc9?auto=format&fit=crop&q=80&w=600",
    prepTime: "35 min",
    price: 280
  }
];
