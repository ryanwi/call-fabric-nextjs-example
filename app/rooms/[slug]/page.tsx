import { auth } from "auth"

export default async function Page()  {
  const session = await auth()

  if (session?.user) {
    return (
      <div>
        <h1 className="text-4xl mb-4 mt-4 font-extrabold">Room</h1>
      </div>
    )
  }

  return (
    <p>
      No session data, please <em>Sign In</em> first.
    </p>
  )
}
