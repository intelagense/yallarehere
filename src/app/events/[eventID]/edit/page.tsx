'use client'
import { QRCodeSVG } from "qrcode.react"

export default function edit({ params }: { params: { eventID: string } }) {
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
    } catch (error) {
      console.log("error", error )
    }
  }

  
  return (
    <>
    <section className="bg-gray-300">
    <form>
      <div className="grid gap-6 mx-2.5 pb-6 md:grid-cols-3">
        <div className="col-span-2 md:col-span-2">
          <h2>Create or Edit Event</h2>
          <div>
            <label htmlFor="event_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event Name</label>
            <input type="text" id="event_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Code and Coffee" required />
          </div>  
          <div>
            <label htmlFor="start_time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start Time</label>
            <input type="datetime-local" id="start_time" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="6:00 PM" required />
          </div>  
          <div>
            <label htmlFor="end_time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End Time</label>
            <input type="datetime-local" id="end_time" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="7:00 PM" required />
          </div> 
          <div>
            <label htmlFor="event_description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
            <textarea id="event_description" rows={4 as number} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write a short description or any additional info here..."></textarea>
          </div>
          <button onClick={createEvent}  type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Event</button>
        </div>
        <div className="col-span-2 md:col-span-1">
          <h2>Preview</h2>
          <div className="h-96 bg-white">
            Code and Coffee          
            <div className="flex flex-col items-center justify-center">
                  <QRCodeSVG className='flex content-center' value={`${process.env.DOMAIN}/${params.eventID}`} size={64} includeMargin={false}/>
                  <h2>{process.env.DOMAIN}/{params.eventID}</h2>
            </div>
          </div>

          <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Print</button>
        </div>
      </div>
    </form>
    </section>
    <hr className="h-1 w-auto mx-auto bg-slate-700 border-0 dark:bg-slate-700"></hr>
    <section className="bg-gray-300">
      <h2>Add or remove volunteers</h2>
    <form>
      <div className="grid gap-6 mx-2.5 pb-6 md:grid-cols-2">
        <div>
          <div className="mb-2">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
            <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
            <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
          </div>
          <div className="mb-6">
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
            <input type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-456-7890" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required />
          </div>
          <div className="mb-6">
            <button onClick={addVolunteers} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to list</button>
            </div>
        </div>
        <div>
          <ul>
            <li>Voluteer1 X (Placeholder)</li>
            <li>Voluteer2 X (Placeholder)</li>
            <li>Voluteer3 X (Placeholder)</li>
          </ul>
        </div>
      </div> 
    </form>
    </section>
    </>
  )
}