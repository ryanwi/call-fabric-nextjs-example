export default function Header() {
  return (
    <div className="navbar bg-neutral text-neutral-content">
      <div className="flex-1">
        <a href="/" className="btn btn-neutral text-xl">Call Fabric Demo</a>
      </div>
      <div className="flex-none gap-2">
        <div>
          <a href="/auth/signin" className="btn btn-ghost">Sign in</a>
        </div>
        <div>
          <a href="/signup" className="btn btn-primary">Join</a>
        </div>
      </div>
    </div>
  )
}
