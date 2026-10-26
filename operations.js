import Booking from "./models/Booking.js";
import Attendee from "./models/Attendee.js";

// ---- TASK 2: create a booking ----
// createBooking(data) — data is { attendeeId, status, total, items }.
// Create and return the saved booking document.
//   e.g. return Booking.create(data);
export async function createBooking(data) {
  // TODO
}

// ---- TASK 2: read bookings, newest first, with an optional filter ----
// getBookings(filter) — return all bookings matching `filter` (or all if none),
// sorted by createdAt descending.
//   e.g. return Booking.find(filter).sort({ createdAt: -1 });
export async function getBookings(filter = {}) {
  // TODO
}

// ---- TASK 3: revenue per ticket tier (confirmed bookings only) ----
// revenueByCategory() — using an aggregation pipeline, for CONFIRMED bookings only,
// return total revenue per ticket tier (category), highest revenue first.
// A line item's revenue is price * qty.
// Return shape (one row per tier):  [ { _id: "vip", revenue: 8000 }, ... ]
//
// Stages you will need:
//   $match { status: "confirmed" }
//   $unwind "$items"
//   $group  { _id: "$items.category", revenue: { $sum: { $multiply: ["$items.price", "$items.qty"] } } }
//   $sort   { revenue: -1 }
export async function revenueByCategory() {
  // TODO
}

// ---- TASK 4: bookings per attendee via a join ----
// attendeeBookingCounts() — starting from the attendees collection, join each attendee
// to their bookings with $lookup, flatten with $unwind, and count bookings per attendee.
// Return one row per attendee, most bookings first.
// Return shape:  [ { _id: <attendeeId>, name: "Diya", bookings: 3 }, ... ]
//
// Stages you will need:
//   $lookup { from: "bookings", localField: "_id", foreignField: "attendeeId", as: "bookings" }
//   $unwind "$bookings"
//   $group  { _id: "$_id", name: { $first: "$name" }, bookings: { $sum: 1 } }
//   $sort   { bookings: -1 }
export async function attendeeBookingCounts() {
  // TODO
}
