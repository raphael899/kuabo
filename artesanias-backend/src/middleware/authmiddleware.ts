
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User   from '../models/User'; // Importa el modelo User si aún no lo has hecho
import dotenv from 'dotenv';
dotenv.config();
declare global {
    namespace Express {
      interface Request {
        user?: User;
      }
    }
}
  
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Obtén el token de la cabecera de la solicitud
      const token = req.headers.authorization?.split(' ')[1];
  
      if (!token) {
        return res.status(401).json({ message: 'No se proporcionó un token de autenticación' });
      }
  
      // Verifica y decodifica el token
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as { id: number, username: string };
  
      // Busca al usuario en la base de datos utilizando el ID del token
      const user = await User.findOne({ where: { id: decodedToken.id } });
  
      if (!user) {
        return res.status(401).json({ message: 'Usuario no encontrado' });
      }
  
      // Agrega el usuario al objeto de solicitud para que pueda ser utilizado en los controladores posteriores
      req.user = user;
  
      // Llama a next() para continuar con el siguiente middleware o controlador
      next();
    } catch (error) {
      console.error('Error de autenticación:', error);
      res.status(500).json({
        message: 'Error de autenticación',
        error: error,
      });
    }
  };
  

