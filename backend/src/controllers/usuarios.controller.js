const { hashPassword, verifyPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const usuarios = require("../models/usuariosModel");
const { validateEmail } = require("../helpers/validateEmail");

const handleLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validaciones
    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Correo inválido" });
    }

    if (!password) {
      return res.status(400).json({ error: "Contraseña inválida" });
    }

    const user = await usuarios.verificarCredenciales(email, password);

    if (user.error) {
      return res.status(400).json({ error: user.error });
    }

    const token = signToken({ email: user.email });

    return res.status(200).json({
      token,
      email: user.email,
      nombre: user.nombre,
      apellido: user.apellido,
      telefono: user.telefono,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const handleRegister = async (req, res, next) => {
  try {
    const { email, password, nombre, apellido, telefono } = req.body;

    // Verificaciones
    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Correo inválido" });
    }

    if (!password) {
      return res.status(400).json({ error: "Contraseña inválida" });
    }

    if (!telefono || telefono === "Teléfono inválido") {
      return res.status(400).json({ error: "Teléfono inválido" });
    }

    const passwordHashed = hashPassword(password);

    const newUser = await usuarios.register(
      email,
      passwordHashed,
      nombre,
      apellido,
      telefono
    );

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const handleGetUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userData = await usuarios.exists(id);

    if (!userData) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json([
      {
        email: userData.email,
        nombre: userData.nombre,
        apellido: userData.apellido,
        telefono: userData.telefono,
      },
    ]);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      console.log(error);
      return res.status(401).json({ error: "Token expirado" });
    }
    console.log(error);
    next(error);
  }
};

const handleGetUsers = async (req, res, next) => {
  try {
    const users = await usuarios.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const handleUpdateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email, password, nombre, apellido, telefono } = req.body;

    if (!email || !password || !nombre || !apellido || !telefono) {
      return res.status(400).json({ error: "Falta información" });
    }

    const user = await usuarios.updateUser(
      id,
      email,
      password,
      nombre,
      apellido,
      telefono
    );

    console.log(user);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    return res.status(200).json({
      message: "Usuario actualizado correctamente",
      user: {
        email: user.email,
        nombre: user.nombre,
        apellido: user.apellido,
        telefono: user.telefono,
      },
    });
  } catch (error) {
    next(error);
  }
};

const handleDeleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await usuarios.deleteUser(id);

    if (!result) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleLogin,
  handleRegister,
  handleGetUserById,
  handleGetUsers,
  handleUpdateUser,
  handleDeleteUser,
};
