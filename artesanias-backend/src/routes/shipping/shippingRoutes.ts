import {Router} from 'express'
import { addShippingAddress, getAllShippingAddress, getShippingAddressById } from '../../controllers/shipping/shipping'
const router = Router()

router.post('/add',addShippingAddress)

router.get('/myAddresses',getAllShippingAddress)

router.get('/myAddress/:id',getShippingAddressById)

router.put('/edit/:id',getShippingAddressById)


export default router