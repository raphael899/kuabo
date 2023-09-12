-- Crear la base de datos 'artesanias_magicas' si no existe
CREATE DATABASE IF NOT EXISTS artesanias_magicas;

-- Seleccionar la base de datos recién creada
USE artesanias_magicas;

CREATE TABLE IF NOT EXISTS Products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock INT NOT NULL,
  image VARCHAR(255),
  slug VARCHAR(255) NOT NULL,
  createdAt DATETIME,
  updatedAt DATETIME,
  category VARCHAR(255),
  rating DECIMAL(3, 2),
  numReviews INT
);

INSERT INTO Products (name, description, price, stock, image,slug,createdAt, updatedAt, category, rating,numReviews)
VALUES
  ('Arco pequeño', 'El arco pequeño es una pieza artesanal exquisitamente diseñada, creada con pasión y dedicación por nuestros expertos artesanos. Su tamaño compacto lo hace ideal para aquellos que buscan una experiencia de tiro con arco más ligera y portátil.', 12.00, 78, 'images/1688935359658-WhatsApp Image 2023-07-04 at 18.24.21.jpeg', 'porta-flechas', '2023-07-09 20:42:39', '2023-08-03 04:27:22', 'Porta Flechas', 1.00, 2),
  ('Portaesferos grande', 'Nuestro portaesferos artesanal es una pieza única y encantadora que combina funcionalidad y belleza en una sola creación. Cada portaesferos es cuidadosamente elaborado a mano por nuestros talentosos artesanos, quienes ponen especial atención en cada detalle para asegurar que cada pieza sea una obra de arte.', 27.00, 996, 'images/1690727786857-Picture8.png', 'porta-furtas', '2023-07-09 20:44:26', '2023-08-02 04:20:58', 'Porta frutas artesanal', 4.00, 2),
  ('Fruteros', 'Nuestro frutero artesanal es una auténtica obra de arte hecha a mano por talentosos artesanos. Cada pieza es única y refleja la belleza y calidez de la madera natural, convirtiéndolo en un elemento distintivo y elegante para tu hogar.', 87.00, 73, 'images/1688935496391-WhatsApp Image 2023-07-04 at 22.00.43.jpeg', 'porta-furtas-2', '2023-07-09 20:44:56', '2023-08-03 04:27:22', 'Porta frutas artesanal', 3.00, 1),
  ('Guapas', 'Nuestra guapa artesanal es una verdadera obra de arte, confeccionado con pasión y dedicación por talentosos artesanos. Cada pieza es cuidadosamente diseñada y creada a mano, lo que le otorga un encanto y una personalidad únicos que te harán destacar con elegancia en cualquier ocasión.',95.00, 91,'images/1688935928536-WhatsApp Image 2023-07-04 at 21.58.06.jpeg', 'mantel-artesanal', '2023-07-09 20:52:08', '2023-08-18 15:51:59', 'Mantel Artesanal',5.00, 1),
  ('Individuales de mesa x6', 'Cada individual está confeccionado con materiales de alta calidad, y su diseño artesanal refleja el cuidado y la dedicación que se ha puesto en cada detalle. Estos individuales son perfectos para añadir un toque de elegancia y calidez a cualquier comedor o espacio de reunión.', 60.22, 9999, 'images/1690733195695-Picture4.png', 'individuales-de-mesa-x6', '2023-07-30 16:06:35', '2023-08-18 15:51:59', 'Individuales', NULL, 1),
  ('Mochila', 'Las mochilas artesanales son productos únicos y hechos a mano que combinan estilo, tradición y calidad. Estas mochilas son confeccionadas por artesanos que utilizan técnicas tradicionales y materiales naturales para crear piezas auténticas y originales.', 25.35, 9998, 'images/1690735918927-Picture6.png', 'mochila', '2023-07-30 16:51:58', '2023-07-30 19:39:11', 'Mochilas', NULL, 1),
  ('Bolsos', 'Nuestros bolsos artesanales son más que simples accesorios; son una expresión de la cultura y el patrimonio de nuestras comunidades. Cada diseño presenta detalles únicos y patrones cautivadores que reflejan la diversidad de nuestras raíces culturales y la belleza de la artesanía auténtica.', 78.00, 10000, 'images/1690755193648-WhatsApp Image 2023-07-24 at 15.47.15.jpeg', 'bolsos', '2023-07-30 22:13:13', '2023-07-30 22:13:13', 'Bolsos', NULL, 1);
