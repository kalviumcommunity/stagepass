import mongoose from "mongoose";

// A short-lived seat hold placed while an attendee checks out.
// It should auto-delete 15 minutes after it is created.
//
// ---- TASK 5: define seatHoldSchema with a TTL index ----
// Fields:
//   - holdId    (String, required)
//   - createdAt (Date, default Date.now)  ← this is the TTL field
//
// Give createdAt a TTL index so MongoDB deletes the document 900 seconds (15 min) after it is made:
//   createdAt: { type: Date, default: Date.now, expires: 900 }
//   (equivalently: seatHoldSchema.index({ createdAt: 1 }, { expireAfterSeconds: 900 });)
//
// const seatHoldSchema = new mongoose.Schema({ ... });
// const SeatHold = mongoose.model("SeatHold", seatHoldSchema);
// export default SeatHold;

export default null; // TODO: replace with the compiled SeatHold model
