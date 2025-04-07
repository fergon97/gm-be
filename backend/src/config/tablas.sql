CREATE DATABASE gamemasters;
\c gamemasters;

-- Tabla de usuarios
CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    telefono VARCHAR(30),
    rol VARCHAR(20) CHECK (rol IN ('admin', 'cliente')) DEFAULT 'cliente',
    imagen_perfil TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar usuarios
INSERT INTO usuarios (id_usuario, email, password, nombre, apellido, telefono, rol, fecha_creacion)
VALUES 
(1, 'fernanda@gmail.com', 'hashed_password_admin', 'Fernanda', 'Rojas', '+1234567890', 'admin', '2025-04-05T10:00:00');

INSERT INTO usuarios (id_usuario, email, password, nombre, apellido, telefono, rol, fecha_creacion)
VALUES 
(2, 'ramon@gmail.com', 'hashed_password_cliente1', 'Ramóm', 'Martinez', '+9876543210', 'cliente',  '2025-04-05T10:00:00');

INSERT INTO usuarios (id_usuario, email, password, nombre, apellido, telefono, rol, fecha_creacion)
VALUES 
(3, 'fernando@gmail.com', 'hashed_password_cliente2', 'Fernando', 'González', '+1122334455', 'cliente',  '2025-04-05T10:00:00');

-- Tabla de productos
CREATE TABLE productos (
    id_producto SERIAL PRIMARY KEY,
    nombre_producto VARCHAR(255) NOT NULL UNIQUE,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL CHECK (precio >= 0)
);

INSERT INTO productos (id_producto, nombre_producto, descripcion, precio) VALUES
(1, 'Space Marine 2', 'Usa las habilidades y brutalidad sobrehumanas de los marines espaciales. Usa habilidades letales y armamento devastador para aniquilar a los incesantes enjambres tiránidos. Defiende el Imperium en el modo solitario o multijugador en tercera persona.', 35990),
(2, 'Dark Souls III', 'Dark Souls continúa redefiniendo los límites con el nuevo y ambicioso capítulo de esta serie revolucionaria, tan aclamada por la crítica. ¡Prepárate para sumergirte en la oscuridad!', 15990),
(3, 'RE 2 Remake', 'Publicado originalmente en 1998, Resident Evil 2, uno de los juegos más icónicos de todos los tiempos, regresa completamente reinventado para las consolas de nueva generación.', 19990),
(4, 'Halo Infinite', 'Halo, una de las sagas más icónicas de los videojuegos, es ahora más grande que nunca e incluye una amplia campaña de mundo abierto y una dinámica experiencia multijugador gratuita.', 14990),
(5, 'Hogwarts Legacy', 'Hogwarts Legacy es un RPG inmersivo de acción en mundo abierto. Ahora puedes tomar el control de la acción y ser el centro de tu propia aventura en el mundo mágico.', 25990),
(6, 'COD: Black Ops 6', 'Call of Duty®: Black Ops 6 es el Black Ops auténtico, con una campaña cinemática individual, la mejor experiencia Multijugador de su clase y el épico regreso de Zombis por rondas.', 35990),
(7, 'The last of us', 'Descubre el galardonado juego que inspiró la aclamada serie de televisión. Guía a Joel y Ellie por unos Estados Unidos postapocalípticos y encuentra aliados y enemigos inolvidables en The Last of Us', 16990),
(8, 'Diablo IV', 'Explora Santuario en solitario o en compañía mientras avanzas en la fascinante campaña de Diablo IV, aceptando misiones, liberando ciudades y luchando contra jefes épicos. Al más puro estilo Diablo, te aguarda un juego avanzado y expansivo, en el que podrás reunirte con otros jugadores en el mundo compartido del juego para intercambiar, formar un equipo o probar tu poder en zonas JcJ sin sala. El juego cruzado, la progresión cruzada y el cooperativo de sofá te permiten continuar la aventura cuando quieras y desde donde sea.', 29990),
(9, 'Indika', 'Juega en 3.ª persona y vive una historia ambientada en una Rusia alternativa de finales del siglo XIX en la que las visiones religiosas colisionan con la dura realidad. INDIKA narra el viaje de autodescubrimiento de una joven monja con un compañero de lo más inusual: el diablo.', 9990),
(10, 'AC Valhalla', 'Assassins Creed Valhalla es un videojuego de rol de acción desarrollado por Ubisoft Montreal y publicado por Ubisoft. Es el decimosegundo en importancia y el vigesimosegundo lanzado dentro de la saga de Assassin Creed, y sucesor al juego del 2018 Assassins Creed Odyssey.', 21990);

-- Tabla de categorías
CREATE TABLE categorias (
    id_categoria SERIAL PRIMARY KEY,
    nombre_categoria VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO categorias (id_categoria, nombre_categoria) VALUES
(1, 'Accion'),
(2, 'Terror'),
(3, 'Rol');


-- Tabla intermedia productos (juegos)-categorías
CREATE TABLE categorias_productos (
    id_producto INT REFERENCES productos(id_producto) ON DELETE CASCADE,
    id_categoria INT REFERENCES categorias(id_categoria) ON DELETE CASCADE,
    PRIMARY KEY (id_producto, id_categoria)
);
-- Juego 1: Space Marine 2
INSERT INTO categorias_productos (id_producto, id_categoria) VALUES
(1, 1);

-- Juego 2: Dark Souls III
INSERT INTO categorias_productos (id_producto, id_categoria) VALUES
(2, 3);

-- Juego 3: RE 2 Remake
INSERT INTO categorias_productos (id_producto, id_categoria) VALUES
(3, 2);

-- Juego 4: Halo Infinite
INSERT INTO categorias_productos (id_producto, id_categoria) VALUES
(4, 1);

-- Juego 5: Hogwarts Legacy
INSERT INTO categorias_productos (id_producto, id_categoria) VALUES
(5, 3);

-- Juego 6: COD: Black Ops 6
INSERT INTO categorias_productos (id_producto, id_categoria) VALUES
(6, 1);

-- Juego 7: The last of us
INSERT INTO categorias_productos (id_producto, id_categoria) VALUES
(7, 2);

-- Juego 8: Diablo IV
INSERT INTO categorias_productos (id_producto, id_categoria) VALUES
(8, 3);

-- Juego 9: Indika
INSERT INTO categorias_productos (id_producto, id_categoria) VALUES
(9, 2);

-- Juego 10: AC Valhalla
INSERT INTO categorias_productos (id_producto, id_categoria) VALUES
(10, 3);

-- Tabla para imágenes de juegos 
CREATE TABLE imagenes_producto (
    id_imagen SERIAL PRIMARY KEY,
    id_producto INT REFERENCES productos(id_producto) ON DELETE CASCADE,
    url TEXT NOT NULL
);

-- Insertar imagen para el juego 1
INSERT INTO imagenes_producto (id_producto, url)
VALUES (1, 'https://i.postimg.cc/B6tXxz1Z/WH.jpg');

-- Insertar imagen para el juego 2
INSERT INTO imagenes_producto (id_producto, url)
VALUES (2, 'https://i.postimg.cc/kMzty7c0/D-S-3.jpg');

-- Insertar imagen para el juego 3
INSERT INTO imagenes_producto (id_producto, url)
VALUES (3, 'https://i.postimg.cc/KYGKYjGM/R-E-2.jpg');

-- Insertar imagen para el juego 4
INSERT INTO imagenes_producto (id_producto, url)
VALUES (4, 'https://i.postimg.cc/DyG4jRp8/H-I.jpg');

-- Insertar imagen para el juego 5
INSERT INTO imagenes_producto (id_producto, url)
VALUES (5, 'https://i.postimg.cc/6pN2DzFz/H-L.jpg');

-- Insertar imagen para el juego 6
INSERT INTO imagenes_producto (id_producto, url)
VALUES (6, 'https://i.postimg.cc/2ybLftz9/C-O-D-B-O.jpg');

-- Insertar imagen para el juego 7
INSERT INTO imagenes_producto (id_producto, url)
VALUES (7, 'https://i.postimg.cc/mrmP14k6/T-L-O-U.jpg');

-- Insertar imagen para el juego 8
INSERT INTO imagenes_producto (id_producto, url)
VALUES (8, 'https://i.postimg.cc/nryjV1rF/D-IV.jpg');

-- Insertar imagen para el juego 9
INSERT INTO imagenes_producto (id_producto, url)
VALUES (9, 'https://i.postimg.cc/2SFbmhDY/IK.jpg');

-- Insertar imagen para el juego 10
INSERT INTO imagenes_producto (id_producto, url)
VALUES (10, 'https://i.postimg.cc/tTmnwbHV/A-V.jpg');

-- Insertar imagen para el juego 11
INSERT INTO imagenes_producto (id_producto, url)
VALUES (11, 'https://i.postimg.cc/02g2Tk9j/GOW-R.png');


-- Tabla de compras 
CREATE TABLE orders (
    id_compra SERIAL PRIMARY KEY,
    id_usuario INT REFERENCES usuarios(id_usuario) ON DELETE SET NULL,
    precio_total DECIMAL(10, 2) NOT NULL CHECK (precio_total >= 0),
    detalle JSONB NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    estado VARCHAR(50) CHECK (estado IN ('pending', 'cancelled', 'completed')) DEFAULT 'pending',
    fecha_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_envio TIMESTAMP 
);

-- Insertar primera compra
INSERT INTO orders (id_compra, id_usuario, precio_total, detalle, email, estado, fecha_compra)
VALUES 
(1, 2, 71980, 
'[
    {"id_producto": 1, "nombre_producto": "Space Marine 2", "cantidad": 2, "precio_unitario": 35990, "subtotal": 71980}
]', 
'ramon@gmail.com',
'pending', 
'2025-04-06T15:30:00');


