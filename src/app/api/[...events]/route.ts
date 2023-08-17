import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/utils/dbConnect";
import Event from '../../models/event';

connectDB();

export async function GET(req: NextRequest) {
    try {
        const eventID = req.nextUrl.pathname.split('/').pop();
        const event = await Event.findOne({ event_id: eventID }).exec();

        if (!event) {
            return NextResponse.json({ message: "Event not found" }, { status: 404 });
        }

        return NextResponse.json(event);
    } catch (error) {
        console.error("Error fetching event:", error);
        return NextResponse.json({ message: "Error fetching event" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const requestBody = await req.json();

        if (!requestBody) {
            return NextResponse.json({ message: "This is empty, YEET!" }, { status: 400 });
        }
        try {
            await Event.create(requestBody);
            console.log("Event created successfully");
            return NextResponse.json({ message: "Event created" }, { status: 201 });
        } catch (error) {
            console.error("Error creating event:", error);
            return NextResponse.json({ message: "Error creating event" }, { status: 500 });
        }
    } catch (jsonError) {
        console.error("Error parsing JSON:", jsonError);
        return NextResponse.json({ message: "Error parsing JSON" }, { status: 400 });
    }
}

export async function PUT(req: NextRequest) {
    const eventID = req.nextUrl.pathname.split('/').pop();

    if (!eventID) {
        return { status: 400, text: 'Missing event ID' };
    }

    const volunteer = await req.json();

    if (!volunteer) {
        return { status: 400, text: 'Missing volunteer information' };
    }

    try {

        const result = await Event.findOneAndUpdate(
            { event_id: eventID },
            { $push: { volunteers: volunteer } },
            { new: true }
        );
        if (!result) {
            return { status: 404, text: 'Event not found' };
        }

        return { status: 204 };
    } catch (error) {
        return { status: 500, text: 'Internal Server Error' };
    }
}

export async function DELETE(req: NextRequest) {
    const eventID = req.nextUrl.pathname.split('/').pop();

    if (!eventID) {
        return { status: 400, text: 'Missing event ID' };
    }

    try {
        const result = await Event.findOneAndDelete({ event_id: eventID });
        if (!result) {
            return { status: 404, text: 'Event not found' };
        }

        return { status: 204 };
    } catch (error) {
        console.error("Error deleting event:", error);
        return { status: 500, text: 'Internal Server Error' };
    }
}
