export interface Guest {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  category: "Tech" | "Business" | "Health" | "Art" | "Culture" | "Education";
  status: "upcoming" | "past";
  date: string;
  link?: string; // Added link property for redirection
  socials?: {
    linkedin?: string;
    instagram?: string;
    twitter?: string;
    facebook?: string;
    youtube?: string;
  };
}

export const GUESTS_DATA: Guest[] = [
  // --- UPCOMING (Realistic Raipur Context) ---
  {
    id: "1",
    name: "Dr. Purnendu Saxena",
    role: "Orthopedic Surgeon",
    company: "Ramkrishna Care",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=600&auto=format&fit=crop", // Doctor placeholder
    category: "Health",
    status: "upcoming",
    date: "Jan 20, 2026",
    socials: {
      linkedin: "https://linkedin.com",
      facebook: "https://facebook.com",
    },
  },
  {
    id: "2",
    name: "Anjeer Singh",
    role: "Chhattisgarhi Actor",
    company: "Chhollywood",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop", // Actor placeholder
    category: "Art",
    status: "upcoming",
    date: "Jan 25, 2026",
    socials: {
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
    },
  },

  // --- PAST (Real Episodes) ---
  {
    id: "56",
    name: "Trilok Yogi",
    role: "Stock Market Mentor",
    company: "Trilok Trading",
    image: "/featured2.png", // Using the image you have for the featured episode
    category: "Business",
    status: "past",
    date: "Jan 13, 2026",
    link: "https://www.youtube.com/watch?v=uIb9YGz_4Es&t=1s",
    socials: {
      instagram: "https://instagram.com/trilokyogi",
      youtube: "https://youtube.com/@trilokyogi",
    },
  },
  {
    id: "55",
    name: "Pandit Ajit Shastri",
    role: "Vastu Expert",
    company: "Vedic Solutions",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop", // Generic Elder/Expert
    category: "Culture",
    status: "past",
    date: "Jan 05, 2026",
    link: "https://www.youtube.com/@RaipurPodcast", // Fallback to channel
    socials: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
    },
  },
  {
    id: "54",
    name: "Abhishek Mishra",
    role: "Lyricist & Storyteller",
    company: "TEDx Speaker",
    image:
      "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=600&auto=format&fit=crop", // Creative/Artist
    category: "Art",
    status: "past",
    date: "Dec 28, 2025",
    link: "https://www.youtube.com/watch?v=L5aHjiOxeSA",
    socials: {
      instagram: "https://instagram.com/abhishekmishra",
      linkedin: "https://linkedin.com/in/abhishekmishra",
    },
  },
  {
    id: "53",
    name: "IPS Santosh Singh",
    role: "SP Raipur",
    company: "Chhattisgarh Police",
    image:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=600&auto=format&fit=crop", // Official/Police look
    category: "Education",
    status: "past",
    date: "Dec 15, 2025",
    link: "https://www.youtube.com/@RaipurPodcast",
    socials: {
      twitter: "https://twitter.com/IPS_Santosh",
    },
  },
  {
    id: "52",
    name: "RJ Naman",
    role: "Radio Jockey",
    company: "My FM 94.3",
    image:
      "https://images.unsplash.com/photo-1478737270239-2f02b77ac618?q=80&w=600&auto=format&fit=crop", // Mic/Radio context
    category: "Art",
    status: "past",
    date: "Dec 01, 2025",
    link: "https://www.youtube.com/@RaipurPodcast",
    socials: {
      instagram: "https://instagram.com/rjnaman",
      facebook: "https://facebook.com/rjnaman",
    },
  },
  {
    id: "51",
    name: "Minakshi Tuteja",
    role: "Model & Influencer",
    company: "Miss Chhattisgarh",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=600&auto=format&fit=crop", // Fashion model
    category: "Culture",
    status: "past",
    date: "Nov 20, 2025",
    link: "https://www.youtube.com/@RaipurPodcast",
    socials: {
      instagram: "https://instagram.com/minakshi",
    },
  },
];
