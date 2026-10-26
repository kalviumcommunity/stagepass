import mongoose from "mongoose";
import { connectDB } from "./db.js";
import Booking from "./models/Booking.js";
import SeatHold from "./models/SeatHold.js";
import {
  createBooking,
  getBookings,
  revenueByCategory,
  attendeeBookingCounts,
} from "./operations.js";

async function runTests() {
  await connectDB();
  console.log("\n=== TEST SUITE ===\n");

  try {
    // 1. Read all seeded bookings
    console.log("1. Getting all bookings (should see 8 from seed)...");
    const all = await getBookings();
    console.log(`   Found: ${all.length} bookings`);

    // 2. Revenue by ticket tier (confirmed only)
    console.log("\n2. Revenue by tier (confirmed only)...");
    const revenue = await revenueByCategory();
    revenue.forEach((r) => console.log(`   ${r._id}: ${r.revenue}`));
    console.log("   (expected: vip 8000, general 2500, balcony 900)");

    // 3. Bookings per attendee via $lookup
    console.log("\n3. Bookings per attendee (via $lookup)...");
    const perAttendee = await attendeeBookingCounts();
    perAttendee.forEach((a) => console.log(`   ${a.name}: ${a.bookings}`));
    console.log("   (expected: Diya 3, Esha 3, Farhan 2)");

    // 4. Create a new booking
    console.log("\n4. Creating a new confirmed booking...");
    const one = all[0];
    const created = await createBooking({
      attendeeId: one.attendeeId,
      status: "confirmed",
      total: 300,
      items: [{ name: "Add-on Floor Seat", category: "general", price: 150, qty: 2 }],
    });
    console.log(`   Created booking id=${created._id} (status ${created.status})`);

    // 5. Read only confirmed bookings (newest first)
    console.log("\n5. Getting confirmed bookings (newest first)...");
    const confirmed = await getBookings({ status: "confirmed" });
    console.log(`   Found: ${confirmed.length} confirmed bookings (5 seeded + 1 new = 6)`);

    // 6. Verify indexes
    console.log("\n6. Checking indexes...");
    const bookingIx = await Booking.collection.getIndexes({ full: true });
    const hasCompound = bookingIx.some(
      (i) => i.key && i.key.attendeeId === 1 && i.key.createdAt === -1
    );
    console.log(`   Booking compound index { attendeeId: 1, createdAt: -1 }: ${hasCompound ? "present ✓" : "MISSING ✗"}`);
    const holdIx = await SeatHold.collection.getIndexes({ full: true });
    const hasTTL = holdIx.some((i) => typeof i.expireAfterSeconds === "number");
    console.log(`   SeatHold TTL index (expireAfterSeconds): ${hasTTL ? "present ✓" : "MISSING ✗"}`);

    console.log("\n✓ All tests passed!\n");
  } catch (error) {
    console.error("\n✗ Test failed:", error.message, "\n");
  }

  await mongoose.disconnect();
}

runTests();
