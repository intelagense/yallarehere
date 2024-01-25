'use client'
import React, { useState, useEffect, useCallback } from "react"
import { QRCodeSVG } from "qrcode.react"
import { fetchEventData } from "@/app/utils/api";

interface EventData {
  _id: string;
  event_name: string;
  start_time: string;
  end_time: string;
  event_description: string;
  volunteers: Volunteer[];
}

interface Volunteer {
  _id: string;
  name: string;
  email: string;
  phone: string;
}


async function fetchData(eventID: string, setEventData: React.Dispatch<React.SetStateAction<EventData | null>>) {
  try {
    const data = await fetchEventData(eventID);
    setEventData(data);
  } catch (error) {
    setEventData(null);
  }
}

export default function Edit({ params }: { params: { eventID: string } }) {

  const [eventData, setEventData] = useState<EventData | null>(null);

  useEffect(() => {
    fetchData(params.eventID, setEventData); // Call fetchData directly here
  }, [params.eventID, setEventData]);

  const createEvent = async () => {
    const eventName = (document.querySelector("#event_name") as HTMLInputElement)?.value;
    const startTime = (document.querySelector("#start_time") as HTMLInputElement)?.value;
    const endTime = (document.querySelector("#end_time") as HTMLInputElement)?.value;
    const eventDescription = (document.querySelector("#event_description") as HTMLInputElement)?.value;

    const formData = {
      event_id: params.eventID,
      event_name: eventName,
      start_time: startTime,
      end_time: endTime,
      event_description: eventDescription
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    };

    try {
      const response = await fetch(`/api/events/${params.eventID}`, requestOptions);
      const responseData = await response.json();
      // TODO went well stuff
      fetchData(params.eventID, setEventData)
    } catch (error) {
      // TODO error stuff
    }
  };

  const addVolunteers = async () => {
    const name = (document.querySelector("#name") as HTMLInputElement)?.value;
    const email = (document.querySelector("#email") as HTMLInputElement)?.value;
    const phone = (document.querySelector("#phone") as HTMLInputElement)?.value;

    const formData = {
      name: name,
      email: email,
      phone: phone,
    };

    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    };

    try {
      const response = await fetch(`/api/events/${params.eventID}`, requestOptions);
      console.log("it worked... but this was your response", response.status)
      fetchData(params.eventID, setEventData)
    } catch (error) {
      console.log("error", error)
    }
  }

  return (
    <>
      <section className="bg-blue-300">
        <form>
          <div className="grid gap-6 mx-2.5 pb-6 md:grid-cols-3">
            <div className="col-span-2 md:col-span-2">
              <h2>Create or Edit Event</h2>
              <div>
                <label htmlFor="event_name" className="block mb-2 text-sm font-medium text-gray-900 ">Event Name</label>
                <input type="text" id="event_name" className="w-96 border-black border-2 p-2.5 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#FFA6F6] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] rounded-md" placeholder="My Event" required />
              </div>
              <div>
                <label htmlFor="start_time" className="block mb-2 text-sm font-medium text-gray-900 ">Start Time</label>
                <input type="datetime-local" id="start_time" className="w-96 border-black border-2 p-2.5 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#FFA6F6] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] rounded-md" required />
              </div>
              <div>
                <label htmlFor="end_time" className="block mb-2 text-sm font-medium text-gray-900 ">End Time</label>
                <input type="datetime-local" id="end_time" className="w-96 border-black border-2 p-2.5 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#FFA6F6] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] rounded-md" required />
              </div>
              <div>
                <label htmlFor="event_description" className="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                <textarea id="event_description" rows={4 as number} className="w-96 border-black border-2 p-2.5 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#FFA6F6] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] rounded-md" placeholder="Write a short description or any additional info here..."></textarea>
              </div>
              <button onClick={createEvent} type="button" className="h-12 border-black border-2 p-2.5 bg-[#A6FAFF] hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF] rounded-md">Create Event</button>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h2 className="mb-4 text-lg font-semibold">Preview</h2>
              <div className="text-center h-96 bg-white">
                <section className="pb-4 border-b border-gray-300">
                  <h2 className="text-xl font-semibold">{eventData?.event_name}</h2>
                  <p className="mt-2 text-gray-600">
                    {eventData?.start_time && eventData?.end_time ? (
                      `${new Date(eventData?.start_time).toLocaleDateString()} ${new Date(eventData?.start_time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} - ${new Date(eventData?.end_time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`
                    ) : (
                      ''
                    )}
                  </p>
                  <p className="mt-2">{eventData?.event_description}</p>
                </section>
                <section className="pt-4">
                  <div className="flex flex-col items-center justify-center">
                    <h3>Locked out?</h3>
                    <p></p>
                    <QRCodeSVG className='mt-2 flex content-center' value={`${process.env.DOMAIN}/events/${params.eventID}`} size={96} includeMargin={false} />
                    <p className="mt-2">Use QR Code</p>
                    <p>or visit {process.env.DOMAIN}/events/{params.eventID} </p>
                    <p>to contact a volunteer</p>
                  </div>
                </section>
              </div>

              <button type="button" className="h-12 border-black border-2 p-2.5 bg-[#A6FAFF] hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF] rounded-md">Print</button>
            </div>
          </div>
        </form>
      </section>
      <hr className="h-1 w-auto mx-auto bg-slate-700 border-0 dark:bg-slate-700" />
      <section className="bg-yellow-200">
        <h2>Add or remove volunteers</h2>
        <form>
          <div className="grid gap-6 mx-2.5 pb-6 md:grid-cols-2">
            <div>
              <div className="mb-2">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">First name</label>
                <input type="text" id="name" className="w-96 border-black border-2 p-2.5 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#FFA6F6] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] rounded-md" placeholder="Jay Doe" required />
              </div>
              <div className="mb-2">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Email address</label>
                <input type="email" id="email" className="w-96 border-black border-2 p-2.5 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#FFA6F6] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] rounded-md" placeholder="jay.doe@company.com" required />
              </div>
              <div className="mb-6">
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Phone number</label>
                <input type="tel" id="phone" className="w-96 border-black border-2 p-2.5 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#FFA6F6] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] rounded-md" placeholder="123-456-7890" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required />
              </div>
              <div className="mb-6">
                <button onClick={addVolunteers} type="button" className="h-12 border-black border-2 p-2.5 bg-[#A6FAFF] hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF] rounded-md">Add to list</button>
              </div>
            </div>
            <div>
              <h2>Current volunteers</h2>
              <ul>
                {eventData?.volunteers.map((volunteer, index) => (
                  <li className="list-disc" key={volunteer._id}>
                    {volunteer.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </form>
      </section>
    </>
  )
}