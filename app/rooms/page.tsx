import Link from 'next/link'
import { auth } from 'auth'
import { FabricAddress } from '@/types/FabricAddress'

async function getAddresses(sat: string) {
  const response = await fetch(
    `${process.env.SIGNALWIRE_FABRIC_API_URL}/addresses?type=room`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sat}`,
      },
    },
  )

  if (!response.ok) {
    throw new Error('Failed to get addresses')
  }

  const addresses = await response.json()
  return addresses.data
}

export default async function Page() {
  const session = await auth()

  if (session?.user) {
    const addressData = await getAddresses(session.user.sat)

    return (
      <div>
        <h1 className="mb-4 mt-4 text-4xl font-extrabold">Rooms</h1>

        <div className="grid grid-cols-3">
          {addressData.map((address: FabricAddress) => (
            <div className="card m-6 w-96 bg-base-100 shadow-xl">
              <figure>
                <img src="https://files.signalwire.com/cantina/02e3021d-861c-49da-9741-5c811aac8657/promos/44513608-5ff4-4b84-bccc-74c15f857c8c.jpg" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{address.display_name}</h2>
                <p>{address.name}</p>
                <div className="card-actions justify-end">
                  <Link href={`/rooms/${address.name}`} className="btn btn-primary">
                    Join
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <p>
      No session data, please <em>Sign In</em> first.
    </p>
  )
}
