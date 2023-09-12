import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from './index';
import Product from './Product';

export interface UserAttributes {
  id: number;
  name: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  isAdmin?: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public lastname!: string;
  public username!: string;
  public email!: string;
  public password!: string;
  public isAdmin?: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin:{
      type: DataTypes.BOOLEAN,
      allowNull:true
    }
    // otros atributos...
  },
  {
    sequelize,
    modelName: 'User',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);


sequelize.sync({ force: false});

export default User;
