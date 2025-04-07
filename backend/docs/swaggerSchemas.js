const schemas = {
  Usuario: {
    type: "object",
    properties: {
      id_usuario: {
        type: "integer",
        format: "int64",
        example: 1,
      },
      email: {
        type: "string",
        example: "ramon@gmail.com",
      },
      password: {
        type: "string",
        example: "ramon123",
      },
      nombre: {
        type: "string",
        example: "Ramón",
      },
      apellido: {
        type: "string",
        example: "Martinez",
      },
      telefono: {
        type: "string",
        example: "+1234567890",
      },
      rol: {
        type: "string",
        example: "cliente",
      },
      fecha_creacion: {
        type: "string",
        example: "2025-04-05T10:00:00",
      },
    },
    required: [
      "id_usuario",
      "email",
      "password",
      "nombre",
      "apellido",
      "telefono",
      "rol",
      "fecha_creacion",
    ],
  },
  Producto: {
    type: "object",
    properties: {
      id_producto: {
        type: "integer",
        format: "int64",
        example: 1,
      },
      nombre_producto: {
        type: "string",
        example: "Space Marine 2",
      },
      descripcion: {
        type: "string",
        example:
          "Usa las habilidades y brutalidad sobrehumanas de los marines espaciales. Usa habilidades letales y armamento devastador para aniquilar a los incesantes enjambres tiránidos. Defiende el Imperium en el modo solitario o multijugador en tercera persona.",
      },
      precio: {
        type: "number",
        format: "float",
        example: 35990,
      },
    },
    required: ["id_producto", "nombre_producto", "descripcion", "precio"],
  },
  Categoria: {
    type: "object",
    properties: {
      id_categoria: {
        type: "integer",
        format: "int64",
        example: 1,
      },
      nombre_categoria: {
        type: "string",
        example: "Accion",
      },
    },
    required: ["id_categoria", "nombre_categoria"],
  },
  ImagenProducto: {
    type: "object",
    properties: {
      id_imagen: {
        type: "integer",
        format: "int64",
        example: 1,
      },
      url: {
        type: "string",
        example: "https://i.postimg.cc/B6tXxz1Z/WH.jpg",
      },
    },
    required: ["id_imagen", "url"],
  },
  Pedido: {
    type: "object",
    properties: {
      id_compra: {
        type: "integer",
        format: "int64",
        example: 1,
      },
      id_usuario: {
        type: "integer",
        format: "int64",
        example: 1,
      },
      precio_total: {
        type: "number",
        format: "float",
        example: 71980,
      },
      detalle: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id_producto: {
              type: "integer",
              format: "int64",
              example: 1,
            },
            nombre_producto: {
              type: "string",
              example: "Space Marine 2",
            },
            cantidad: {
              type: "integer",
              format: "int64",
              example: 2,
            },
            precio_unitario: {
              type: "number",
              format: "float",
              example: 35990,
            },
            subtotal: {
              type: "number",
              format: "float",
              example: 71980,
            },
          },
          required: [
            "id_producto",
            "nombre_producto",
            "cantidad",
            "precio_unitario",
            "subtotal",
          ],
        },
      },
      email: {
        type: "string",
        example: "fernanda@gmail.com",
      },
      estado: {
        type: "string",
        example: "pending",
      },
      fecha_compra: {
        type: "string",
        example: "2025-04-06T14:00:00",
      },
      fecha_envio: {
        type: "string",
        example: "2025-04-06T14:30:00",
      },
    },
    required: [
      "id_compra",
      "id_usuario",
      "precio_total",
      "detalle",
      "email",
      "estado",
      "fecha_compra",
    ],
  },
  Error: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "El correo no esta registrado",
      },
      code: {
        type: "integer",
        example: 404,
      },
    },
    required: ["error"],
  },
};
