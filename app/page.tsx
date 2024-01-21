import Image from "next/image";

export default function Home() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div>
          <h1 className="text-5xl font-bold">Simplified Communication</h1>
          <p className="py-6">
            Connect and interact with voice, video, and chat seamlessly
          </p>
          <div>
            <div className="inline-flex w-full flex-col items-stretch justify-center gap-2 px-4 md:flex-row xl:justify-start xl:px-0">
              <a
                data-sveltekit-preload-data="off"
                href="/signup"
                className="btn btn-primary md:btn-lg md:btn-wide group px-12"
              >
                Join
              </a>
              <a
                data-sveltekit-preload-data="off"
                href="/auth/signin"
                className="btn btn-neutral md:btn-lg md:btn-wide group px-12"
              >
                Sign in
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="hidden h-6 w-6 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 md:inline-block"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
