export interface TourPackage {
  id: string;
  title: string;
  category: 'tirupati' | 'temple' | 'weekend' | 'outstation';
  duration: string;
  priceSedan: number;
  priceSUV: number;
  priceInnova: number;
  priceTempo: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  popular?: boolean;
  tagline: string;
  pickupInfo: string;
  highlightPoints: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: {
    time: string;
    activity: string;
    details: string;
  }[];
}

export interface Vehicle {
  id: string;
  name: string;
  category: string;
  capacity: string;
  luggage: string;
  acType: string;
  fuelType: string;
  baseRatePerKm: number;
  tirupatiPackageRate: number;
  imageUrl: string;
  features: string[];
  idealFor: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  tourTaken: string;
  rating: number;
  review: string;
  date: string;
  verified: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'tirupati' | 'booking' | 'fleet' | 'payment';
}

export { createWhatsAppLink, openWhatsApp } from '../utils/whatsapp';

export const PHONE_PRIMARY = "+91 95852 62522";
export const PHONE_SECONDARY = "+91 98403 76210";
export const PHONE_PRIMARY_RAW = "919585262522";
export const WHATSAPP_NUMBER = "919585262522";
export const OFFICE_ADDRESS = "No. 42/1, North Usman Road, Near Panagal Park, T. Nagar, Chennai - 600017, Tamil Nadu";
export const SECONDARY_OFFICE = "Koyambedu CMBT Hub & Chennai Airport Kiosk, GST Road, Meenambakkam, Chennai - 600027";

export const CHENNAI_PICKUP_ZONES = [
  "T. Nagar / Kodambakkam / Nungambakkam",
  "Anna Nagar / Kilpauk / Mogappair",
  "Velachery / Adyar / Thiruvanmiyur",
  "OMR IT Corridor (Perungudi to Siruseri)",
  "Tambaram / Chromepet / Pallavaram",
  "Porur / Iyyappanthangal / Kattupakkam",
  "Chennai Central / Egmore Station Hub",
  "Chennai International Airport (MAA)",
  "Koyambedu / CMBT / Vadapalani"
];

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: "tirupati-1day-vip",
    title: "Chennai to Tirupati 1-Day VIP Package",
    category: "tirupati",
    popular: true,
    duration: "Same Day (16 Hours)",
    priceSedan: 5999,
    priceSUV: 7499,
    priceInnova: 8999,
    priceTempo: 13999,
    originalPrice: 6999,
    rating: 4.9,
    reviewsCount: 1420,
    imageUrl: "https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?q=80&w=800&auto=format&fit=crop",
    tagline: "Most Booked: Doorstep Chennai pickup, breakfast, lunch, ₹300 VIP Special Entry Darshan & 2 Laddus included",
    pickupInfo: "Doorstep pickup anywhere in Chennai between 04:30 AM – 05:30 AM",
    highlightPoints: [
      "Doorstep pickup & drop anywhere across Chennai",
      "Special Entry ₹300 VIP Darshan ticket assistance",
      "Padmavathi Ammavari Temple (Tiruchanur) Darshan included",
      "Delicious South Indian Veg Breakfast & Lunch",
      "Ghat road trained driver with hill driving permit",
      "2 Complimentary Tirupati Tirumala Devasthanam Laddus per person"
    ],
    inclusions: [
      "AC Vehicle with experienced driver from Chennai",
      "All Interstate Andhra Border permits & road taxes",
      "All Highway Toll charges (Chennai - Tirupati toll plaza)",
      "Tirumala parking & driver beta allowance",
      "Morning pure vegetarian breakfast & authentic lunch",
      "Tonsure (Mottai) & Thulabharam coordination assistance"
    ],
    exclusions: [
      "Personal expenses (additional seva, tonsure token charges)",
      "Additional laddus beyond package quota",
      "Any hotel accommodation (Day return tour)"
    ],
    itinerary: [
      { time: "05:00 AM", activity: "Doorstep Pickup in Chennai", details: "Driver arrives at your doorstep in Chennai (AC Cab sanitized and fuel topped)." },
      { time: "07:30 AM", activity: "Traditional Breakfast Halt", details: "En-route breakfast at clean, hygienic pure veg restaurant near Tiruttani / Nagari." },
      { time: "08:45 AM", activity: "Arrival at Tirupati & Alipiri", details: "Security check at Alipiri Checkpost. Drive up the scenic 7-hills ghat road." },
      { time: "10:30 AM", activity: "VIP Darshan of Lord Venkateswara", details: "Driver guides you directly to the ₹300 Special Entry line near ATC Car Parking." },
      { time: "01:30 PM", activity: "Laddu Prasadam & Downhill Drive", details: "Collect sacred Tirupati Laddus, board the cab, and drive down to Tirupati town." },
      { time: "02:30 PM", activity: "South Indian Vegetarian Thali Lunch", details: "Relax and enjoy an authentic vegetarian lunch in Tirupati town." },
      { time: "03:45 PM", activity: "Tiruchanur Padmavathi Temple", details: "Seek divine blessings of Goddess Padmavathi Devi (essential to complete pilgrimage)." },
      { time: "05:15 PM", activity: "Departure towards Chennai", details: "Smooth return journey via Tirupati-Chennai highway." },
      { time: "09:30 PM", activity: "Doorstep Drop in Chennai", details: "Safe drop-off right at your home or hotel in Chennai." }
    ]
  },
  {
    id: "tirupati-kalahasti-2day",
    title: "Chennai to Tirupati & Srikalahasti 2-Day Pilgrimage",
    category: "tirupati",
    popular: true,
    duration: "2 Days / 1 Night",
    priceSedan: 10499,
    priceSUV: 12999,
    priceInnova: 15499,
    priceTempo: 23999,
    originalPrice: 11999,
    rating: 4.8,
    reviewsCount: 890,
    imageUrl: "https://images.unsplash.com/photo-1620766165457-a8025baa82e0?q=80&w=800&auto=format&fit=crop",
    tagline: "Relaxed spiritual tour covering Tirumala Balaji, Padmavathi Temple & Kalahasti Rahu-Ketu Sarpa Dosha Pooja",
    pickupInfo: "Doorstep pickup in Chennai at 06:00 AM on Day 1",
    highlightPoints: [
      "Lord Venkateswara VIP Darshan + Padmavathi Temple",
      "Srikalahasteeswara Temple (Vayu Lingam) & Rahu-Ketu Pooja",
      "Relaxed 1 night stay at Tirupati 3-Star AC Hotel",
      "Option to visit Kanipakam Vinayagar or Srinivasa Mangapuram",
      "Perfect for senior citizens and family devotees"
    ],
    inclusions: [
      "AC Vehicle for entire 2 days including local sightseeing",
      "Driver beta for 2 days, night halt charges",
      "All Interstate permits, toll gate fees, and parking charges",
      "Assistance for Rahu Ketu pooja ticket booking at Srikalahasti"
    ],
    exclusions: [
      "Hotel stay charges (we assist booking budget or 4-star packages)",
      "Pooja ticket fees (₹500 / ₹1500 directly payable to Kalahasti temple devasthanam)",
      "Meals unless customized meal plan is selected"
    ],
    itinerary: [
      { time: "Day 1 - 06:00 AM", activity: "Chennai to Tirupati Departure", details: "Pickup from Chennai and drive to Tirupati town." },
      { time: "Day 1 - 10:30 AM", activity: "Check-in at Hotel & Refresh", details: "Check-in at hotel, refresh, and proceed to Padmavathi Temple." },
      { time: "Day 1 - 01:00 PM", activity: "Drive to Tirumala Hills", details: "Ascend ghat road for Lord Venkateswara Darshan." },
      { time: "Day 1 - 06:00 PM", activity: "Evening Aarti & Return to Hotel", details: "Collect laddus, descend to hotel in Tirupati town for restful night." },
      { time: "Day 2 - 07:30 AM", activity: "Drive to Srikalahasti (38 km)", details: "Scenic drive through Chittoor hill valley to holy Kalahasti town." },
      { time: "Day 2 - 09:00 AM", activity: "Rahu Ketu Pooja & Vayu Linga Darshan", details: "Perform world-renowned Sarpa Dosha Pooja at historic Srikalahasteeswara." },
      { time: "Day 2 - 02:00 PM", activity: "Lunch & Optional Kanipakam Visit", details: "Proceed towards Swayambhu Varasiddhi Vinayaka Temple or return path." },
      { time: "Day 2 - 08:30 PM", activity: "Arrival Back in Chennai", details: "Safe doorstep drop-off across Chennai localities." }
    ]
  },
  {
    id: "navagraha-temple-tour",
    title: "Kumbakonam Navagraha Circuit (9 Planet Temples)",
    category: "temple",
    duration: "3 Days / 2 Nights",
    priceSedan: 17999,
    priceSUV: 21999,
    priceInnova: 26999,
    priceTempo: 39999,
    originalPrice: 19999,
    rating: 4.9,
    reviewsCount: 640,
    imageUrl: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?q=80&w=800&auto=format&fit=crop",
    tagline: "Sacred astrological pilgrimage covering all 9 Planetary Temples in Tamil Nadu with expert local driver",
    pickupInfo: "Doorstep pickup in Chennai at 05:00 AM",
    highlightPoints: [
      "All 9 Navagraha Stalam: Suryanar, Thingaloor, Vaitheeswaran, Thiruvenkadu, Alangudi, Kanjanur, Thirunallar, Thirunageswaram, Keezhperumpallam",
      "Additional visit to Thanjavur Brihadeeswarar Big Temple (UNESCO)",
      "Swamimalai Murugan Temple darshan included",
      "Route planned systematically to optimize pooja timings and rahukalam"
    ],
    inclusions: [
      "AC Vehicle from Chennai to Kumbakonam, Thanjavur & return",
      "2 Nights driver accommodation and night allowances",
      "All Tamil Nadu highway tolls and temple zone parking fees",
      "Experienced temple-circuit driver knowing exact temple opening times"
    ],
    exclusions: [
      "Hotel room booking (can be arranged at Kumbakonam upon request)",
      "Special archana and abhishekam tickets"
    ],
    itinerary: [
      { time: "Day 1", activity: "Thingaloor (Moon), Vaitheeswaran (Mars), Thiruvenkadu (Mercury)", details: "Drive from Chennai to Mayiladuthurai circuit. Evening Keezhperumpallam (Ketu)." },
      { time: "Day 2", activity: "Thirunallar (Saturn), Alangudi (Jupiter), Kanjanur (Venus), Suryanar (Sun)", details: "Early morning Thirunallar Nalan Kulam bath and darshan, followed by Guru and Sukran temples." },
      { time: "Day 3", activity: "Thirunageswaram (Rahu), Swamimalai & Thanjavur Big Temple", details: "Milk abhishekam at Rahu sthalam, visit Brihadeeswarar Temple, return to Chennai by night." }
    ]
  },
  {
    id: "mahabalipuram-pondicherry",
    title: "Chennai to Mahabalipuram & Pondicherry Heritage Tour",
    category: "weekend",
    duration: "2 Days / 1 Night (or 1-Day Express)",
    priceSedan: 6999,
    priceSUV: 8999,
    priceInnova: 11499,
    priceTempo: 17999,
    originalPrice: 7999,
    rating: 4.8,
    reviewsCount: 520,
    imageUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800&auto=format&fit=crop",
    tagline: "Picturesque East Coast Road (ECR) drive covering UNESCO monolithic sculptures, French Colony, and Auroville",
    pickupInfo: "Pickup anywhere along Chennai / ECR / Airport at 07:30 AM",
    highlightPoints: [
      "Scenic coastal East Coast Road (ECR) ocean drive",
      "Mahabalipuram Shore Temple & Arjuna's Penance",
      "Pondicherry French White Town, Promenade Beach & Rock Beach",
      "Auroville Matrimandir viewing point & Sri Aurobindo Ashram",
      "Chidiya Tapu-style coastal seaside cafes"
    ],
    inclusions: [
      "AC Cab with ECR toll charges included",
      "Driver beta and parking charges",
      "Doorstep pickup and drop in Chennai"
    ],
    exclusions: [
      "Monument entrance tickets (ASI ticket for Shore temple)",
      "Hotel stay & food expenses"
    ],
    itinerary: [
      { time: "Day 1 - 08:00 AM", activity: "Scenic ECR Drive to Mahabalipuram", details: "Stop at Kovalam beach or crocodile bank, explore Shore Temple and Pancha Rathas." },
      { time: "Day 1 - 01:30 PM", activity: "Arrival in Pondicherry & French Quarter Walk", details: "Stroll along French cobblestone streets, colourful villas, and Promenade beach." },
      { time: "Day 2 - 09:00 AM", activity: "Auroville & Matrimandir", details: "Visit experimental township, Matrimandir gardens, and organic craft boutiques." },
      { time: "Day 2 - 05:00 PM", activity: "Scenic return drive to Chennai", details: "Arrive back in Chennai by 08:30 PM." }
    ]
  },
  {
    id: "kanchipuram-vellore-golden",
    title: "Kanchipuram Temples & Sripuram Vellore Golden Temple",
    category: "temple",
    duration: "1 Day (14 Hours)",
    priceSedan: 4999,
    priceSUV: 6499,
    priceInnova: 7999,
    priceTempo: 11999,
    originalPrice: 5999,
    rating: 4.9,
    reviewsCount: 480,
    imageUrl: "https://images.unsplash.com/photo-1600100397608-f010f443b2f5?q=80&w=800&auto=format&fit=crop",
    tagline: "Sacred day tour to the City of 1,000 Temples and the awe-inspiring 1.5-tonne pure gold temple at Vellore",
    pickupInfo: "Doorstep pickup in Chennai at 06:00 AM",
    highlightPoints: [
      "Kanchipuram Kamakshi Amman Temple & Ekambareswarar Temple",
      "Varadharaja Perumal Temple (famous Athi Varadar sthalam)",
      "Authentic Kanchipuram pure silk saree weaving cooperative visit",
      "Sripuram Sri Lakshmi Narayani Golden Temple Vellore illuminated at twilight"
    ],
    inclusions: [
      "AC Vehicle, fuel, highway tolls (Chennai-Bengaluru highway)",
      "Experienced Tamil/English speaking driver",
      "Parking charges and driver beta"
    ],
    exclusions: [
      "Special pooja queues and electronic locker charges at Golden Temple",
      "Food and personal shopping"
    ],
    itinerary: [
      { time: "06:00 AM", activity: "Pickup from Chennai", details: "Drive via NH48 towards Kanchipuram (75 km)." },
      { time: "08:00 AM", activity: "Kamakshi Amman & Ekambareswarar", details: "Seek blessings at Shakthi Peedam and Prithvi Sthalam (Earth Lingam)." },
      { time: "11:30 AM", activity: "Varadharaja Perumal & Silk Saree Centre", details: "Explore historic Chola & Vijayanagara architecture and handloom weavers." },
      { time: "01:30 PM", activity: "Traditional South Indian Lunch", details: "Authentic lunch in Kanchipuram or en route to Vellore." },
      { time: "04:30 PM", activity: "Sripuram Golden Temple Vellore", details: "Walk the spiritual star-shaped path to the sparkling 1,500 kg gold sanctum." },
      { time: "07:30 PM", activity: "Return drive to Chennai", details: "Smooth highway drive reaching Chennai by 10:00 PM." }
    ]
  },
  {
    id: "tiruvannamalai-arunachala",
    title: "Chennai to Tiruvannamalai Arunachaleswarar & Girivalam",
    category: "temple",
    duration: "1 Day / Special Pournami Night",
    priceSedan: 5499,
    priceSUV: 6999,
    priceInnova: 8499,
    priceTempo: 12499,
    originalPrice: 6499,
    rating: 4.9,
    reviewsCount: 710,
    imageUrl: "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?q=80&w=800&auto=format&fit=crop",
    tagline: "Seek blessings at the divine Agni Lingam & Ramanasramam with seamless Girivalam circuit flexibility",
    pickupInfo: "Flexible departure tailored to your preferred Darshan or Pournami timing",
    highlightPoints: [
      "Historic Arunachaleswarar Temple (One of the largest in India)",
      "Sri Ramana Maharshi Ashram & Virupaksha Cave trek guidance",
      "Option for 14 km holy Girivalam barefoot walk or cab support",
      "Night halt flexibility for full-moon devotees"
    ],
    inclusions: [
      "AC cab with highway tolls and driver beta",
      "Doorstep pickup and return drop across Chennai",
      "Driver with deep familiarity of Tiruvannamalai temple regulations"
    ],
    exclusions: [
      "Special darshan ticket if opted on peak days",
      "Meals and personal refreshments"
    ],
    itinerary: [
      { time: "05:30 AM", activity: "Chennai Departure", details: "Drive through Tindivanam and Gingee towards holy Arunachala." },
      { time: "09:30 AM", activity: "Arunachaleswarar Darshan", details: "Enter the magnificent 24-acre temple complex for Agni Stalam darshan." },
      { time: "01:00 PM", activity: "Lunch & Sri Ramana Ashram", details: "Peaceful meditation at Ramana Ashram hall and serene garden surroundings." },
      { time: "04:30 PM", activity: "Girivalam Circuit / Local Temples", details: "Visit Ashtalingams along the 14km path or begin evening return." },
      { time: "09:30 PM", activity: "Safe Return to Chennai", details: "Doorstep drop in Chennai." }
    ]
  }
];

export const FLEET_VEHICLES: Vehicle[] = [
  {
    id: "sedan",
    name: "Swift Dzire / Toyota Etios",
    category: "Executive Sedan",
    capacity: "4 Passengers + 1 Driver",
    luggage: "2 Large Trolleys + 2 Hand Bags",
    acType: "Front & Rear Chilled Air Conditioning",
    fuelType: "Clean Diesel / Petrol",
    baseRatePerKm: 12,
    tirupatiPackageRate: 5999,
    imageUrl: "/images/swift-dzire.jpg",
    features: ["Fastag Enabled", "GPS Tracking", "Bottled Water & Tissues", "Mobile Charging Port", "Music System"],
    idealFor: "Couples, small families of 3-4, airport transfers & quick 1-day Tirupati VIP darshan."
  },
  {
    id: "suv-ertiga",
    name: "Maruti Ertiga / Kia Carens",
    category: "Family SUV",
    capacity: "6 Passengers + 1 Driver",
    luggage: "3 Medium Trolleys + 3 Soft Bags",
    acType: "Roof Mounted Rear AC Blower",
    fuelType: "Smooth Smart Hybrid / Diesel",
    baseRatePerKm: 16,
    tirupatiPackageRate: 7499,
    imageUrl: "/images/ertiga.jpg",
    features: ["Split Folding Rear Seats", "Spacious Legroom", "Dual Airbags", "Smooth Suspension for Hills", "USB Fast Chargers"],
    idealFor: "Medium families of 4-6 members seeking high comfort and extra luggage space at great value."
  },
  {
    id: "innova-crysta",
    name: "Toyota Innova Crysta / Hycross",
    category: "Premium Luxury MPV",
    capacity: "7 Passengers + 1 Driver",
    luggage: "4 Large Trolleys + 4 Small Bags",
    acType: "Automatic Climate Control (All 3 Rows)",
    fuelType: "Powerful 2.4L Diesel / Hybrid",
    baseRatePerKm: 19,
    tirupatiPackageRate: 8999,
    imageUrl: "/images/innova-crysta.jpg",
    features: ["Captain Recliner Seats", "Superior Ghat Road Stability", "Ultra-Silent Cabin", "Premium Leatherette Upholstery", "First Aid Kit"],
    idealFor: "Senior citizens, NRI families, and pilgrims demanding the gold standard in highway safety & ride comfort."
  },
  {
    id: "tempo-traveller",
    name: "Force Tempo Traveller (12 / 14 / 18 Seater)",
    category: "Executive Group Coach",
    capacity: "12 to 18 Passengers + Driver",
    luggage: "Dedicated Boot Space + Overhead Racks",
    acType: "Individual Overhead AC Vents per Seat",
    fuelType: "Heavy Duty Turbo Diesel",
    baseRatePerKm: 24,
    tirupatiPackageRate: 13999,
    imageUrl: "/images/tempo-traveller.jpg",
    features: ["2x1 Pushback Recliner Seats", "LED TV & Audio System", "Curtains & Ambient Mood Lights", "High Ceiling Stand-up Cabin", "Experienced Hill Driver"],
    idealFor: "Joint family pilgrimages, corporate temple trips, marriage party transport & multi-day South India tours."
  },
  {
    id: "urbania",
    name: "Force Urbania Luxury Van",
    category: "VIP Ultra-Modern Van",
    capacity: "10 to 13 Passengers + Driver",
    luggage: "Extra Spacious Rear Cargo Hub",
    acType: "German Dual Chiller In-cabin HVAC",
    fuelType: "Mercedes-derived CRDi Engine",
    baseRatePerKm: 32,
    tirupatiPackageRate: 18999,
    imageUrl: "/images/urbania.jpg",
    features: ["European Monocoque Safety", "Plush Aircraft-style Seating", "Individual Reading Lamps & USB-C", "Panaromic Tinted Windows", "Ultra-low NVH"],
    idealFor: "High-profile VIPs, foreign tourists, and exclusive spiritual gatherings."
  }
];

export interface DestinationCard {
  id: string;
  name: string;
  state: string;
  distance: string;
  driveTime: string;
  tagline: string;
  imageUrl: string;
  startingPrice: number;
  highlight: string;
  category: 'pilgrimage' | 'heritage' | 'hills';
}

export const DESTINATIONS_EXPLORE: DestinationCard[] = [
  {
    id: "tirumala",
    name: "Tirupati & Tirumala Balaji",
    state: "Andhra Pradesh",
    distance: "145 km from Chennai",
    driveTime: "3.5 hrs drive",
    tagline: "Sacred Seven Hills of Lord Venkateswara",
    imageUrl: "https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?q=80&w=800&auto=format&fit=crop",
    startingPrice: 5999,
    highlight: "VIP Darshan + 2 Laddus",
    category: "pilgrimage"
  },
  {
    id: "mahabalipuram",
    name: "Mahabalipuram Shore",
    state: "Tamil Nadu",
    distance: "55 km from Chennai",
    driveTime: "1.5 hrs drive",
    tagline: "UNESCO 7th Century Shore Temple & Pancha Rathas",
    imageUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800&auto=format&fit=crop",
    startingPrice: 2499,
    highlight: "Scenic ECR Drive",
    category: "heritage"
  },
  {
    id: "pondicherry",
    name: "Pondicherry (Puducherry)",
    state: "Union Territory",
    distance: "160 km from Chennai",
    driveTime: "3.5 hrs drive",
    tagline: "French White Town, Promenade Beach & Auroville",
    imageUrl: "https://images.unsplash.com/photo-1589793463308-658ed42e524e?q=80&w=800&auto=format&fit=crop",
    startingPrice: 4499,
    highlight: "French Heritage & Seaside",
    category: "heritage"
  },
  {
    id: "kalahasti",
    name: "Srikalahasti Temple",
    state: "Andhra Pradesh",
    distance: "115 km from Chennai",
    driveTime: "3.0 hrs drive",
    tagline: "Vayu Sthalam & Sacred Rahu-Ketu Sarpa Dosha Kshetram",
    imageUrl: "https://images.unsplash.com/photo-1620766165457-a8025baa82e0?q=80&w=800&auto=format&fit=crop",
    startingPrice: 5499,
    highlight: "Rahu Ketu Pooja",
    category: "pilgrimage"
  },
  {
    id: "thanjavur",
    name: "Thanjavur & Kumbakonam",
    state: "Tamil Nadu",
    distance: "290 km from Chennai",
    driveTime: "6.5 hrs drive",
    tagline: "Brihadeeswarar Temple (Big Temple) & 9 Navagraha Stalam",
    imageUrl: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?q=80&w=800&auto=format&fit=crop",
    startingPrice: 17999,
    highlight: "9 Planet Astrological Circuit",
    category: "pilgrimage"
  },
  {
    id: "kanchipuram",
    name: "Kanchipuram & Vellore",
    state: "Tamil Nadu",
    distance: "75 km from Chennai",
    driveTime: "2.0 hrs drive",
    tagline: "City of 1000 Temples & Sripuram 1.5-Tonne Pure Gold Temple",
    imageUrl: "https://images.unsplash.com/photo-1600100397608-f010f443b2f5?q=80&w=800&auto=format&fit=crop",
    startingPrice: 4999,
    highlight: "Kamakshi Amman & Golden Temple",
    category: "pilgrimage"
  },
  {
    id: "tiruvannamalai",
    name: "Tiruvannamalai Arunachala",
    state: "Tamil Nadu",
    distance: "195 km from Chennai",
    driveTime: "4.5 hrs drive",
    tagline: "Agni Lingam, Ramanasramam & 14 km Sacred Girivalam",
    imageUrl: "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?q=80&w=800&auto=format&fit=crop",
    startingPrice: 5499,
    highlight: "Girivalam & Agni Sthalam",
    category: "pilgrimage"
  },
  {
    id: "yelagiri",
    name: "Yelagiri Hills",
    state: "Tamil Nadu",
    distance: "230 km from Chennai",
    driveTime: "5.0 hrs drive",
    tagline: "Serene hill retreat with rose gardens & emerald lake",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop",
    startingPrice: 6999,
    highlight: "Weekend Hill Station",
    category: "hills"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "rev-1",
    name: "Dr. R. Venkatraman",
    location: "Adyar, Chennai",
    tourTaken: "Chennai to Tirupati 1-Day VIP Package",
    rating: 5,
    review: "We traveled with my 78-year-old mother. The Innova Crysta driver Mr. Murugan was exceptionally polite, arrived at 4:45 AM sharp in Adyar, and assisted us throughout the Tirumala tonsure and ₹300 queue. Breakfast and lunch were fresh. Absolute peace of mind!",
    date: "February 2026",
    verified: true
  },
  {
    id: "rev-2",
    name: "Anand & Deepa Krishnan",
    location: "Kallang, Singapore (NRI Visit)",
    tourTaken: "Tirupati & Srikalahasti 2-Day Tour",
    rating: 5,
    review: "As NRIs visiting Chennai for a 5-day holiday, Jack Tours handled our entire Tirupati and Kalahasti pooja smoothly. Transparent rates, no hidden toll demands, and spotless AC cab with working child seat hooks. Recommended to all Singapore Tamilians.",
    date: "January 2026",
    verified: true
  },
  {
    id: "rev-3",
    name: "S. Meenakshi Sundaram",
    location: "Anna Nagar West, Chennai",
    tourTaken: "Kumbakonam 9 Navagraha Temple Circuit",
    rating: 5,
    review: "Driver Suresh had phenomenal knowledge of Tamil Nadu temple pooja timings and Rahukalam rules. We completed all 9 planet temples comfortably without rushing. Outstanding driving on the delta highway roads.",
    date: "December 2025",
    verified: true
  },
  {
    id: "rev-4",
    name: "Priya Rajagopalan",
    location: "Thoraipakkam, OMR Chennai",
    tourTaken: "Mahabalipuram & Pondicherry Weekend",
    rating: 5,
    review: "Booked an Ertiga for 5 friends. Smooth ECR drive, reasonable package pricing, and zero headache. We didn't have to worry about parking in crowded Pondy French quarters because driver handled it all.",
    date: "March 2026",
    verified: true
  }
];

export const FAQ_DATA: FaqItem[] = [
  {
    id: "faq-1",
    question: "What is the mandatory dress code for Tirupati Balaji VIP Darshan?",
    answer: "Strict dress code is enforced by TTD at Tirumala. Men must wear Traditional Dhoti with Uttariyam (Angavastram) or Kurta Pyjama. Lungi, jeans, and t-shirts are strictly prohibited. Women must wear Saree, Half Saree, or Chudidar with Dupatta/Salwar Kameez. Modern western clothes are not allowed inside the sanctum line.",
    category: "tirupati"
  },
  {
    id: "faq-2",
    question: "What documents must we bring for Tirupati Darshan?",
    answer: "Every pilgrim (including children above 12 years) must carry their ORIGINAL valid Aadhaar Card. For NRI or foreign passport holders, original passport with valid Indian visa is mandatory. Photocopies or digital photos on mobile phones are NOT accepted at the biometric scanning counter.",
    category: "tirupati"
  },
  {
    id: "faq-3",
    question: "What time will the cab pick us up from Chennai?",
    answer: "For the Chennai to Tirupati 1-Day VIP Package, our driver will pick you up from your doorstep anywhere in Chennai between 04:30 AM and 05:30 AM (customizable as per your preferred darshan slot). This ensures reaching Tirumala before the morning crowd and smooth breakfast halt.",
    category: "tirupati"
  },
  {
    id: "faq-4",
    question: "Are Tolls, Interstate Andhra Tax, and Driver Beta included in the fare?",
    answer: "Yes! At Jack Tours & Travels, our package fares are 100% transparent and all-inclusive. All toll plaza charges on NH-716, Interstate Andhra Pradesh Border Road Permit Tax, Tirumala Ghat parking, and Driver Bata (food and allowance) are included in the package quote.",
    category: "booking"
  },
  {
    id: "faq-5",
    question: "Can your driver assist elderly people with Tonsure (Mottai) and Thulabharam?",
    answer: "Yes, absolutely. Our experienced drivers know Tirumala inside out. They will guide your family to the Kalyana Katta (tonsure center) for mottai, assist with tonsure tokens, guide you to locker rooms, and walk you to the ₹300 Special Entry Darshan line.",
    category: "tirupati"
  },
  {
    id: "faq-6",
    question: "How do we confirm our booking with Jack Tours & Travels?",
    answer: "You can book in under 2 minutes through WhatsApp or phone call. Simply provide your preferred date, passenger count, pickup address, and Aadhaar details for darshan coordination. A small advance confirms your reserved sanitized cab.",
    category: "booking"
  },
  {
    id: "faq-7",
    question: "Do you provide airport pickup if we land late night at Chennai Airport?",
    answer: "Yes! We provide 24/7 flight monitoring and midnight pickups right from Chennai International & Domestic Airport (MAA). You can start your Tirupati or outstation tour directly from the terminal or after a short rest.",
    category: "fleet"
  }
];

export const POPULAR_ROUTES = [
  { from: "Chennai", to: "Tirupati Balaji", distance: "145 km", duration: "3.5 hrs", price: "From ₹5,999 Pkg" },
  { from: "Chennai", to: "Srikalahasti", distance: "115 km", duration: "3.0 hrs", price: "From ₹5,499 Pkg" },
  { from: "Chennai", to: "Mahabalipuram & Pondy", distance: "160 km", duration: "3.5 hrs", price: "From ₹6,999 Pkg" },
  { from: "Chennai", to: "Kanchipuram & Vellore", distance: "140 km", duration: "3.0 hrs", price: "From ₹4,999 Pkg" },
  { from: "Chennai", to: "Tiruvannamalai", distance: "195 km", duration: "4.5 hrs", price: "From ₹5,499 Pkg" },
  { from: "Chennai", to: "Kumbakonam Navagraha", distance: "290 km", duration: "6.5 hrs", price: "From ₹17,999 (3D)" },
  { from: "Chennai", to: "Bangalore", distance: "345 km", duration: "6.0 hrs", price: "From ₹6,500 One Way" }
];
