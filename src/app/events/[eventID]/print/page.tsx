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
}

async function fetchData(eventID: string, setEventData: React.Dispatch<React.SetStateAction<EventData | null>>) {
    try {
        const data = await fetchEventData(eventID);
        setEventData(data);
    } catch (error) {
        setEventData(null);
    }
}
export default function Letter({ params }: { params: { eventID: string } }) {

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
        <div className="col-span-2 md:col-span-1">
            <h2 className="mb-4 text-lg font-semibold print:hidden">Preview</h2>
            <div className="text-center flex flex-col justify-between h-[10in] bg-white">
                <section className="h-full pb-4 flex flex-col justify-around">
                    <div>
                        <h2 className="mb-4 text-6xl font-extrabold leading-none tracking-tight text-gray-900">{eventData?.event_name}</h2>
                        <p className="text-2xl text-gray-900">
                            {eventData?.start_time && eventData?.end_time ? (
                                `${new Date(eventData?.start_time).toLocaleDateString()}`
                            ) : (
                                ''
                            )}
                        </p>
                    </div>
                    <p className="text-4xl text-gray-900">
                        {eventData?.start_time && eventData?.end_time ? (
                            `${new Date(eventData?.start_time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} - ${new Date(eventData?.end_time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`
                        ) : (
                            ''
                        )}
                    </p>
                    <p className="text-2xl mt-2">{eventData?.event_description}</p>
                </section>
                <hr className="w-5/6 h-3 mx-auto my-4 bg-gray-700 border-0 rounded md:my-10 dark:bg-gray-700" />
                <section className="h-full pt-4 flex flex-col justify-around">
                    <h3 className="text-4xl font-semibold">Locked out?</h3>
                    <div className="text-2xl flex flex-col items-center justify-center">
                        <QRCodeSVG className='mt-2 flex content-center' value={`${process.env.DOMAIN}/events/${params.eventID}`} size={192} includeMargin={false} />
                        <p className="mt-10">Scan QR Code</p>
                        <p>or visit {process.env.DOMAIN}/events/{params.eventID} </p>
                        <p>to contact a volunteer</p>
                    </div>
                </section>
            </div>

            <button type="button" className="print:hidden text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Print</button>
        </div>
    )
}