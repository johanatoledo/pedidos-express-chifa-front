"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import AdminPedidosTable from "@/components/AdminPedidosTable";
import {
  marcarPedidoEntregado,
  obtenerPedidosAdmin,
} from "@/services/pedidoService";

export default function AdminPedidosPage() {
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const cargarPedidos = async () => {
    try {
      const data = await obtenerPedidosAdmin();
      setPedidos(data);
    } catch (error) {
      console.error(error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarPedidos();

    const intervalo = setInterval(cargarPedidos, 10000);

    return () => clearInterval(intervalo);
  }, []);

  const entregarPedido = async (id) => {
    try {
      await marcarPedidoEntregado(id);
      setPedidos((prev) => prev.filter((pedido) => pedido.id !== id));
    } catch (error) {
      alert("No se pudo marcar como entregado");
    }
  };

  return (
    <main className="min-h-screen bg-orange-50">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="text-4xl font-black text-gray-950 ">
              Panel de pedidos
            </h1>
          </div>

          <button
            onClick={cargarPedidos}
            className="rounded-2xl bg-red-700 px-5 py-3 font-black text-white hover:bg-gray-800"
          >
            Actualizar
          </button>
        </div>

        {cargando ? (
          <p className="text-center font-black">Cargando pedidos...</p>
        ) : (
          <AdminPedidosTable pedidos={pedidos} onEntregar={entregarPedido} />
        )}
      </section>
    </main>
  );
}