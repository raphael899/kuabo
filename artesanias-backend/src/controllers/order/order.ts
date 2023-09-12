import { Request, Response } from 'express';
import Order from '../../models/Order';
import OrderItem from '../../models/OrderItem';
import Payment from '../../models/Payment';
import Product from '../../models/Product';
import Shipping from '../../models/Shipping';
import User from '../../models/User';

declare global {
    namespace Express {
      interface Request {
        user?: User;
      }
    }
  }

export const createOrder = async (req: Request, res: Response) => {
  try {
    const {
      items,
      shipping,
      payment,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      isPaid,
      paidAt,
      isDelivered,
      deliveredAt,
    } = req.body;

    // Obtener el ID del usuario del token
    const userId = req.user?.id;

    // Buscar la dirección del usuario en la tabla Shippings
    const userShipping = await Shipping.findOne({
      where: {
        userId: userId,
        address: shipping.address, // O cualquier otro campo que identifique la dirección
      },
    });

    if (!userShipping) {
      return res.status(400).json({
        message: 'La dirección de envío no coincide con la del usuario',
      });
    }

    // Crear objetos de Shipping y Payment en paralelo
    const [paymentData] = await Promise.all([
      Payment.create(payment),
    ]);

    // Crear la orden y asignar las relaciones
    const order = await Order.create({
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      isPaid,
      paidAt,
      isDelivered,
      deliveredAt,
      shippingId: userShipping.id, // Utilizamos el ID de la dirección del usuario
      paymentId: paymentData.id,
    });

    // Crear los registros de OrderItem para los productos en paralelo
    await Promise.all(
      items.map(async (item: { orderId: number; productId: number; quantity: number }) => {
        // Obtener el producto correspondiente
        const product = await Product.findByPk(item.productId);
        if (product) {
          // Restar la cantidad comprada del stock del producto
          const remainingStock = Math.max(product.stock - item.quantity, 0);
          product.stock = remainingStock;
          await product.save();
        }

        // Crear el registro de OrderItem
        await OrderItem.create({
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
        });
      })
    );

    res.status(200).json({
      message: 'Success',
      orderId: order,
    });
  } catch (error) {
    console.error('Error al crear la orden:', error);
    res.status(500).json({
      message: 'Error al crear la orden',
      error: error,
    });
  }
};



export const getOrderDetails = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.orderId;

    const order = await Order.findByPk(orderId, {
      include: [
        {
          model: OrderItem,
          as: 'orders', // Especificamos el alias aquí
          include: [
            { model: Product, as: 'products' } // Cargar los productos asociados a los OrderItems
          ]
        },
        { model: Shipping, as: 'shipping' }, // Cargar el detalle de Shipping
        { model: Payment, as: 'payment' } // Cargar el detalle de Paymen
      ]
    });

    if (!order) {
      return res.status(404).json({ message: 'Orden no encontrada' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error('Error al obtener el detalle de la orden:', error);
    res.status(500).json({
      message: 'Error al obtener el detalle de la orden',
      error: error
    });
  }
};



  
  
export const getAllOrder = async (req: Request, res: Response) => {
  try {

   const orders = await Order.findAll({
      include: [
        {
          model: OrderItem,
          as: 'orders', // Especificamos el alias aquí
          include: [
            { model: Product, as: 'products' } // Cargar los productos asociados a los OrderItems
          ]
        },
        { model: Shipping, as: 'shipping' }, // Cargar el detalle de Shipping
        { model: Payment, as: 'payment' } // Cargar el detalle de Paymen
      ]
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error al obtener las ordenes:', error);
    res.status(500).json({
      message: 'Error al obtener las orden',
      error: error
    });
  }
};