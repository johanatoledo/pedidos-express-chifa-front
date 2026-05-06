import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-red-100 bg-white/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-black tracking-tight text-red-700">
          Chifa Express
        </Link>

        <div className="flex items-center gap-4 text-sm font-bold">
          <Link href="/" className="text-gray-700 hover:text-red-700">
            Inicio
          </Link>

          <Link href="/menu" className="text-gray-700 hover:text-red-700">
            Menú
          </Link>

          <Link href="/admin/pedidos" className="text-gray-700 hover:text-red-700">
            Admin
          </Link>

          <Link
            href="/menu"
            className="rounded-full bg-red-700 px-5 py-2 text-white shadow-lg hover:bg-red-800"
          >
            Pedir ahora
          </Link>
        </div>
      </nav>
    </header>
  );
}