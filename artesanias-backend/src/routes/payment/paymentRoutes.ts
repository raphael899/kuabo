import { Router } from "express";
import { creditCard } from "../../controllers/payment/payment";
const router = Router();

router.post('/pay', creditCard);



export default router