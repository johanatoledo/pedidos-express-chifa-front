"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import TimerPedido from "@/components/TimerPedido";
import { obtenerPedido } from "@/services/pedidoService";

export default function PedidoDetallePage({ params }) {
  const { id } = params;

  const [pedido, setPedido] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarPedido = async () => {
      try {
        const data = await obtenerPedido(id);
        setPedido(data);
      } catch (error) {
        console.error(error);
      } finally {
        setCargando(false);
      }
    };

    cargarPedido();

    const intervalo = setInterval(cargarPedido, 10000);

    return () => clearInterval(intervalo);
  }, [id]);

  if (cargando) {
    return (
      <main className="min-h-screen bg-orange-50">
        <Navbar />
        <p className="p-10 text-center font-black">Cargando pedido...</p>
      </main>
    );
  }

  if (!pedido) {
    return (
      <main className="min-h-screen bg-orange-50">
        <Navbar />
        <p className="p-10 text-center font-black">Pedido no encontrado.</p>
      </main>
    );
  }

  const productos =
    typeof pedido.productos === "string"
      ? JSON.parse(pedido.productos)
      : pedido.productos;

  return (
    <main className="min-h-screen bg-orange-50">
      <Navbar />

      <section className="mx-auto max-w-3xl px-6 py-10">
        <div className="rounded-3xl bg-white p-8 shadow-xl">
          <p className="text-sm font-black uppercase text-red-700">
            Pedido generado correctamente
          </p>

          <h1 className="mt-2 text-5xl font-black text-gray-950">
            Pedido #{pedido.id}
          </h1>

          <p className="mt-4 text-gray-600">
            Guarda este número para retirar tu pedido en el restaurante.
          </p>

          <div className="mt-8">
            <TimerPedido creadoEn={pedido.creado_en} estado={pedido.estado} />
          </div>

          <div className="mt-8 rounded-2xl border border-gray-100 p-5">
            <p className="font-black text-gray-900">
              Cliente: {pedido.cliente_nombre}
            </p>

            <p className="mt-2 font-black text-red-700">
              Total: S/ {Number(pedido.total).toFixed(2)}
            </p>

            <p className="mt-2 text-gray-600">
              Estado actual: {pedido.estado}
            </p>
          </div>

          <div className="mt-6">
            <h2 className="font-black text-gray-900">Detalle del pedido</h2>

            <ul className="mt-3 space-y-2">
              {productos.map((item) => (
                <li
                  key={item.id}
                  className="rounded-xl bg-orange-50 px-4 py-3 text-sm font-bold text-gray-700"
                >
                  {item.nombre} x{item.cantidad}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}