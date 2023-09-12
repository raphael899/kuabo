import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from './index';

export interface PaymentAttributes {
  id?: number;
  status: boolean;
  email_address: string;
  paymentBillNumber:string;
}

interface ShippingCreationAttributes extends Optional<PaymentAttributes, 'id'> {}

class Payment extends Model<PaymentAttributes, ShippingCreationAttributes> implements PaymentAttributes {
  public id!: number;
  public status!: boolean;
  public email_address!: string;
  public paymentBillNumber!:string;

}

Payment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    email_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    paymentBillNumber:{
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: 'Payment',
    tableName: 'Payments', // Nombre de la tabla en la base de datos (opcional)
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);



sequelize.sync({ force: false });

export default Payment;
