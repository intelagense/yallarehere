

export default function event({ params }: { params: { eventId: string } }) {
    // console.log(connectToDB())
    return (
        <>
            <h1>event {params.eventId} </h1>
        </>

    )
}