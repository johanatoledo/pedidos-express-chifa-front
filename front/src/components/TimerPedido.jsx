"use client";

import { useEffect, useState } from "react";

const TIEMPO_ESPERA_MS = 20 * 60 * 1000;

function calcularTiempoRestante(creadoEn) {
  if (!creadoEn) return TIEMPO_ESPERA_MS;

  const inicio = new Date(creadoEn).getTime();

  if (Number.isNaN(inicio)) return TIEMPO_ESPERA_MS;

  const final = inicio + TIEMPO_ESPERA_MS;
  const ahora = Date.now();

  return Math.max(final - ahora, 0);
}

export default function TimerPedido({ creadoEn, estado }) {
  const [tiempoRestante, setTiempoRestante] = useState(TIEMPO_ESPERA_MS);

  useEffect(() => {
    const actualizarTiempo = () => {
      setTiempoRestante(calcularTiempoRestante(creadoEn));
    };

    actualizarTiempo();

    const intervalo = setInterval(actualizarTiempo, 1000);

    return () => clearInterval(intervalo);
  }, [creadoEn]);

  const minutos = Math.floor(tiempoRestante / 1000 / 60);
  const segundos = Math.floor((tiempoRestante / 1000) % 60);

  if (estado === "listo" || tiempoRestante <= 0) {
    return (
      <div className="rounded-xl px-4 py-2 bg-green-100 p-4  text-center ring-1 ring-green-200">
        <p className="text-sm  font-black text-green-700">
          Tu pedido está listo
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white p-6 text-center border-none ">
      <p className="text-sm font-bold text-yellow-700">
        Tiempo estimado de preparación
      </p>

      <p className="mt-2 text-xl font-black text-yellow-900">
        {minutos}:{segundos.toString().padStart(2, "0")}
      </p>
    </div>
  );
}