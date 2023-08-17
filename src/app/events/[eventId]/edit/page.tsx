'use client'

export default function edit( { params }: { params: { eventId:string } }) {
    const makeApiCall = async () => {

        await fetch(`/api/events/${params.eventId}`, {
            method: 'GET', // Placeholder code for testing
        })
    }
    
    return (
        <button onClick={makeApiCall}>make the call</button> // Placeholder code for testing
    )
}