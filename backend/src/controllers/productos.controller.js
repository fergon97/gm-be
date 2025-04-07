const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllImagenes,
  getImagenesByIdProducto,
  getAllCategorias,
  getProductsByCategoria,
} = require("../models/productosModel");

const handleGetAllProducts = async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);

    if (!products) {
      return res.status(404).json({ error: "No hay juegos" });
    }
  } catch (error) {
    next(error);
  }
};

const handleGetProductById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await getProductById(id);

    if (!product) {
      return res.status(404).json({ error: "Juego no encontrado" });
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

const handleCreateProduct = async (req, res, next) => {
  const { nombre_producto, descripcion, precio } = req.body;

  if (!nombre_producto || !descripcion || !precio) {
    return res.status(400).json({ error: "Falta información" });
  }
  try {
    const product = await createProduct(nombre_producto, descripcion, precio);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

const handleUpdateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { nombre_producto, descripcion, precio } = req.body;

  if (!nombre_producto || !descripcion || !precio) {
    return res.status(400).json({ error: "Falta información" });
  }
  try {
    const product = await updateProduct(
      id,
      nombre_producto,
      descripcion,
      precio
    );

    if (!product) {
      return res.status(404).json({ error: "Juego no encontrado" });
    }

    res.status(200).json({ message: "Juego actualizado", product });
  } catch (error) {
    next(error);
  }
};

const handleDeleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await deleteProduct(id);

    if (!product) {
      return res.status(404).json({ error: "Juego no encontrado" });
    }

    res.status(200).json({ message: "Juego eliminado" });
  } catch (error) {
    next(error);
  }
};

const handleGetImagenes = async (req, res, next) => {
  try {
    const imagenes = await getAllImagenes();
    res.status(200).json(imagenes);
  } catch (error) {
    next(error);
  }
};

const handleGetImagenesByIdProducto = async (req, res, next) => {
  const { id } = req.params;
  try {
    const imagenes = await getImagenesByIdProducto(id);
    res.status(200).json(imagenes);
  } catch (error) {
    next(error);
  }
};

const handleGetProductsByCategoria = async (req, res, next) => {
  const { id } = req.params;
  try {
    const productos = await getProductsByCategoria(id);
    res.status(200).json(productos);
  } catch (error) {
    next(error);
  }
};

const handleGetAllCategorias = async (req, res, next) => {
  try {
    const categorias = await getAllCategorias();
    res.status(200).json(categorias);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleCreateProduct,
  handleGetAllProducts,
  handleGetProductById,
  handleUpdateProduct,
  handleDeleteProduct,
  handleGetImagenes,
  handleGetImagenesByIdProducto,
  handleGetProductsByCategoria,
  handleGetAllCategorias,
};
