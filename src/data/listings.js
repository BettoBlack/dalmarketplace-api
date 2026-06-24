const listings = [
  {
    listingId: "lst-001",
    title: "CSCI 2110 Textbook - Data Structures",
    description: "Used once, excellent condition. Perfect for second year CS students.",
    price: 45.00,
    condition: "like-new",
    status: "available",
    category: "textbooks",
    thumbnailUrl: "https://placehold.co/200x200?text=Book",
    seller: { userId: "usr-001", name: "Alice M.", averageRating: 4.8 },
    createdAt: "2025-05-01T10:00:00Z"
  },
  {
    listingId: "lst-002",
    title: "TI-84 Plus Graphing Calculator",
    description: "Works perfectly, comes with batteries and case.",
    price: 60.00,
    condition: "good",
    status: "available",
    category: "electronics",
    thumbnailUrl: "https://placehold.co/200x200?text=Calc",
    seller: { userId: "usr-002", name: "Bob K.", averageRating: 4.5 },
    createdAt: "2025-05-03T14:00:00Z"
  },
  {
    listingId: "lst-003",
    title: "Organic Chemistry Textbook 8th Ed",
    description: "Some highlighting in first 3 chapters, otherwise great.",
    price: 55.00,
    condition: "fair",
    status: "available",
    category: "textbooks",
    thumbnailUrl: "https://placehold.co/200x200?text=Chem",
    seller: { userId: "usr-003", name: "Clara D.", averageRating: 4.2 },
    createdAt: "2025-05-05T09:30:00Z"
  },
  {
    listingId: "lst-004",
    title: "IKEA Desk Lamp - White",
    description: "Barely used, great for dorm rooms.",
    price: 12.00,
    condition: "like-new",
    status: "reserved",
    category: "furniture",
    thumbnailUrl: "https://placehold.co/200x200?text=Lamp",
    seller: { userId: "usr-001", name: "Alice M.", averageRating: 4.8 },
    createdAt: "2025-05-07T11:00:00Z"
  },
  {
    listingId: "lst-005",
    title: "MacBook Charger 61W USB-C",
    description: "Apple original, works with all MacBook Pro models.",
    price: 35.00,
    condition: "good",
    status: "available",
    category: "electronics",
    thumbnailUrl: "https://placehold.co/200x200?text=Charger",
    seller: { userId: "usr-004", name: "Dan P.", averageRating: 4.9 },
    createdAt: "2025-05-08T16:00:00Z"
  },
  {
    listingId: "lst-006",
    title: "Winter Jacket - Size M",
    description: "North Face, barely worn. Perfect for Halifax winters.",
    price: 80.00,
    condition: "good",
    status: "available",
    category: "clothing",
    thumbnailUrl: "https://placehold.co/200x200?text=Jacket",
    seller: { userId: "usr-005", name: "Eva L.", averageRating: 4.6 },
    createdAt: "2025-05-10T08:00:00Z"
  }
];

module.exports = listings;
