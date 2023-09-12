import {Router} from 'express';
import { createOrder, getAllOrder, getOrderDetails } from '../../controllers/order/order';

const router = Router();
router.post('/create',createOrder);
router.get('/orderDetail/:orderId',getOrderDetails);
router.get('/',getAllOrder);


export default router;