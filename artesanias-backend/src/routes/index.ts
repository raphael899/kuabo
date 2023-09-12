import {Router} from 'express';
const router = Router();
import usersRoutes from './user/userRoutes';
import productsRoutes from './products/productsRoutes';
import cartRoutes from './cart/cartRoutes';
import shippingRoutes from './shipping/shippingRoutes';
import paymnet from './payment/paymentRoutes';
import {authMiddleware} from '../middleware/authmiddleware'
import orderRoutes from './order/orderRoutes';


router.use('/users', usersRoutes);
router.use('/product', productsRoutes);
router.use('/cart', cartRoutes);
router.use('/shipping',authMiddleware,shippingRoutes);
router.use('/order',authMiddleware,orderRoutes);
router.use('/payment',authMiddleware,paymnet);


export default router