"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { crearPedido } from "@/services/pedidoService";

export default function PagoPage() {
  const router = useRouter();

  const [carrito, setCarrito] = useState([]);
  const [clienteNombre, setClienteNombre] = useState("");
  const [total, setTotal] = useState(0);
  const [yapeOperacion, setYapeOperacion] = useState("");
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const carritoGuardado = localStorage.getItem("carrito");
    const nombreGuardado = localStorage.getItem("clienteNombre");
    const totalGuardado = localStorage.getItem("totalPedido");

    if (carritoGuardado) setCarrito(JSON.parse(carritoGuardado));
    if (nombreGuardado) setClienteNombre(nombreGuardado);
    if (totalGuardado) setTotal(Number(totalGuardado));
  }, []);

  const confirmarPedido = async () => {
    try {
      if (!yapeOperacion.trim()) {
        alert("Ingresa el ID de operación de Yape");
        return;
      }

      setCargando(true);

      const data = {
       cliente_nombre: clienteNombre,
        productos: carrito,
        total:total,
        yape_operacion: yapeOperacion.trim(),
      };

      const respuesta = await crearPedido(data);

      localStorage.removeItem("carrito");
      localStorage.removeItem("clienteNombre");
      localStorage.removeItem("totalPedido");

      router.push(`/pedido/${respuesta.pedidoId}`);
    } catch (error) {
      alert("Ocurrió un error al crear el pedido");
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="min-h-screen bg-orange-50">
      <Navbar />

      <section className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="text-4xl font-black text-gray-950">Pago con Yape</h1>

        <div className="mt-8 rounded-3xl bg-white p-6 shadow-xl">
          <div className="rounded-3xl bg-purple-100 p-6 text-center">
            <p className="text-sm font-black uppercase text-purple-700">
              Número Yape del restaurante
            </p>

            <p className="mt-2 text-4xl font-black text-purple-900">
              999 999 999
            </p>

            <p className="mt-3 text-sm text-purple-700">
              Realiza el pago y coloca abajo el ID de operación.
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-gray-100 p-5">
            <p className="font-black text-gray-900">Cliente: {clienteNombre}</p>
            <p className="mt-2 font-black text-red-700">
              Total a pagar: S/ {total.toFixed(2)}
            </p>
          </div>

          <label className="mt-6 block text-sm font-black text-gray-700">
            ID de operación Yape
          </label>

          <input
            type="text"
            value={yapeOperacion}
            onChange={(e) => setYapeOperacion(e.target.value)}
            placeholder="Ejemplo: 84592136"
            className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-red-700"
          />

          <button
            onClick={confirmarPedido}
            disabled={cargando}
            className="mt-6 w-full rounded-2xl bg-red-700 px-6 py-4 font-black text-white hover:bg-red-800 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {cargando ? "Creando pedido..." : "Confirmar pedido"}
          </button>
        </div>
      </section>
    </main>
  );
}