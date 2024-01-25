import { auth } from 'auth';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    return (
      <div>
        <h1 className="mb-4 mt-4 text-4xl font-extrabold">Get started</h1>
        <div>
          <p>You are signed in.</p>
          <p>Name: {session.user.name}</p>
          <p>Email: {session.user.email}</p>
          <p>Subsriber ID: {session.user.id} </p>
          <p>Session expiry: {session.expires}</p>
          <p>Token: {session.user.sat}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex flex-col md:flex-row-reverse">
        <div>
          <h1 className="text-3xl font-bold md:text-5xl">
            Simplified Communication
          </h1>
          <p className="py-6">
            Connect and interact with voice, video, and chat seamlessly
          </p>
          <div>
            <div className="flex flex-col items-stretch justify-center gap-2 px-4 sm:flex-row">
              <Link
                href="/signup"
                className="group btn btn-primary px-6 sm:btn-lg"
              >
                Join
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="hidden h-6 w-6 transition-transform duration-300 group-hover:translate-x-1 md:inline-block rtl:rotate-180 rtl:group-hover:-translate-x-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  ></path>
                </svg>
              </Link>
              <Link
                href="/api/auth/signin"
                className="group btn btn-neutral px-6 sm:btn-lg"
              >
                Sign in
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="hidden h-6 w-6 transition-transform duration-300 group-hover:translate-x-1 md:inline-block rtl:rotate-180 rtl:group-hover:-translate-x-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
