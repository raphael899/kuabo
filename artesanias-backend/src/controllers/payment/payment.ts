import {Request , Response} from "express"
import epayco from "../../config/epayco"


// Endpoint para realizar el pago
export const creditCard  = async (req: Request, res: Response) => {
  try {
    const { cardNumber, cardExpiration, cardCvc, customerInfo, paymentInfo } = req.body;

    // Generar token de tarjeta de crédito
    const creditCardInfo = {
      'card[number]': cardNumber,
      'card[exp_year]': cardExpiration.year,
      'card[exp_month]': cardExpiration.month,
      'card[cvc]': cardCvc,
      hasCvv: true,
    };
    const tokenResponse = await epayco.token.create(creditCardInfo);
    const token = tokenResponse.id;

    // Crear cliente
    const customerInfoWithToken = {
      ...customerInfo,
      token_card: token,
    };
    const customerResponse = await epayco.customers.create(customerInfoWithToken);
    const customerId = customerResponse.data.customerId;

    // Realizar el pago
    const paymentInfoWithToken = {
      ...paymentInfo,
      token_card: token,
      customer_id: customerId,
    };
    const paymentResponse = await epayco.charge.create(paymentInfoWithToken);

    // Enviar respuesta al cliente
    res.json(paymentResponse);
  } catch (error) {
    console.error('Error al realizar el pago:', error);
    res.status(500).json({ error: 'Error al procesar el pago' });
  }
};
