import Cart, { CartAttributes } from "../../models/Cart";
import { Request, Response } from 'express';

export const addToCart = async (req: Request, res: Response<CartAttributes[] | { message: string, error: any }>) => {
    try {
      const { products } = req.body; // Assuming an array of products is sent in the request body
  
      const cartItems: CartAttributes[] = products.map((product: any) => ({
        productId: product.productId,
        userId: product.userId,
        quantity: product.quantity,
      }));
  
      let createdCartItems;
      try {
        createdCartItems = await Cart.bulkCreate(cartItems);
      } catch (error) {
        res.status(500).json({
            message: 'Error al crear los elementos en el carrito',
            error: error
          });
      }
      
      res.status(200).json(createdCartItems);
    } catch (error) {
      res.status(500).json({
        message: 'Unable to add the products to the cart',
        error: error
      });
    }
  };
  
export const clearCart = async (req:Request, res:Response<{message:string}|{ message: string, error: any }>) => {
    try {

      const {userId} = req.body;
      // Eliminar todos los productos del carrito del usuario
      await Cart.destroy({
        where: {
          userId,
        },
      });
  
      res.status(200).json({
        message:'Carrito de compras vaciado exitosamente'
      })
    } catch (error) {
        res.status(400).json({
            message:'Error al vaciar el carrito de compras',
            error:error
        })
    }
};