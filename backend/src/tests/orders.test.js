const request = require("supertest");
const app = require("../app");
const { DB } = require("../config/db");

describe("API REST de Pedidos", () => {
  // Todos los pedidos
  it(async () => {
    const res = await request(app).get("/api/pedidos");

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
  });

  // Crear un nuevo pedido
  it("Debería crear un nuevo pedido (POST /api/pedidos)", async () => {
    const newOrder = {
      id_usuario: 2,
      precio_total: 35990,
      detalle: [{ id_producto: 1, cantidad: 1, precio_unitario: 35990 }],
      email: "ramon@gmail.com",
    };

    const res = await request(app).post("/api/pedidos").send(newOrder);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id_compra");
    expect(res.body).toHaveProperty("id_usuario", newOrder.id_usuario);
    expect(res.body).toHaveProperty("precio_total", newOrder.precio_total);
  });

  // Comprobar estado de un pedido
  it("Debería actualizar el estado de un pedido (PUT /api/pedidos/:id_compra)", async () => {
    const orderId = 1;
    const updatedStatus = { estado: "completed" };

    const res = await request(app)
      .put(`/api/pedidos/${orderId}`)
      .send(updatedStatus);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("estado", updatedStatus.estado);
  });

  // Eliminar un pedido
  it(async () => {
    const orderId = 1;
    const res = await request(app).delete(`/api/pedidos/${orderId}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id_compra", orderId);
  });
});
