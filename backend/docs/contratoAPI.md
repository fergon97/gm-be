### Rutas Públicas\*\*

**GET** `/productos`
**Descripción:** Listado de todos los juegos disponibles.
**Respuesta exitosa:** `200 OK`

```json
[
  {
    "id": 1,
    "nombre": "Space Marine 2",
    "descripcion": "Usa las habilidades y brutalidad sobrehumanas de los marines espaciales. Usa habilidades letales y armamento devastador para aniquilar a los incesantes enjambres tiránidos. Defiende el Imperium en el modo solitario o multijugador en tercera persona.",
    "precio": 35990,
    "categoria": "accion",
    "imagenes": ["https://i.postimg.cc/B6tXxz1Z/WH.jpg"]
  },
  {
    "id": 2,
    "nombre": "Dark Souls III",
    "descripcion": "Dark Souls continúa redefiniendo los límites con el nuevo y ambicioso capítulo de esta serie revolucionaria, tan aclamada por la crítica. ¡Prepárate para sumergirte en la oscuridad!",
    "precio": 15990,
    "categoria": "rol",
    "imagenes": ["https://cdn.plantify.com/cactus1.jpg"]
  },
  {
    "id": 3,
    "nombre": "RE 2 Remake",
    "descripcion": "Publicado originalmente en 1998, Resident Evil 2, uno de los juegos más icónicos de todos los tiempos, regresa completamente reinventado para las consolas de nueva generación.",
    "precio": 19990,
    "categoria": "terror",
    "imagenes": ["https://i.postimg.cc/KYGKYjGM/R-E-2.jpg"]
  },
  {
    "id": 4,
    "nombre": "Halo Infinite",
    "descripcion": "Halo, una de las sagas más icónicas de los videojuegos, es ahora más grande que nunca e incluye una amplia campaña de mundo abierto y una dinámica experiencia multijugador gratuita.",
    "precio": 14990,
    "categoria": "accion",
    "imagenes": ["https://i.postimg.cc/DyG4jRp8/H-I.jpg"]
  },
  {
    "id": 5,
    "nombre": "Hogwarts Legacy",
    "descripcion": "Hogwarts Legacy es un RPG inmersivo de acción en mundo abierto. Ahora puedes tomar el control de la acción y ser el centro de tu propia aventura en el mundo mágico.",
    "precio": 25990,
    "categoria": "rol",
    "imagenes": ["https://i.postimg.cc/6pN2DzFz/H-L.jpg"]
  },
  {
    "id": 6,
    "nombre": "COD: Black Ops 6",
    "descripcion": "Call of Duty®: Black Ops 6 es el Black Ops auténtico, con una campaña cinemática individual, la mejor experiencia Multijugador de su clase y el épico regreso de Zombis por rondas.",
    "precio": 35990,
    "categoria": "accion",
    "imagenes": ["https://i.postimg.cc/2ybLftz9/C-O-D-B-O.jpg"]
  },
  {
    "id": 7,
    "nombre": "The last of us",
    "descripcion": "Descubre el galardonado juego que inspiró la aclamada serie de televisión. Guía a Joel y Ellie por unos Estados Unidos postapocalípticos y encuentra aliados y enemigos inolvidables en The Last of Us",
    "precio": 16990,
    "categoria": "terror",
    "imagenes": ["https://i.postimg.cc/mrmP14k6/T-L-O-U.jpg"]
  },
  {
    "id": 8,
    "nombre": "Diablo IV",
    "descripcion": "Explora Santuario en solitario o en compañía mientras avanzas en la fascinante campaña de Diablo IV, aceptando misiones, liberando ciudades y luchando contra jefes épicos. Al más puro estilo Diablo, te aguarda un juego avanzado y expansivo, en el que podrás reunirte con otros jugadores en el mundo compartido del juego para intercambiar, formar un equipo o probar tu poder en zonas JcJ sin sala. El juego cruzado, la progresión cruzada y el cooperativo de sofá te permiten continuar la aventura cuando quieras y desde donde sea.",
    "precio": 29990,
    "categoria": "rol",
    "imagenes": ["https://i.postimg.cc/nryjV1rF/D-IV.jpg"]
  },
  {
    "id": 9,
    "nombre": "Indika",
    "descripcion": "Juega en 3.ª persona y vive una historia ambientada en una Rusia alternativa de finales del siglo XIX en la que las visiones religiosas colisionan con la dura realidad. INDIKA narra el viaje de autodescubrimiento de una joven monja con un compañero de lo más inusual: el diablo.",
    "precio": 9990,
    "categoria": "terror",
    "imagenes": ["https://i.postimg.cc/2SFbmhDY/IK.jpg"]
  },
  {
    "id": 10,
    "nombre": "AC Valhalla",
    "descripcion": "Assassins Creed Valhalla es un videojuego de rol de acción desarrollado por Ubisoft Montreal y publicado por Ubisoft. Es el decimosegundo en importancia y el vigesimosegundo lanzado dentro de la saga de Assassin Creed, y sucesor al juego del 2018 Assassins Creed Odyssey.",
    "precio": 21990,
    "categoria": "rol",
    "imagenes": ["https://i.postimg.cc/tTmnwbHV/A-V.jpg"]
  }
]
```

**GET** `/productos/{id}`
**Descripción:** Devuelve detalles particulares del juego.
**Respuesta exitosa:** `200 OK`

```json
{
  "id": 1,
  "nombre": "Space Marine 2",
  "descripcion": "Usa las habilidades y brutalidad sobrehumanas de los marines espaciales. Usa habilidades letales y armamento devastador para aniquilar a los incesantes enjambres tiránidos. Defiende el Imperium en el modo solitario o multijugador en tercera persona.",
  "precio": 35990,
  "categoria": "accion",
  "imagenes": ["https://i.postimg.cc/B6tXxz1Z/WH.jpg"]
}
```

**Errores**

- Producto no encontrado: `404 Not Found`
  ```json
  {
    "error": "Producto no encontrado"
  }
  ```

#### **Inicio Sesión**

- **POST** `/auth/login`
- **Descripción:** Autenticación en el sistema.
- **Body:**
  ```json
  {
    "email": "fernanda@gmail.com",
    "password": "pass1234"
  }
  ```
- **Respuesta exitosa:** `200 OK`
  ```json
  {
    "token": "jwt_token_aqui"
  }
  ```
- **Errores:**
  - Datos incorrectos (email o password): `401 Unauthorized`
    ```json
    {
      "error": "Correo electrónico o contraseña incorrectos"
    }
    ```
  - Campos faltantes: `400 Bad Request`
    ```json
    {
      "error": "El correo electrónico y la contraseña son obligatorios"
    }
    ```

#### **Registro de Usuarios**

- **POST** `/auth/registro`
- **Descripción:** Permite a un nuevo usuario registrarse en el sistema.
- **Body:**
  ```json
  {
    "email": "fernanda@gmail.com",
    "password": "pass1234",
    "nombre": "Fernanda Rojas",
    "telefono": "123456789"
  }
  ```
- **Respuesta exitosa:** `201 Created`
  ```json
  {
    "message": "Usuario registrado con éxito"
  }
  ```
- **Errores:**
  - Campos faltantes: `400 Bad Request`
    ```json
    {
      "error": "Todos los campos son obligatorios"
    }
    ```
  - Correo electrónico ya registrado: `409 Conflict`
    ```json
    {
      "error": "El correo electrónico ya está registrado"
    }
    ```

### Rutas Privadas\*\*

#### **Carrito**

- **GET** `/pedidos/pedido/{id_compra}`
- **Descripción:** Devuelve los juegos agregados al carrito.
- **Headers:** `Authorization: Bearer <jwt_token>`
- **Respuesta exitosa:** `200 OK`
  ```json
  {
    "carrito": [
      {
        "productoId": 1,
        "nombre": "Space Marine 2",
        "cantidad": 2,
        "precio": 35990
      }
    ]
  }
  ```

#### **Pago**

- **POST** `/pedidos`
- **Descripción:** Compra
- **Headers:** `Authorization: Bearer <jwt_token>`
- **Body:**
  ```json
  {
    "email": "fernanda@gmail.com",
    "metodoPago": "tarjeta_credito"
  }
  ```
- **Respuesta exitosa:** `200 OK`
  ```json
  {
    "ordenId": 101,
    "total": 71980,
    "estado": "pendiente"
  }
  ```

#### **Historial de Compras**

- **GET** `/pedidos/usuario/{id_usuario}`
- **Descripción:** Devuelve el historial de compras.
- **Headers:** `Authorization: Bearer <jwt_token>`
- **Respuesta exitosa:** `200 OK`
  ```json
  {
    "usuarioId": 1,
    "compras": [
      {
        "ordenId": 101,
        "fecha": "2025-04-06T15:30:00Z",
        "total": 71980,
        "estado": "completada",
        "productos": [
          {
            "id": 1,
            "nombre": "Space Marine 2",
            "cantidad": 2,
            "precio": 35990
          }
        ]
      }
    ]
  }
  ```

---

### **Rutas de Admin**

#### **Subir Productos**

- **POST** `/productos`
- **Descripción:** Permite al administrador subir un nuevo item a la página.
- **Headers:** `Authorization: Bearer <jwt_token>`
- **Body:**
  ```json
  {
    "nombre": "God of War Ragnarok",
    "descripcion": "Kratos y Atreus se embarcan en una mítica aventura en busca de respuestas y aliados antes de la llegada del Ragnarök. Ahora también en PC.",
    "precio": 41990,
    "categoria": "rol",
    "imagenes": ["https://cdn.plantify.com/orquidea1.jpg"]
  }
  ```
- **Respuesta exitosa:** `201 Created`
  ```json
  {
    "message": "Producto creado con éxito",
    "productoId": 11
  }
  ```
- **Errores:**
  - Permisos insuficientes: `403 Forbidden`
    ```json
    {
      "error": "Permisos insuficientes"
    }
    ```
  - Datos incompletos o inválidos: `400 Bad Request`
    ```json
    {
      "error": "Todos los campos son obligatorios"
    }
    ```

#### **Historial de Ventas**

- **GET** `/pedidos/`
- **Descripción:** Devuelve un historial de ventas.
- **Headers:** `Authorization: Bearer <jwt_token>`
- **Respuesta exitosa:** `200 OK`
  ```json
  {
    "ventas": [
      {
        "ordenId": 101,
        "fecha": "2025-04-06T15:30:00Z",
        "cliente": {
          "id": 1,
          "nombre": "Fernanda"
        },
        "total": 71980,
        "productos": [
          {
            "id": 1,
            "nombre": "Space Marine 2",
            "cantidad": 2,
            "precio": 35990
          }
        ]
      }
    ]
  }
  ```
