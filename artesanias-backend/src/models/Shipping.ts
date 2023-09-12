import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from './index';
import User from './User';

export interface ShippingAttributes {
  id?: number;
  fullName: string;
  address: string;
  city: string;
  country: string;
  departamento:string;
  userId?: number;
  lat?: number,
  lng?: number,
}

interface ShippingCreationAttributes extends Optional<ShippingAttributes, 'id'> {}

class Shipping extends Model<ShippingAttributes, ShippingCreationAttributes> implements ShippingAttributes {
  public id!: number;
  public fullName!: string;
  public address!: string;
  public city!: string;
  public country!: string;
  public departamento!: string;
  public userId!: number;
  public lat?: number
  public lng?: number
}

Shipping.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    departamento: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    lat: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    lng: {
        type: DataTypes.DOUBLE,
        allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Shipping',
    tableName: 'Shippings', // Nombre de la tabla en la base de datos (opcional)
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

User.hasMany(Shipping, { foreignKey: 'userId', as: 'shippings' });
Shipping.belongsTo(User, { foreignKey: 'userId', as: 'user' });

sequelize.sync({ force: false });

export default Shipping;
