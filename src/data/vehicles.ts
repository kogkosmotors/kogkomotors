import porscheImg from "@/assets/cars/porsche.jpg.asset.json";
import mercedesImg from "@/assets/cars/mercedes.jpg.asset.json";
import bmwImg from "@/assets/cars/bmw.jpg.asset.json";
import rangeImg from "@/assets/cars/range.jpg.asset.json";
import audiImg from "@/assets/cars/audi.jpg.asset.json";
import bentleyImg from "@/assets/cars/bentley.jpg.asset.json";
import { assetUrl } from "@/lib/image-urls";

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  price: number;
  fuel: string;
  transmission: string;
  drive: string;
  engine: string;
  horsepower: number;
  bodyType: string;
  exteriorColor: string;
  interiorColor: string;
  vin: string;
  description: string;
  features: string[];
  gallery: string[];
  mainImage: string;
  fallbackImage?: string;
  available: boolean;
  featured: boolean;
  location: string;
}

const img = (a: { url: string }) => assetUrl(a.url);

export const vehicles: Vehicle[] = [
  {
    id: "porsche-911-turbo-s-2023",
    make: "Porsche",
    model: "911 Turbo S",
    year: 2023,
    mileage: 8200,
    price: 248000,
    fuel: "Petrol",
    transmission: "Automatic",
    drive: "AWD",
    engine: "3.8L Twin-Turbo Flat-6",
    horsepower: 640,
    bodyType: "Coupe",
    exteriorColor: "GT Silver Metallic",
    interiorColor: "Bordeaux Red Leather",
    vin: "WP0AD2A99PS123456",
    description:
      "An uncompromising icon of performance engineering. This 911 Turbo S pairs ferocious acceleration with everyday refinement, finished in GT Silver over a hand-stitched Bordeaux interior.",
    features: ["Sport Chrono Package", "Carbon Ceramic Brakes", "Burmester Audio", "Adaptive Cruise", "Sport Exhaust", "18-Way Sport Seats"],
    gallery: [img(porscheImg)],
    mainImage: img(porscheImg),
    available: true,
    featured: true,
    location: "Nicosia",
  },
  {
    id: "mercedes-maybach-s680-2023",
    make: "Mercedes-Benz",
    model: "Maybach S680",
    year: 2023,
    mileage: 5400,
    price: 312000,
    fuel: "Petrol",
    transmission: "Automatic",
    drive: "AWD",
    engine: "6.0L V12 Biturbo",
    horsepower: 621,
    bodyType: "Sedan",
    exteriorColor: "Obsidian Black",
    interiorColor: "Macchiato Nappa",
    vin: "W1K6X7GB0PA123456",
    description:
      "The pinnacle of chauffeur-driven luxury. The Maybach S680 envelops occupants in serene comfort with executive rear seating, champagne flutes, and a whisper-quiet V12.",
    features: ["Executive Rear Seats", "Burmester 4D Sound", "Rear Entertainment", "Massage Seats", "Soft-Close Doors", "Magic Body Control"],
    gallery: [img(mercedesImg)],
    mainImage: img(mercedesImg),
    available: true,
    featured: true,
    location: "Nicosia",
  },
  {
    id: "bmw-m8-competition-2022",
    make: "BMW",
    model: "M8 Competition",
    year: 2022,
    mileage: 14500,
    price: 158000,
    fuel: "Petrol",
    transmission: "Automatic",
    drive: "AWD",
    engine: "4.4L Twin-Turbo V8",
    horsepower: 625,
    bodyType: "Coupe",
    exteriorColor: "Marina Bay Blue",
    interiorColor: "Silverstone Merino",
    vin: "WBSGV0C09NCG12345",
    description:
      "A grand tourer with a motorsport soul. The M8 Competition delivers immense power with effortless composure across every road.",
    features: ["M Carbon Roof", "Bowers & Wilkins", "Laser Headlights", "M Driver's Package", "Head-Up Display", "Heated Seats"],
    gallery: [img(bmwImg)],
    mainImage: img(bmwImg),
    available: true,
    featured: true,
    location: "Limassol",
  },
  {
    id: "range-rover-autobiography-2023",
    make: "Land Rover",
    model: "Range Rover Autobiography",
    year: 2023,
    mileage: 11200,
    price: 192000,
    fuel: "Diesel",
    transmission: "Automatic",
    drive: "AWD",
    engine: "3.0L Inline-6 Diesel",
    horsepower: 350,
    bodyType: "SUV",
    exteriorColor: "Santorini Black",
    interiorColor: "Caraway / Ebony",
    vin: "SALGA2BU0PA123456",
    description:
      "Commanding presence with first-class comfort. The Autobiography redefines the luxury SUV with serene refinement and effortless capability.",
    features: ["Executive Class Rear", "Meridian Signature Audio", "Cabin Air Purification", "Massage Seats", "Panoramic Roof", "Air Suspension"],
    gallery: [img(rangeImg)],
    mainImage: img(rangeImg),
    available: true,
    featured: false,
    location: "Nicosia",
  },
  {
    id: "audi-rs7-sportback-2022",
    make: "Audi",
    model: "RS7 Sportback",
    year: 2022,
    mileage: 17800,
    price: 134000,
    fuel: "Petrol",
    transmission: "Automatic",
    drive: "AWD",
    engine: "4.0L Twin-Turbo V8",
    horsepower: 600,
    bodyType: "Sportback",
    exteriorColor: "Nardo Grey",
    interiorColor: "Black Valcona",
    vin: "WUA1CBF20NN123456",
    description:
      "A four-door supercar with breathtaking design. The RS7 Sportback fuses everyday usability with relentless performance.",
    features: ["Dynamic Ride Control", "Bang & Olufsen 3D", "Matrix LED", "RS Sport Exhaust", "Carbon Inlays", "Virtual Cockpit"],
    gallery: [img(audiImg)],
    mainImage: img(audiImg),
    available: true,
    featured: false,
    location: "Larnaca",
  },
  {
    id: "bentley-continental-gt-2023",
    make: "Bentley",
    model: "Continental GT",
    year: 2023,
    mileage: 6300,
    price: 295000,
    fuel: "Petrol",
    transmission: "Automatic",
    drive: "AWD",
    engine: "6.0L W12 Twin-Turbo",
    horsepower: 650,
    bodyType: "Coupe",
    exteriorColor: "Glacier White",
    interiorColor: "Cumbrian Green Hide",
    vin: "SCBCG2ZG0PC123456",
    description:
      "The definitive grand tourer. Hand-crafted in Crewe, the Continental GT marries artisanal luxury with monumental performance.",
    features: ["Rotating Display", "Naim for Bentley", "Diamond Knurling", "Active All-Wheel Drive", "Mood Lighting", "Heated & Cooled Seats"],
    gallery: [img(bentleyImg)],
    mainImage: img(bentleyImg),
    available: true,
    featured: true,
    location: "Nicosia",
  },
];

export const brands = Array.from(new Set(vehicles.map((v) => v.make))).sort();
export const bodyTypes = Array.from(new Set(vehicles.map((v) => v.bodyType))).sort();
export const fuelTypes = Array.from(new Set(vehicles.map((v) => v.fuel))).sort();
export const transmissions = Array.from(new Set(vehicles.map((v) => v.transmission))).sort();

export const getVehicle = (id: string) => vehicles.find((v) => v.id === id);
export const getRelated = (v: Vehicle) =>
  vehicles.filter((x) => x.id !== v.id && (x.make === v.make || x.bodyType === v.bodyType)).slice(0, 3);

export const formatPrice = (n: number) => `€${n.toLocaleString("en-US")}`;
export const formatMileage = (n: number) => `${n.toLocaleString("en-US")} km`;
