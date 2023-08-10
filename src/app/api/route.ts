import { NextResponse } from "next/server";
import connectDB from "@/app/utils/dbConnect";
// import TodoModel from "@/models/todo";


connectDB();

// Get all todos in mongo instance
export async function GET(request: Request) {
    // const res = await TodoModel.find({});
    // return NextResponse.json({ Todos: res });
    return NextResponse.json({ message: "Gum Ball" });
}

// Add all todos in mongo instance
export async function POST(request: Request) {
    const formData = await request.json();
    console.log(formData);
    return NextResponse.json({ message: "Hello from next server" });
}
// import { connectToDB } from "@/utils/dbConnect"


// const Event = require('../models/event')

// router.get('/events/:event_id', (req, res, next) => {
//   // get specific event details
//   Event.find({}, req.params.event_id)
//     .then((data) => res.json(data))
//     .catch(next);
// });

// router.post('/events', (req, res, next) => {
//   console.log(req.body)
//   // create event
//   if (req.body) {
//     Event.create(req.body)
//       .then((data) => res.json(data))
//       .catch(next)
//   } else {
//     res.status(400).json({
//       error: 'This is empty, YEET!'
//     })
//   }
// });

// router.put('/events/:event_id', (req, res, next) => {
//   // update event to add volunteers
//   const event_id = req.params.event_id;
//   const { volunteer } = req.body;

//   Event.findOneAndUpdate(
//     { event_id },
//     { $push: { volunteers: volunteer } },
//     { new: true }
//   )
//     .then((updatedEvent) => {
//       if (!updatedEvent) {
//         return res.status(404).json({ error: 'Event not found' });
//       }
//       res.json(updatedEvent);
//     })
//     .catch(next);
// });

// router.delete('/events/:event_id', (req, res, next) => {
//   Event.findOneAndDelete(req.params.event_id)
//     .then((data) => res.json(data))
//     .catch(next);
// });

// module.exports = router;