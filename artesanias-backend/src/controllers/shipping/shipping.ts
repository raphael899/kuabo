import { Request, Response } from 'express';
import Shipping, { ShippingAttributes } from "../../models/Shipping";
import User from '../../models/User';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const addShippingAddress = async (req: Request<ShippingAttributes>, res: Response<ShippingAttributes | { message: string; error: any } | {message:string}>) => {
    try {
      const { fullName, address, country, city, departamento, lat, lng, userId } = req.body;
  
      // Check if the address already exists for the user
      const existingAddress = await Shipping.findOne({
        where: { userId, address },
      });
  
      if (existingAddress) {
        res.status(200).json({ message: 'The address already exists for the user.' });
        return;
      }
  
      const error: string[] = [];
  
      // Validation checks
      if (!fullName) {
        error.push('Ingresa el nombre que le quieres asignar a tu dirección');
      }
      if (!address) {
        error.push('Ingresa dirección');
      }
      if (!country) {
        error.push('Ingresa tu país');
      }
      if (!city) {
        error.push('Ingresa tu ciudad');
      }
      if (!departamento) {
        error.push('Ingresa tu departamento');
      }
  
      if (error.length > 0) {
        res.status(400).json({
          message: 'Error',
          error: error,
        });
      } else {
        const shipping: ShippingAttributes = {
          fullName: fullName,
          address: address,
          city: city,
          country: country,
          departamento: departamento,
          lat: lat,
          lng: lng,
          userId: userId,
        };
  
        const createAddress = await Shipping.create(shipping);
  
        res.status(200).json(createAddress);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'error',
        error: err,
      });
    }
  };
  


export const getAllShippingAddress = async (req: Request<{}, {}, {}, { user: { id: string } }> , res: Response<ShippingAttributes[] | { message: string, error: any }>) => {
    try {
        const userToken = req.user!.id
        const shipping = await Shipping.findAll({
            where: { userId: userToken }
        });
        const response: ShippingAttributes[] = shipping;
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({
            message: 'error',
            error: err
        })
    }
}


export const getShippingAddressById = async (req: Request<{ id: number }>, res: Response<ShippingAttributes | { message: string, error: any } | { message: string }>) => {
    try {
        const { id } = req.params;

        const shipping = await Shipping.findOne({
            where: { id, userId: req.user!.id },
        });

        if (!shipping) {
            return res.status(404).json({ message: 'Dirección de envío no encontrada' });
        }

        res.status(200).json(shipping);
    } catch (err) {
        res.status(500).json({
            message: 'Error',
            error: err,
        });
    }
};


export const updateShippingAddress = async (req: Request<{ id: number }, {}, ShippingAttributes>, res: Response<ShippingAttributes | { message: string, error: any } | { message: string }>) => {
    try {
        const { id } = req.params;
        const { fullName, address, country, city,lat, lng, departamento } = req.body;
        const error: string[] = [];

        if (!fullName) {
            error.push('Ingresa el nombre que le quieres asignar a tu dirección');
        }
        if (!address) {
            error.push('Ingresa dirección');
        }
        if (!country) {
            error.push('Ingresa tu país');
        }
        if (!city) {
            error.push('Ingresa tu ciudad');
        }

        if (error.length > 0) {
            return res.status(400).json({
                message: 'Error',
                error: error,
            });
        }

        const updatedShipping = await Shipping.update(
            {
                fullName: fullName,
                address: address,
                city: city,
                country: country,
                lat: lat,
                lng: lng,
                departamento: departamento
            },
            {
                where: { id: id, userId: req.user!.id },
                returning: true,
            }
        );

        if (updatedShipping[0] === 0) {
            return res.status(404).json({ message: 'Dirección de envío no encontrada' });
        }

        res.status(200).json(updatedShipping[1][0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Error',
            error: err,
        });
    }
};
