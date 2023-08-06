import ShortUniqueId from 'short-unique-id';
import Link from 'next/link'
import Header from '@/components/Header'
const uid = new ShortUniqueId();

export default function Page() {

  return (
    <>
      <Header />
      <main className='m-10 h-96'>
        <p className='my-3'>test</p>
        <Link href={`/events/${uid()}/edit`} className="inline-block my-10 text-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md text-center">Create a new event</Link>
      </main>
    </>
  )
}