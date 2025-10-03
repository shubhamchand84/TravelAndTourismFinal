const mongoose = require('mongoose');
const Package = require('./models/Package');
require('dotenv').config();

const samplePackages = [
  {
    title: "Kedarkantha Winter Trek",
    description: "Experience the magical winter wonderland of Kedarkantha with snow-covered trails and breathtaking Himalayan views.",
    category: "Adventure",
    location: { city: "Sankri", country: "India" },
    durationDays: 6,
    basePrice: 9500,
    images: [],
    inclusions: ["Camping", "Meals", "Guide", "Transport"],
    exclusions: ["Personal expenses", "Tips"],
    discounts: [],
    availability: [],
    rating: 5,
    ratingCount: 210,
    isActive: true,
    bookingsCount: 45,
    maxGroupSize: 20,
    difficulty: "Moderate",
    highlights: ["Snow trails", "Summit views", "Camping experience"],
    itinerary: []
  },
  {
    title: "Valley of Flowers Trek",
    description: "Walk through meadows filled with colorful flowers and enjoy the pristine beauty of the Himalayas.",
    category: "Adventure",
    location: { city: "Govindghat", country: "India" },
    durationDays: 6,
    basePrice: 8500,
    images: [],
    inclusions: ["Camping", "Meals", "Guide", "Permits"],
    exclusions: ["Personal expenses", "Camera fees"],
    discounts: [],
    availability: [],
    rating: 5,
    ratingCount: 300,
    isActive: true,
    bookingsCount: 67,
    maxGroupSize: 15,
    difficulty: "Easy",
    highlights: ["Flower meadows", "Waterfalls", "Photography"],
    itinerary: []
  },
  {
    title: "Har Ki Dun Valley Trek",
    description: "Explore the ancient valley with rich cultural heritage and stunning mountain landscapes.",
    category: "Adventure",
    location: { city: "Sankri", country: "India" },
    durationDays: 7,
    basePrice: 9500,
    images: [],
    inclusions: ["Camping", "Meals", "Guide", "Transport"],
    exclusions: ["Personal expenses", "Tips"],
    discounts: [],
    availability: [],
    rating: 4,
    ratingCount: 122,
    isActive: true,
    bookingsCount: 28,
    maxGroupSize: 18,
    difficulty: "Moderate",
    highlights: ["Valley views", "Local culture", "River crossings"],
    itinerary: []
  },
  {
    title: "Kuari Pass Winter Trek",
    description: "Witness the majestic Nanda Devi and other peaks from Kuari Pass with snow all around.",
    category: "Adventure",
    location: { city: "Joshimath", country: "India" },
    durationDays: 5,
    basePrice: 8900,
    images: [],
    inclusions: ["Camping", "Meals", "Guide", "Transport"],
    exclusions: ["Personal expenses", "Warm clothes"],
    discounts: [],
    availability: [],
    rating: 4,
    ratingCount: 180,
    isActive: true,
    bookingsCount: 34,
    maxGroupSize: 16,
    difficulty: "Moderate",
    highlights: ["Mountain views", "Snow trekking", "Photography"],
    itinerary: []
  },
  {
    title: "Dayara Bugyal Meadows Trek",
    description: "Walk through vast grasslands with panoramic views of the Himalayas.",
    category: "Adventure",
    location: { city: "Raithal", country: "India" },
    durationDays: 4,
    basePrice: 6900,
    images: [],
    inclusions: ["Camping", "Meals", "Guide"],
    exclusions: ["Personal expenses", "Transport"],
    discounts: [],
    availability: [],
    rating: 5,
    ratingCount: 165,
    isActive: true,
    bookingsCount: 42,
    maxGroupSize: 20,
    difficulty: "Easy",
    highlights: ["Grassland meadows", "Easy trails", "Nature photography"],
    itinerary: []
  },
  {
    title: "Nag Tibba Weekend Trek",
    description: "Perfect weekend getaway with amazing views and easy trekking trails.",
    category: "Adventure",
    location: { city: "Pantwari", country: "India" },
    durationDays: 2,
    basePrice: 2100,
    images: [],
    inclusions: ["Camping", "Meals", "Guide"],
    exclusions: ["Personal expenses", "Transport"],
    discounts: [],
    availability: [],
    rating: 4,
    ratingCount: 92,
    isActive: true,
    bookingsCount: 18,
    maxGroupSize: 25,
    difficulty: "Easy",
    highlights: ["Weekend getaway", "Summit views", "Easy trek"],
    itinerary: []
  }
];

async function seedPackages() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing packages
    await Package.deleteMany({});
    console.log('Cleared existing packages');

    // Insert sample packages
    const packages = await Package.insertMany(samplePackages);
    console.log(`Inserted ${packages.length} sample packages`);

    console.log('Sample packages added successfully!');
    console.log('Package IDs:');
    packages.forEach(pkg => console.log(`- ${pkg.title}: ${pkg._id}`));

  } catch (error) {
    console.error('Error seeding packages:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

seedPackages();
