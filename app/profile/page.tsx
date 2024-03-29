import { auth } from "auth"

export default async function Page()  {
  const session = await auth()

  if (session?.user) {
    return (
      <div>
        <h1 className="text-4xl mb-4 mt-4 font-extrabold">Profile</h1>

        <div className="w-full space-y-2 overflow-auto">
          <h2 className="text-xl font-bold">Current Session Data</h2>
          {Object.keys(session.user).length > 3 ? (
            <p>
              In this example, the whole session object is passed to the page,
              including the raw user object. Our recommendation is to{" "}
              <em>only pass the necessary fields</em> to the page, as the raw user
              object may contain sensitive information.
            </p>
          ) : (
            <p>
              In this example, only some fields in the user object is passed to
              the page to avoid exposing sensitive information.
            </p>
          )}
          <pre>{JSON.stringify(session, null, 2)}</pre>
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
