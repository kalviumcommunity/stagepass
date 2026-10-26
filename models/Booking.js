import mongoose from "mongoose";

// ---- TASK 1: define ticketSchema (embedded subdocument) ----
// Fields:
//   - name     (String, required)   e.g. "RockFest Main Stage"
//   - category (String, required)   the ticket tier: "vip" | "general" | "balcony"
//   - price    (Number, required, min 0)
//   - qty      (Number, required, min 1)
//
// const ticketSchema = new mongoose.Schema({ ... });

// ---- TASK 1: define bookingSchema ----
// Fields:
//   - attendeeId (ObjectId, ref "Attendee", required)
//   - status     (String, enum ["pending", "confirmed", "cancelled", "refunded"], default "pending")
//   - total      (Number, required, min 0)
//   - items      (array of ticketSchema — embedded)
//   - createdAt  (Date, default Date.now)
//
// const bookingSchema = new mongoose.Schema({ ... });

// ---- TASK 5: add a compound index for the hot "an attendee's bookings, newest first" query ----
// bookingSchema.index({ attendeeId: 1, createdAt: -1 });

// ---- TASK 1: compile and export the model ----
// const Booking = mongoose.model("Booking", bookingSchema);
// export default Booking;

export default null; // TODO: replace with the compiled Booking model
