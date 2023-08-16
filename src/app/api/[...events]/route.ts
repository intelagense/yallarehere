import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/utils/dbConnect";
import Event from '../../models/event';

connectDB();

export async function GET(req: NextRequest) {
    try {
        const eventId = req.nextUrl.pathname.split('/').pop();
        const event = await Event.findOne({ event_id: eventId }).exec();

        if (!event) {
            return NextResponse.json({ message: "Event not found" }, { status: 404 });
        }

        return NextResponse.json(event);
    } catch (error) {
        console.error("Error fetching event:", error);
        return NextResponse.json({ message: "Error fetching event" }, { status: 500 });
    }
}

// Add all todos in mongo instance
export async function POST(req: NextRequest) {
    // Placeholder code
    // const body = await req.json();
    // console.log("POST REQUEST", body);

    console.log("POST REQUEST");
    return new Response('OK BUDDY')
}


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