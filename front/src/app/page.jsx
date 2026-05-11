"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import CartBar from "@/components/CartBar";
import CheckoutPanel from "@/components/CheckoutPanel";
import { productos } from "@/data/productos";

export default function HomeMenuPage() {
  const [carrito, setCarrito] = useState([]);
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [checkoutAbierto, setCheckoutAbierto] = useState(false);

  useEffect(() => {
    const carritoGuardado = localStorage.getItem("carrito");

    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const categorias = ["Todos", ...new Set(productos.map((p) => p.categoria))];

  const productosFiltrados =
    categoriaActiva === "Todos"
      ? productos
      : productos.filter((producto) => producto.categoria === categoriaActiva);

  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const agregarProducto = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id);

      if (existe) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }

      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const eliminarProducto = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  const limpiarCarrito = () => {
    setCarrito([]);
    setCheckoutAbierto(false);
  };

  const obtenerCantidad = (id) => {
    const item = carrito.find((producto) => producto.id === id);
    return item ? item.cantidad : 0;
  };

  return (
    <main className="min-h-screen bg-orange-50 pb-32">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="text-center">
          <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-black text-red-700">
            Menú digital
          </span>

          <h1 className="mt-5 text-4xl font-black text-gray-950 md:text-5xl">
            Chifa Express
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Escanea, elige tus platos, paga con Yape y retira tu pedido en
            aproximadamente 20 minutos.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              onClick={() => setCategoriaActiva(categoria)}
              className={`rounded-full px-5 py-2 text-sm font-black transition ${
                categoriaActiva === categoria
                  ? "bg-red-700 text-white"
                  : "bg-white text-gray-700 hover:bg-red-50"
              }`}
            >
              {categoria}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {productosFiltrados.map((producto) => (
            <ProductCard
              key={producto.id}
              producto={producto}
              cantidad={obtenerCantidad(producto.id)}
              onAgregar={agregarProducto}
              onEliminar={eliminarProducto}
            />
          ))}
        </div>
      </section>

      <CartBar
        carrito={carrito}
        onOpenCheckout={() => setCheckoutAbierto(true)}
      />

      {checkoutAbierto && (
        <CheckoutPanel
          carrito={carrito}
          total={total}
          onClose={() => setCheckoutAbierto(false)}
          onPedidoCreado={limpiarCarrito}
        />
      )}
    </main>
  );
}