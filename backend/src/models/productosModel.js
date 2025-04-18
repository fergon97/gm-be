const { DB } = require("../config/db");
const format = require("pg-format");

const getAllProducts = async () => {
  try {
    const { rows } = await DB.query("SELECT * FROM productos");
    return rows;
  } catch (error) {
    throw error;
  }
};

const getProductById = async (id) => {
  try {
    const result = await DB.query(
      "SELECT * FROM productos WHERE id_producto = $1",
      [id]
    );
    const product = result.rows[0];

    return product;
  } catch (error) {
    throw error;
  }
};

const createProduct = async (nombre_producto, descripcion, precio) => {
  try {
    const SQLQuery = format(
      `
                INSERT INTO productos
                VALUES (DEFAULT, %L, %L, %L, %L) RETURNING *
                `,
      nombre_producto,
      descripcion,
      precio
    );

    const {
      rows: [user],
    } = await DB.query(SQLQuery);
    return user;
  } catch (error) {
    throw error;
  }
};

const updateProduct = async (id, nombre_producto, descripcion, precio) => {
  try {
    const SQLQuery = format(
      `
                UPDATE productos
                SET nombre_producto = %L,
                descripcion = %L,
                precio = %L
                WHERE id_producto = %L
                RETURNING *
                `,
      nombre_producto,
      descripcion,
      precio,
      id
    );

    const {
      rows: [user],
    } = await DB.query(SQLQuery);
    return user;
  } catch (error) {
    throw error;
  }
};

const deleteProduct = async (id) => {
  try {
    const SQLQuery = format(
      `
                DELETE FROM productos
                WHERE id_producto = %L
                RETURNING id_producto
                `,
      id
    );

    const {
      rows: [user],
    } = await DB.query(SQLQuery);
    return user;
  } catch (error) {
    throw error;
  }
};

const getAllImagenes = async () => {
  try {
    const SQLQuery = format(`
            SELECT * FROM imagen_producto
            `);
    const { rows } = await DB.query(SQLQuery);
    return rows;
  } catch (error) {
    throw error;
  }
};

const getImagenesByIdProducto = async (id) => {
  try {
    const SQLQuery = format(
      `
            SELECT * FROM imagen_producto WHERE id_producto = %L
            `,
      id
    );
    const { rows } = await DB.query(SQLQuery);
    return rows;
  } catch (error) {
    throw error;
  }
};

const getAllCategorias = async () => {
  try {
    const SQLQuery = format(`
            SELECT * FROM categorias_productos
            `);
    const { rows } = await DB.query(SQLQuery);
    return rows;
  } catch (error) {
    throw error;
  }
};

const getProductsByCategoria = async (id) => {
  try {
    const SQLQuery = format(
      `
            SELECT p.* 
            FROM productos p
            JOIN categorias_productos cp ON p.id_producto = cp.id_producto
            JOIN categorias c ON cp.id_categoria = c.id_categoria
            WHERE c.id_categoria = %L
            `,
      id
    );
    const { rows } = await DB.query(SQLQuery);
    return rows;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllImagenes,
  getImagenesByIdProducto,
  getAllCategorias,
  getProductsByCategoria,
};
