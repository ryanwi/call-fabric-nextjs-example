export default function Header() {
  return (
    <div className="navbar bg-neutral text-neutral-content">
      <div className="flex-1">
        <a href="/" className="btn btn-neutral text-xl">Call Fabric Demo</a>
      </div>
      <div className="flex-none gap-2">
        <div>
          <a href="/api/auth/signin" className="btn btn-primary">Sign in</a>
        </div>
      </div>
    </div>
  )
}
