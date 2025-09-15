import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="w-full border-t-0 py-6 md:py-0 bg-dark-green text-white">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="text-center md:text-left">
          <p className="text-sm leading-loose text-gray-300">
            © {new Date().getFullYear()} The Human Fund. Money for People.
          </p>
          <p className="text-xs text-gray-400">
            People‑first giving and research. Explore our AI platform
            {" "}
            <a href="https://thehumanfund.no/" target="_blank" rel="noopener" className="underline underline-offset-4 text-gray-300 hover:text-white">The Human Fund AI</a>.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/privacy" className="text-sm text-gray-300 underline-offset-4 hover:underline hover:text-white">
            Privacy
          </Link>
          <Link href="/terms" className="text-sm text-gray-300 underline-offset-4 hover:underline hover:text-white">
            Terms
          </Link>
          <Link href="/festivus" className="text-sm text-gray-300 underline-offset-4 hover:underline hover:text-white">
            Festivus
          </Link>
          <a href="https://thehumanfund.no/" target="_blank" rel="noopener" className="text-sm text-gray-300 underline-offset-4 hover:underline hover:text-white">
            The Human Fund AI
          </a>
        </div>
      </div>
    </footer>
  )
}
