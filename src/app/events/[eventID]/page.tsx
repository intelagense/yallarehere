export default function event({ params }: { params: { eventID: string } }) {

    return (
        <>
            <h1>event {params.eventID} </h1>
        </>

    )
}