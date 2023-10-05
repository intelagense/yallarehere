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

async function fetchData(eventID: string, setEventData: React.Dispatch<React.SetStateAction<EventData | null>>) {
  try {
    const data = await fetchEventData(eventID);
    setEventData(data);
  } catch (error) {
    setEventData(null);
  }
}

export default function Event({ params }: { params: { eventID: string } }) {
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [note, setNote] = useState("Sending message...");

  async function sendSMS() {
    setButtonClicked(true);
    try {
      const res = await fetch(
        `${process.env.DOMAIN}/api/twilio`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (res.ok) {
        const data = await res.json();
        setNote("Someone is on the way!")
        return data;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }

  useEffect(() => {
    fetchData(params.eventID, setEventData); // Call fetchData directly here
  }, [params.eventID, setEventData]);

  if (eventData === null) {
    return (
      <div>
        <h1 className="text-center">Event loading or</h1>
        <p className="text-center">Event not found?</p>
      </div>
    );
  }

  return (
    <div className="h-5/6 text-center flex flex-col justify-around">
      <div>
        <div>
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">{eventData.event_name}</h1>
          <p className="text-2xl text-gray-900 dark:text-white">
            {eventData?.start_time && eventData?.end_time ? (
              `${new Date(eventData?.start_time).toLocaleDateString()}`
            ) : (
              ''
            )}
          </p>
        </div>
        {/* <p className="text-4xl text-gray-900">
          {eventData?.start_time && eventData?.end_time ? (
            `${new Date(eventData?.start_time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} - ${new Date(eventData?.end_time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`
          ) : (
            ''
          )}
        </p> */}
      </div>
      <div>
        <h3 className="text-2xl font-bold mb-4">Locked Out?</h3>
        <div className="flex justify-center">
          {buttonClicked ? (
            <p className="inline-block h-40 text-2xl text-green-600 dark:text-green-300 font-semibold">{note}</p>
          ) : (
            <button onClick={sendSMS} className="text-xl w-40 h-40 rounded-full bg-gradient-to-br from-red-500 to-red-800 drop-shadow-md flex items-center justify-center" type="button">
              <p className="text-white text-2xl font-bold">Let me in!</p>
            </button>
          )}

        </div>
        <p className="text-2xl mt-3">Tap the button and we&apos;ll let you in soon.</p>
      </div>
      <p>{eventData.event_description}</p>
    </div>
  );
}
