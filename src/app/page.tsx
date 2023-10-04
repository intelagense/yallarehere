import ShortUniqueId from 'short-unique-id';
import Link from 'next/link'
const uid = new ShortUniqueId();
import Header from '@/components/Header'
import Footer from '@/components/Footer'


export default function Page() {

  return (
    <>
      {/* <body className='flex flex-col justify-between min-h-screen'> */}
      <Header />
      <main className='text-center'>
        <p className='my-3 text-xl'>Latecomer Alert App: Step-by-Step Guide for Event Organizers</p>
        <div className='flex justify-center'>
          <ol className='text-left space-y-1 text-gray-500 list-decimal list-inside dark:text-gray-400'>
            <li>Create and print a hanging door sign</li>
            <li>Latecomers can scan the QR code to request entry</li>
            <li>Volunteers receive notifications that someone has arrived</li>
          </ol>
        </div>
        <Link href={`/events/${uid()}/edit`} className="inline-block my-10 text-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md text-center">Create a new event</Link>
      </main>
      <Footer />
    </>
  )
}
