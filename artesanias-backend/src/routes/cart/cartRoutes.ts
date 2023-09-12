import  {Router} from 'express'
import { addToCart, clearCart } from '../../controllers/cart/cartController';

const router = Router();

router.post('/add' ,addToCart)

router.delete('/delete',clearCart)

export default router