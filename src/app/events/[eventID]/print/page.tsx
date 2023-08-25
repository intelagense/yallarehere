'use client'
import {QRCodeSVG} from 'qrcode.react';

export default function event({ params }: { params: { eventID: string } }) {
    return (
        <>
            <h1>event {params.eventID} </h1>
            
            <hr className="h-1 my-8 w-96 mx-auto bg-slate-700 border-0 dark:bg-slate-700"></hr>
            <div className="flex flex-col items-center justify-center">
                <QRCodeSVG className='flex content-center' value={`${window.location.origin}/${params.eventID}`} size={256} includeMargin={false}/>
                <h2>{window.location.origin}/{params.eventID}</h2>
            </div>

        </>
    )
}