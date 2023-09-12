import { Request, Response } from 'express';
import Image  from '../../models/Image'; // Importa el modelo Image
import Product , {ProductAttributes} from '../../models/Product';
import slugify from 'slugify';
import fs from 'fs';

interface CreateResponse extends ProductAttributes {
    message: string;
}

interface ImageCreationAttributes {
  url: string;
  productId: number;
}

// Controlador para obtener todos los productos
async function getAllProducts(req: Request, res: Response<ProductAttributes[] | { message: string , error: any}>){
    try {
      const products = await Product.findAll();
      const response: ProductAttributes[] = products;
      res.status(200).json(response);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      res.status(500).json({ message: 'Error al obtener los productos' , error: error });
    }
}
  

// Controlador para crear un nuevo producto
async function createProduct(req: Request, res: Response<CreateResponse | { message: string, error: any } | {message:string}>) {
    try {
      const { name, description, price, stock , category ,rating ,numReviews } = req.body;
  
      if (!req.file) {
        // No se proporcionó ningún archivo
        return res.status(400).json({ message: 'No se proporcionó ninguna imagen' });
      }
  
      const file = req.file; // Obtiene la ruta de la imagen subida
  
      // Lógica adicional para guardar la ruta de la imagen en la base de datos o realizar cualquier otra acción necesaria
      const slug = slugify(name, { lower: true, strict: true });

  
      const product = await Product.create({ name, description, price, stock, image: `images/${file.filename}`, slug , category , rating , numReviews});
      const response: CreateResponse = {
        ...product.toJSON(),
        message: 'Product created'
      }
      res.json(response);
    } catch (error) {
      console.error('Error al crear el producto:', error);
      res.status(500).json({ message: 'Error al crear el producto', error: error });
    }
  }

  async function updateProduct(req: Request, res: Response<ProductAttributes | { message: string, error: any } | {message:string}>) {
    try {
      const { id } = req.params;
      const { name, description, price, stock , category ,rating ,numReviews } = req.body;
      const image = req.file;
  
      // Verificar si el producto existe en la base de datos
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
  
      // Validar si se proporcionó una nueva imagen
      if (image) {
        // Eliminar imagen anterior del servidor si se proporciona una nueva imagen
        const imagePath = product.image;
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath); // Eliminar archivo anterior
        }
  
        // Actualizar la imagen del producto
        product.image = `images/${image.filename}`;
      }
  
      // Actualizar los atributos del producto
      product.name = name;
      product.description = description;
      product.price = price;
      product.stock = stock;
      product.category = category;
      product.rating = rating;
      product.numReviews = numReviews;
      // Guardar los cambios en la base de datos
      await product.save();
  
      // Responder con el producto actualizado
      res.json(product);
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      res.status(500).json({ message: 'Error al actualizar el producto', error: error });
    }
  }

  async function getProduct(req: Request, res: Response<ProductAttributes | { message: string, error: any } | {message:string}> ) {
    try {
      const { id } = req.params;
  
      const product = await Product.findOne({
        where: { id },
        include: {
          model: Image,
          as: 'images',
        },
      });
  
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
  
      const response: ProductAttributes = {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        image: product.image,
        slug: product.slug,
        category: product.category,
        rating: product.rating,
        numReviews: product.numReviews,
        images: product.images
      };
  
      res.json(response);
    } catch (error) {
      console.error('Error al obtener el producto:', error);
      res.status(500).json({ message: 'Error al obtener el producto', error: error });
    }
  }
  
  
  

  async function deleteProduct(req: Request, res: Response<{ message: string, error: any } | {message:string}>) {
    try {
      const { id } = req.params;
      
      // Verificar si el producto existe en la base de datos
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
  
      // Obtener la ruta de la imagen del producto
      const imagePath = product.image;
  
      // Eliminar el producto de la base de datos
      await product.destroy();
  
      // Eliminar la imagen del servidor si existe
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
  
      res.json({ message: 'Producto eliminado' });
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      res.status(500).json({ message: 'Error al eliminar el producto', error: error });
    }
  }


  async function uploadImages(req: Request, res: Response<{ images: string[] } | { message: string, error: any } | { message: string }>) {
    try {
      if (!req.files || req.files.length === 0) {
        // No se proporcionaron archivos
        return res.status(400).json({ message: 'No se proporcionaron imágenes' });
      }
  
      // Obtener las rutas de las imágenes subidas
      const files = Array.isArray(req.files) ? req.files : [req.files];
      const imagePaths = files.map((file: any) => `images/${file.filename}`);
  
      // Lógica adicional para guardar las rutas de las imágenes en la base de datos o realizar cualquier otra acción necesaria
  
      const images: Image[] = [];
      for (const imagePath of imagePaths) {
        const image = await Image.create({ url: imagePath, productId: req.body.productId } as ImageCreationAttributes);
        images.push(image);
      }
  
      res.json({ images: imagePaths });
    } catch (error) {
      console.error('Error al subir las imágenes:', error);
      res.status(500).json({ message: 'Error al subir las imágenes', error: error });
    }
  }
  
  
// Otros controladores para actualizar, eliminar, etc. según tus necesidades

export { getAllProducts, createProduct ,updateProduct ,getProduct ,deleteProduct ,uploadImages};
