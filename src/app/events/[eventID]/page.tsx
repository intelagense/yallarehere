"use client"
import React, { useState } from "react";

interface EventData {
  event_name: string;
  start_time: string;
  end_time: string;
  event_description: string;
}

export default function Event({ params }: { params: { eventID: string } }) {
  const [eventData, setEventData] = useState<EventData | null>(null);

  async function fetchData() {
    try {
      const res = await fetch(
        `${process.env.DOMAIN}/api/events/${params.eventID}`
      );
      if (res.ok) {
        const data = await res.json();
        setEventData(data);
      } else {
        setEventData(null);
      }
    } catch (error) {
      setEventData(null);
    }
  }

  if (eventData === null) {
    fetchData();
    return (
      <>
        <h1 className="text-center">Event not found</h1>
        <p className="text-center">Check the URL</p>
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
