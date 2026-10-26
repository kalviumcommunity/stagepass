import mongoose from "mongoose";
import { connectDB } from "./db.js";
import Attendee from "./models/Attendee.js";
import Booking from "./models/Booking.js";

const ATTENDEES = [
  { name: "Diya", email: "diya@example.com", city: "Chennai" },
  { name: "Esha", email: "esha@example.com", city: "Hyderabad" },
  { name: "Farhan", email: "farhan@example.com", city: "Kolkata" },
];

async function seed() {
  await connectDB();
  await Booking.deleteMany({});
  await Attendee.deleteMany({});

  const [diya, esha, farhan] = await Attendee.insertMany(ATTENDEES);

  await Booking.insertMany([
    // confirmed (count as real sales)
    { attendeeId: diya._id, status: "confirmed", total: 6000, createdAt: new Date("2026-01-10"),
      items: [{ name: "RockFest Main Stage", category: "vip", price: 3000, qty: 2 }] },
    { attendeeId: diya._id, status: "confirmed", total: 900, createdAt: new Date("2026-02-12"),
      items: [{ name: "Jazz Night Balcony", category: "balcony", price: 300, qty: 3 }] },
    { attendeeId: esha._id, status: "confirmed", total: 1000, createdAt: new Date("2026-02-20"),
      items: [{ name: "Comedy Night Floor", category: "general", price: 500, qty: 2 }] },
    { attendeeId: esha._id, status: "confirmed", total: 2000, createdAt: new Date("2026-03-05"),
      items: [{ name: "Symphony Front Row", category: "vip", price: 2000, qty: 1 }] },
    { attendeeId: farhan._id, status: "confirmed", total: 1500, createdAt: new Date("2026-03-18"),
      items: [{ name: "Indie Gig Floor", category: "general", price: 500, qty: 3 }] },
    // not confirmed (excluded from revenue)
    { attendeeId: diya._id, status: "cancelled", total: 5000, createdAt: new Date("2026-03-22"),
      items: [{ name: "Gala VIP", category: "vip", price: 5000, qty: 1 }] },
    { attendeeId: esha._id, status: "pending", total: 400, createdAt: new Date("2026-03-25"),
      items: [{ name: "Open Mic Floor", category: "general", price: 400, qty: 1 }] },
    { attendeeId: farhan._id, status: "refunded", total: 400, createdAt: new Date("2026-03-28"),
      items: [{ name: "Matinee Balcony", category: "balcony", price: 200, qty: 2 }] },
  ]);

  console.log("✓ Seeded 3 attendees and 8 bookings");
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error("✗ Seed failed:", error.message);
  process.exit(1);
});
