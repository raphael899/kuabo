import { Router } from 'express';
import { createUser ,login, updateUser} from '../../controllers/users/userController';
import {authMiddleware} from '../../middleware/authmiddleware'

const router = Router();

router.post('/login', login);

router.get('/:id', (req, res) => {
  const userId = req.params.id;
  // Lógica para obtener los detalles del usuario con el ID proporcionado
  res.send(`Detalles del usuario ${userId}`);
});

router.post('/signup',createUser);

router.put('/profile',authMiddleware , updateUser);

router.delete('/:id', (req, res) => {
  const userId = req.params.id;
  // Lógica para eliminar el usuario con el ID proporcionado
  res.send(`Usuario ${userId} eliminado`);
});

export default router;
