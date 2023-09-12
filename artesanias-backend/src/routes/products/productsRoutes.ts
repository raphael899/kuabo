import {Router} from 'express';
import multer from 'multer'; // Importa el middleware multer para gestionar la subida de archivos
import { createProduct ,deleteProduct,getAllProducts, getProduct, updateProduct, uploadImages } from '../../controllers/products/productsController';
const path = require("path");

const router = Router();

// Configura el almacenamiento de multer
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, path.relative('.', 'public/images/'))
  },
  filename: function (req, file, cb) {
      const date = Date.now();
      /* file.originalname = `${date}-${file.originalname}`;
      cb(null, file.originalname) */

      cb(null, `${date}-${file.originalname}`);
  }
});

// Crea el middleware multer con la configuración de almacenamiento
const upload = multer({ storage });

// Ruta para subir la imagen del producto
router.post('/create', upload.single('image'),createProduct);
router.post('/uploadPhotos', upload.array('images'), uploadImages);
router.put('/update/:id', upload.single('image'), updateProduct);
router.get('/',getAllProducts);
router.get('/:id',getProduct);
router.delete('/:id',deleteProduct);




export default router;