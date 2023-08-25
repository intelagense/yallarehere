interface fetchEventData {
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

export async function fetchEventData(eventID: string) {
  try {
    const res = await fetch(
      `${process.env.DOMAIN}/api/events/${eventID}`
    );
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}