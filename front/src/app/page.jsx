import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-orange-50">
      <Navbar />

      <section className="mx-auto grid min-h-[85vh] max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-2">
        <div>
          <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-black text-red-700">
            Menú digital para restaurante
          </span>

          <h1 className="mt-6 text-5xl font-black leading-tight text-gray-950 md:text-6xl">
            Pide rápido, paga con Yape y retira sin esperar.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-600">
            Explora el menú, agrega tus platos favoritos al carrito y sigue el
            estado de tu pedido en tiempo real.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/menu"
              className="rounded-2xl bg-red-700 px-6 py-4 font-black text-white shadow-xl hover:bg-red-800"
            >
              Ver menú
            </Link>

            <Link
              href="/admin/pedidos"
              className="rounded-2xl border border-red-200 bg-white px-6 py-4 font-black text-red-700 hover:bg-red-50"
            >
              Panel admin
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-6 shadow-2xl">
          <div className="rounded-[1.5rem] bg-gradient-to-br from-red-700 to-yellow-500 p-8 text-white">
            <p className="text-sm font-black uppercase tracking-[0.3em]">
              Chifa Express
            </p>

            <h2 className="mt-20 text-4xl font-black">
              Lomo, chaufa, mostrito y bebidas listas para pedir.
            </h2>

            <p className="mt-6 text-white/90">
              Sistema ideal para restaurantes pequeños que quieren reducir la
              espera del cliente y ordenar mejor la atención.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}