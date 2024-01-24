import { redirect } from 'next/navigation';

interface CreateFabricSubscriberRequest {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  display_name?: string;
  job_title?: string;
  time_zone?: string;
  country?: string;
  region?: string;
  company_name?: string;
}
 
export default function Page() {
  async function createSubscriber(formData: FormData) {
    'use server'

    const subscriber: CreateFabricSubscriberRequest = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      first_name: formData.get('firstName') as string,
      last_name: formData.get('lastName') as string,
      job_title: formData.get('jobTitle') as string,
      company_name: formData.get('companyName') as string,
    }

    const authString = Buffer.from(
      `${process.env.SIGNALWIRE_PROJECT}:${process.env.SIGNALWIRE_API_TOKEN}`
    ).toString('base64')
    console.log("authString =", authString)
    const response = await fetch(`${process.env.SIGNALWIRE_API_URL}/api/fabric/subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${authString}`,
      },
      body: JSON.stringify(subscriber),
    })

    if (response.ok) {
      redirect('/api/auth/signin')
    } else {
      const errorBody = await response.text()
      console.log('Error Body:', errorBody)
    }
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content">
        <div className="max-w-md">
          <h1 className="text-4xl mb-4 font-extrabold">Sign Up</h1>

          <div>
            <form action={createSubscriber} className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label>
                  First Name:
                  <input
                    name="firstName"
                    type="text"
                    required
                    className="input input-bordered w-full"
                  />
                </label>
              </div>
              <div className="mb-4">
                <label>
                  Last Name:
                  <input
                    name="lastName"
                    type="text"
                    required
                    className="input input-bordered w-full"
                  />
                </label>
              </div>
              <div className="mb-4">
                <label>
                  Email:
                  <input
                    name="email"
                    type="email"
                    required
                    className="input input-bordered w-full"
                  />
                </label>
              </div>
              <div className="mb-4">
                <label>
                  Password:
                  <input
                    name="password"
                    type="text"
                    required
                    className="input input-bordered w-full"
                  />
                </label>
              </div>
              <div className="mb-4">
                <label>
                  Company:
                  <input
                    name="companyName"
                    type="text"
                    className="input input-bordered w-full"
                  />
                </label>
              </div>
              <div className="mb-4">
                <label>
                  Job Title:
                  <input
                    name="jobTitle"
                    type="text"
                    className="input input-bordered w-full"
                  />
                </label>
              </div>
              <div className="">
                <button type="submit" className="btn btn-primary">
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
