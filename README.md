# StagePass — A MongoDB + Mongoose Analytics API

A small Node.js + Mongoose project for an event-ticketing platform's bookings. The database
connection, seed data, and test script are already wired up. Your job is to **define the
schemas**, **implement the data operations**, and **add two production indexes**, then prove
everything works by running the test script.

You edit three files: `models/Booking.js`, `models/SeatHold.js`, and `operations.js`.
(`models/Attendee.js` is already complete — leave it alone.) Every place you need to fill in
is marked with a `TODO` comment.

> Do not change `db.js`, `seed.js`, `test.js`, or `models/Attendee.js`. Do not rename files.

## Setup & run
```bash
npm install
cp .env.example .env      # set MONGODB_URI (Atlas or local MongoDB)
npm run seed              # inserts 3 attendees + 8 bookings (needs your Booking schema)
npm run test              # runs your operations + checks your indexes end to end
```

## What you edit
- `models/Booking.js` — embedded `ticketSchema` + `bookingSchema` + the compound index (Tasks 1 & 5)
- `models/SeatHold.js` — `seatHoldSchema` with a TTL index (Task 5)
- `operations.js` — `createBooking`, `getBookings`, `revenueByCategory`, `attendeeBookingCounts` (Tasks 2–4)
