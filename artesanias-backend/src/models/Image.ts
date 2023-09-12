import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from './index';

export interface ImageAttributes {
  id: number;
  url: string;
  // otros atributos...
}

interface ImageCreationAttributes extends Optional<ImageAttributes, 'id'> {}

class Image extends Model<ImageAttributes, ImageCreationAttributes> implements ImageAttributes {
  public id!: number;
  public url!: string;
  // otros atributos...
}

Image.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // otros atributos...
  },
  {
    sequelize,
    modelName: 'Image',
    timestamps: true,
  }
);

export default Image;
