import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-lg font-semibold text-clinical-700">
          Women's Hypothyroidism Screening
        </Link>
      </div>
    </header>
  )
}
