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
    description: "Crispy golden dosa brushed with aromatic gun powder, hot ghee and authentic Tanjore sambar.",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&q=80&w=600",
    prepTime: "25 min",
    price: 120
  },
  {
    id: "karimeen-pollichathu",
    chef: "KUTTANAD HOUSE",
    region: "KERALA HERITAGE",
    title: "Karimeen Pollichathu",
    description: "Pearl spot fish marinated in shallot-chilli masala, wrapped in banana leaf and charcoal grilled.",
    image: "https://images.unsplash.com/photo-1545642191-23d6a715fbc9?auto=format&fit=crop&q=80&w=600",
    prepTime: "35 min",
    price: 280
  },
  {
    id: "chettinad-chicken-biryani",
    chef: "KARAIKUDI SAMAYAL",
    region: "CHETTINAD",
    title: "Seeraga Samba Chicken Biryani",
    description: "Fragrant short-grain rice slow-cooked with fresh hand-ground spices and tender chicken.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=600",
    prepTime: "40 min",
    price: 240
  },
  {
    id: "amritsari-kulcha-dal",
    chef: "PUNJABI DHABA ALLEY",
    region: "NORTH INDIAN",
    title: "Amritsari Stuffed Kulcha & Dal Makhani",
    description: "Crispy tandoor-baked spiced potato kulcha served with overnight slow-cooked creamy black lentils.",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=600",
    prepTime: "30 min",
    price: 190
  },
  {
    id: "tanjore-banana-leaf-feast",
    chef: "RAJESHWARI'S HOME",
    region: "TAMIL HERITAGE",
    title: "Tanjore Kalyana Sapphire Meal",
    description: "Traditional 14-item banana leaf feast featuring Arachavitta Sambar, Vatha Kuzhambu and Badam Halwa.",
    image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&q=80&w=600",
    prepTime: "45 min",
    price: 320
  }
];
