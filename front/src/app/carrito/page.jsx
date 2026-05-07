"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Trash2 } from "lucide-react";

export default function CarritoPage() {
  const router = useRouter();

  const [carrito, setCarrito] = useState([]);
  const [clienteNombre, setClienteNombre] = useState("");

  useEffect(() => {
    const carritoGuardado = localStorage.getItem("carrito");

    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }
  }, []);

  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const eliminarItem = (id) => {
    const nuevoCarrito = carrito.filter((item) => item.id !== id);
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const continuarPago = () => {
    if (!clienteNombre.trim()) {
      alert("Ingresa tu nombre para continuar");
      return;
    }

    if (carrito.length === 0) {
      alert("Tu carrito está vacío");
      return;
    }

    localStorage.setItem("clienteNombre", clienteNombre.trim());
    localStorage.setItem("totalPedido", total.toString());

    router.push("/pago");
  };

  return (
    <main className="min-h-screen bg-orange-50">
      <Navbar />

      <section className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="text-4xl font-black text-gray-950">Tu pedido</h1>

        <div className="mt-8 rounded-3xl bg-white p-6 shadow-xl">
          {carrito.length === 0 ? (
            <p className="text-gray-600">Aun no tienes pedidos.</p>
          ) : (
            <div className="space-y-4">
              {carrito.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-2xl border border-gray-100 p-4"
                >
                  <div>
                    <h3 className="font-black text-gray-900">
                      {item.nombre} x{item.cantidad}
                    </h3>

                    <p className="text-sm text-gray-500">
                      S/ {item.precio.toFixed(2)} c/u
                    </p>
                  </div>

                  <button
                    onClick={() => eliminarItem(item.id)}
                    className="rounded-xl bg-red-100 p-3 text-red-700 hover:bg-red-200"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 border-t pt-6">
            <label className="text-sm font-black text-gray-700">
              Nombre del cliente
            </label>

            <input
              type="text"
              value={clienteNombre}
              onChange={(e) => setClienteNombre(e.target.value)}
              placeholder="Ejemplo: María López"
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-red-700"
            />

            <div className="mt-6 flex items-center justify-between">
              <p className="text-2xl font-black text-gray-950">
                Total: S/ {total.toFixed(2)}
              </p>

              <button
                onClick={continuarPago}
                className="rounded-2xl bg-red-700 px-6 py-3 font-black text-white hover:bg-red-800"
              >
                Pagar
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}