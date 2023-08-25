"use client"
import React, { useState, useEffect } from "react";
import { fetchEventData } from "@/app/utils/api";
interface EventData {
  event_name: string;
  start_time: string;
  end_time: string;
  event_description: string;
  volunteers: {
    name: "name",
    email: "email",
    phone: "phone"
  }
}

export default function Event({ params }: { params: { eventID: string } }) {
  const [eventData, setEventData] = useState<EventData | null>(null);

  async function fetchData() {
    try {
      const data = await fetchEventData(params.eventID);
      setEventData(data);
    } catch (error) {
      setEventData(null);
    }
  }

  useEffect(() => {
    fetchData();
  },);

  if (eventData === null) {
    return (
      <>
        <h1 className="text-center">Event loading or</h1>
        <p className="text-center">Event not found</p>
      </>
    );
  }

  const startTime = new Date(eventData.start_time);
  const endTime = new Date(eventData.end_time);
  const formattedStartTime = startTime.toLocaleString();
  const formattedEndTime = endTime.toLocaleString();

  return (
    <div className="text-center">
      <h1>{eventData.event_name}</h1>
      <h2>
        {formattedStartTime} - {formattedEndTime}
      </h2>
      <div className="flex justify-center">
        <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center">
          <p className="text-white">Let me in</p>
        </div>
      </div>
      <p>Tap the button and we will let you in</p>
      <p>{eventData.event_description}</p>
    </div>
  );
}
