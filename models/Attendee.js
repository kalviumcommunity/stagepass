import mongoose from "mongoose";

// This model is already done for you — do not change it.
const attendeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  city: { type: String },
});

const Attendee = mongoose.model("Attendee", attendeeSchema);
export default Attendee;
