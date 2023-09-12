import { Request, Response } from 'express';
import User ,{UserAttributes} from '../../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

interface CreateUserResponse extends UserAttributes {
       message: string;
       token: string;
}

interface ErrorResponse extends UserAttributes {
       errors:string[];
}

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

async function createUser(req: Request<{}, {}, UserAttributes>, res: Response<CreateUserResponse |ErrorResponse |{ message: string, err: any }>) {
  try {
    const { name, lastname, password, email, username } = req.body;
    const errors: string[] = [];
    
    // Verificar que todos los campos obligatorios estén presentes
    if (!name) {
      errors.push('Por favor, agrega el nombre');
    }
    
    if (!lastname) {
      errors.push('Por favor, agrega el apellido');
    }
    
    if (!password) {
      errors.push('Por favor, agrega la contraseña');
    }
    
    if (!email) {
      errors.push('Por favor, agrega el correo electrónico');
    }
    
    if (!username) {
      errors.push('Por favor, agrega el nombre de usuario');
    }
    
    // Verificar si el correo electrónico ya está en uso
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      errors.push('El correo electrónico ya está en uso');
    }
    
    // Verificar si el nombre de usuario ya está en uso
    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      errors.push('El nombre de usuario ya está en uso');
    }
    
    // Verificar que la contraseña cumpla con los requisitos
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      errors.push('La contraseña debe tener al menos 8 caracteres y contener al menos una letra mayúscula');
    }
    
    if (errors.length > 0) {
      return res.status(400).json({ errors } as ErrorResponse);
    }
    
    // Generar el hash de la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Crear el usuario con la contraseña encriptada
    const user = await User.create({ name, lastname, password: hashedPassword, email, username });

    const token = jwt.sign({ id: user.id, name:user.name ,lastname:user.lastname , email:user.email ,username: user.username }, process.env.JWT_SECRET!, { expiresIn: '20d' });

    
    const response: CreateUserResponse = {
      ...user.toJSON(),
      message: 'Usuario creado exitosamente',
      token
    };
    
    res.json(response);
  } catch (error) {
    res.status(500).json({
      message: 'Error al crear el usuario',
      err: error
    });
  }
}

async function login(req: Request<{}, {}, UserAttributes>, res: Response<{ token: string } | ErrorResponse | { message: string, err: any }>) {
  try {
    const { email, password, username } = req.body;

    let user;
    if (email) {
      user = await User.findOne({ where: { email } });
    } else if (username) {
      user = await User.findOne({ where: { username } });
    }

    if (!user) {
      return res.status(400).json({ errors: ['Usuario no encontrado'] } as ErrorResponse);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ errors: ['Contraseña incorrecta'] } as ErrorResponse);
    }

    const token = jwt.sign({ id: user.id,name:user.name ,lastname:user.lastname , email:user.email ,username: user.username }, process.env.JWT_SECRET!, { expiresIn: '20d' });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({
      message: 'Error al iniciar sesión',
      err: error,
    });
  }
}


// Importa los módulos necesarios (por ejemplo, el modelo User, bcrypt, etc.)
// ...

async function updateUser(req: Request, res: Response<CreateUserResponse | ErrorResponse | { message: string, err: any } | {message:string}>) {
  try {
    const { name, lastname, password, email, username } = req.body;
    const userId = req.user?.id; // Obtener el ID del usuario autenticado desde el token

    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar si el correo electrónico ya está en uso por otro usuario
    if (email && email !== user.email) {
      const existingEmail = await User.findOne({ where: { email } });
      if (existingEmail) {
        return res.status(400).json({ message: 'El correo electrónico ya está en uso' });
      }
    }

    // Verificar si el nombre de usuario ya está en uso por otro usuario
    if (username && username !== user.username) {
      const existingUsername = await User.findOne({ where: { username } });
      if (existingUsername) {
        return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
      }
    }

    // Si el usuario proporcionó un nuevo valor para el campo, actualízalo
    if (name) {
      user.name = name;
    }
    if (lastname) {
      user.lastname = lastname;
    }
    if (password) {
      // Verificar que la contraseña cumpla con los requisitos
      const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
      if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres y contener al menos una letra mayúscula' });
      }

      // Generar el hash de la nueva contraseña
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      user.password = hashedPassword;
    }
    if (email) {
      user.email = email;
    }
    if (username) {
      user.username = username;
    }

    // Guardar los cambios en la base de datos
    await user.save();

    const token = jwt.sign({ id: user.id,name:user.name ,lastname:user.lastname , email:user.email ,username: user.username }, process.env.JWT_SECRET!, { expiresIn: '20d' });


    const response: CreateUserResponse = {
      ...user.toJSON(),
      message: 'Datos de usuario actualizados exitosamente',
      token
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      message: 'Error al actualizar los datos del usuario',
      err: error
    });
  }
}




export {createUser , login ,updateUser}