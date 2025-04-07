const {
  getAllOrders,
  getOrdersByUserId,
  getOrderByOrderId,
  createOrder,
  updateOrderStatus,
  deleteOrder,
} = require("../models/orderModel");
const pool = require("../db/connection");

const handleGetAllOrders = async (req, res, next) => {
  try {
    const orders = await getAllOrders();
    res
      .status(200)
      .json({ message: `Historial de pagos: ${orders.length}`, orders });

    if (!orders) {
      return res.status(404).json({ error: "No hay compras" });
    }
  } catch (error) {
    next(error);
  }
};

const handleGetOrdersByUserId = async (req, res, next) => {
  const { id_usuario } = req.params;
  try {
    const orders = await getOrdersByUserId(id_usuario);

    if (!orders) {
      return res.status(404).json({ error: "No hay compras" });
    }

    res.status(200).json({
      message: `Historial de compra del ususario con id ${id_usuario}, total de compras: ${orders.length}`,
      orders,
    });
  } catch (error) {
    next(error);
  }
};

const handleGetOrderByOrderId = async (req, res, next) => {
  const { id_compra } = req.params;
  try {
    const order = await getOrderByOrderId(id_compra);
    if (!order) {
      return res.status(404).json({
        error: "Pedido no encontrado o sin autorización para eliminarlo",
      });
    }
    res
      .status(200)
      .json({ message: `Detalle de la compra con id ${id_compra}`, order });
  } catch (error) {
    next(error);
  }
};

const handleCreateOrder = async (req, res) => {
  try {
    // Verificar que req.body
    if (!req.body) {
      return res.status(400).json({ error: "No hay datos" });
    }

    // Extraer los datos
    const {
      id_usuario,
      nombre_cliente,
      email_cliente,
      productos,
      total,
      fecha_orden,
      estado,
    } = req.body;

    // Validar campos requeridos
    if (
      !id_usuario ||
      !nombre_cliente ||
      !email_cliente ||
      !productos ||
      !total
    ) {
      return res.status(400).json({
        error: "Falta información para el pedido",
      });
    }

    // Crear el pedido
    const query = `
            INSERT INTO ordenes (
                id_usuario,
                nombre_cliente,
                email_cliente,
                productos,
                total,
                fecha_orden,
                estado
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING *
        `;

    const values = [
      id_usuario,
      nombre_cliente,
      email_cliente,
      JSON.stringify(productos),
      total,
      fecha_orden || new Date(),
      estado || "pendiente",
    ];

    const result = await pool.query(query, values);

    res.status(201).json({
      message: "Compra realizada",
      order: result.rows[0],
    });
  } catch (error) {
    console.error("Error en handleCreateOrder:", error);
    res.status(500).json({
      error: "Error en la compra",
    });
  }
};

const handleUpdateOrderStatus = async (req, res, next) => {
  const { id_compra } = req.params;
  const { estado } = req.body;
  const validStatuses = ["pending", "cancelled", "completed"];

  if (!validStatuses.includes(estado)) {
    return res.status(400).json({ error: "Estado inválido" });
  }

  try {
    const order = await updateOrderStatus(id_compra, estado);

    if (!order) {
      return res.status(404).json({ error: "Compra no encontrada" });
    }

    res.status(200).json({
      message: `Estado de la compra con id ${id_compra} actualizado a ${estado} exitosamente`,
      order,
    });
  } catch (error) {
    next(error);
  }
};

const handleDeleteOrder = async (req, res, next) => {
  const { id_compra } = req.params;
  console.log(req.user);
  try {
    const order = await deleteOrder(id_compra);
    console.log(order);
    res.status(200).json({ message: "Compra eliminada", order });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleGetAllOrders,
  handleGetOrdersByUserId,
  handleGetOrderByOrderId,
  handleCreateOrder,
  handleUpdateOrderStatus,
  handleDeleteOrder,
};
