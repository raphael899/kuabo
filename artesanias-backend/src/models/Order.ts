import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from './index';
import OrderItem from './OrderItem';
import Payment from './Payment';
import Product from './Product';
import Shipping from './Shipping';

export interface OrderAttributes  {
  id?: number;
  paymentResult?:Array<Payment>;
  items?:Array<Product>;
  shipping?: Array<Shipping>;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt: Date;
  isDelivered: boolean;
  deliveredAt: Date;
  shippingId?:number;
  paymentId?:number;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> {}

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id!: number;
  public itemsPrice!: number;
  public shippingPrice!: number;
  public taxPrice!: number;
  public totalPrice!: number;
  public isPaid!: boolean;
  public isDelivered!: boolean;
  public paidAt!: Date;
  public deliveredAt!: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    itemsPrice: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    shippingPrice: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    taxPrice: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      totalPrice: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      isPaid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      isDelivered: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      paidAt:{
        type: DataTypes.DATE,
        allowNull: false,
      },
      deliveredAt:{
        type: DataTypes.DATE,
        allowNull: true,
      }, 
  },
  {
    sequelize,
    modelName: 'Order',
    tableName: 'Orders', // Nombre de la tabla en la base de datos (opcional)
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

Order.hasMany(OrderItem , { foreignKey: 'orderId' , as: 'orders'});
OrderItem.belongsTo(Order, { foreignKey: 'orderId' , as : 'orders'});
OrderItem.belongsTo(Product, { foreignKey: 'productId' , as : 'products'});
Shipping.hasOne(Order , { foreignKey: 'shippingId' });
Payment.hasOne(Order , { foreignKey: 'paymentId' });
Order.belongsTo(Shipping, { foreignKey: 'shippingId', as: 'shipping' });
Order.belongsTo(Payment, { foreignKey: 'paymentId', as: 'payment' });
sequelize.sync({ force: false });

export default Order;
