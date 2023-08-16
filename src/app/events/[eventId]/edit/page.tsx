'use client'

export default function edit( { params }: { params: { eventId:string } }) {
    const makeApiCall = async () => {

        await fetch(`/api/events/${params.eventId}`, {
            method: 'GET',
        })
    }
    
    return (
        <button onClick={makeApiCall}>make the call</button>
    )
}