const { DB } = require("../config/db");
const format = require("pg-format");
const { hashPassword, verifyPassword } = require("../helpers/bcrypt");

const verificarCredenciales = async (email, password) => {
  try {
    const user = await exists(email);
    if (!user) {
      throw new Error("El correo no está registrado");
    }

    const isPasswordValid = verifyPassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Contraseña incorrecta");
    }

    return user;
  } catch (error) {
    throw error;
  }
};

const exists = async (identifier) => {
  try {
    let SQLQuery;

    if (isNaN(identifier)) {
      SQLQuery = format(
        `
                        SELECT * FROM usuarios 
                        WHERE email = %L
                    `,
        identifier
      );
    } else {
      SQLQuery = format(
        `
                        SELECT * FROM usuarios 
                        WHERE id_usuario = %L
                    `,
        identifier
      );
    }

    const {
      rows: [user],
      rowCount,
    } = await DB.query(SQLQuery);

    return user || null;
  } catch (error) {
    throw error;
  }
};

const register = async (email, password, nombre, apellido, telefono) => {
  try {
    const existingUser = await exists(email);

    if (existingUser) {
      throw new Error("El correo ya existe");
    }

    const passwordHashed = hashPassword(password);

    const SQLQuery = format(
      `
                INSERT INTO usuarios
                VALUES (DEFAULT, %L, %L, %L, %L, %L, %L) RETURNING *
                `,
      email,
      passwordHashed,
      nombre,
      apellido,
      telefono
    );

    const {
      rows: [user],
    } = await DB.query(SQLQuery);
    return user;
  } catch (error) {
    throw error;
  }
};

const getUser = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [
      req.email,
    ]);
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuario" });
  }
};

const getAllUsers = async () => {
  try {
    const { rows } = await DB.query("SELECT * FROM usuarios");
    return rows;
  } catch (error) {
    throw error;
  }
};

const updateUser = async (id, email, password, nombre, apellido, telefono) => {
  try {
    const SQLQuery = format(
      `
                UPDATE usuarios
                SET email = %L,
                password = %L,
                nombre = %L,
                apellido = %L,
                telefono = %L
                WHERE id_usuario = %L
                RETURNING *
                `,
      email,
      password,
      nombre,
      apellido,
      telefono,
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

const deleteUser = async (id) => {
  try {
    const SQLQuery = format(
      `
                DELETE FROM usuarios
                WHERE id_usuario = %L
                RETURNING *
                `,
      id
    );

    const { rows } = await DB.query(SQLQuery);

    if (!rows.length === 0) {
      return null;
    }

    return rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  verificarCredenciales,
  exists,
  register,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
};
