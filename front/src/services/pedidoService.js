const API_URL = process.env.NEXT_PUBLIC_API_URL || BACKEND_LOCAL;   

export async function crearPedido(data) {
  const response = await fetch(`${API_URL}/api/pedidos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("No se pudo crear el pedido");
  }

  return response.json();
}

export async function obtenerPedido(id) {
  const response = await fetch(`${API_URL}/api/pedidos/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("No se pudo obtener el pedido");
  }

  return response.json();
}

export async function obtenerPedidosAdmin() {
  const response = await fetch(`${API_URL}/api/pedidos`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("No se pudieron obtener los pedidos");
  }

  return response.json();
}

export async function marcarPedidoEntregado(id) {
  const response = await fetch(`${API_URL}/api/pedidos/${id}/entregar`, {
    method: "PATCH",
  });

  if (!response.ok) {
    throw new Error("No se pudo marcar como entregado");
  }

  return response.json();
}