import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from './index';


export interface OrderItemAttributes {
  id?: number;
  orderId?: number;
  productId?: number;
  quantity: number;
}

interface OrderItemCreationAttributes extends Optional<OrderItemAttributes, 'id'> {}

class OrderItem extends Model<OrderItemAttributes, OrderItemCreationAttributes> implements OrderItemAttributes {
  public id!: number;
  public quantity!: number;
}

OrderItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity:{
        type: DataTypes.INTEGER,
        allowNull:false,
    },
  },
  {
    sequelize,
    modelName: 'OrderItem',
    tableName: 'OrderItems', // Nombre de la tabla en la base de datos (opcional)
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);


sequelize.sync({ force: false});



export default OrderItem;
