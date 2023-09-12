import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from './index';
import User from './User';
import Product from './Product';

export interface CartAttributes {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
}

interface CartCreationAttributes extends Optional<CartAttributes, 'id'> {}

class Cart extends Model<CartAttributes, CartCreationAttributes> implements CartAttributes {
  public id!: number;
  public userId!: number;
  public productId!: number;
  public quantity!: number;
}

Cart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Cart',
    timestamps: true,
  }
);

// Establecer relaciones entre los modelos
User.belongsToMany(Product, { through: Cart, foreignKey: 'userId' });
Product.belongsToMany(User, { through: Cart, foreignKey: 'productId' });

sequelize.sync({ force: false });


export default Cart;
