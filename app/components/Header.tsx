import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-green-600 text-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">BotaniBuddy</Link>
        <ul className="flex space-x-4">
          <li><Link href="/" className="hover:text-green-200">Home</Link></li>
          <li><Link href="/about" className="hover:text-green-200">About</Link></li>
          <li><Link href="/history" className="hover:text-green-200">History</Link></li>
        </ul>
      </nav>
    </header>
  )
}