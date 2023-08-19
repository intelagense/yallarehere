'use client'

export default function edit() {
    const makeApiCall = async () => {

        await fetch('/api', {
            method: 'GET',
            // body: JSON.stringify({Hellow: 'world'})
        })
    }
    
    return (
        <button onClick={makeApiCall}>make the call</button>
    )
}