import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from './index';
import Image from './Image';

export interface ProductAttributes {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  slug: string; // Nuevo campo para el slug
  category: string; //
  rating?: number;
  numReviews?: number;
  images?: Array<Image>;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> {}

class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public stock!: number;
  public image!: string;
  public slug!: string; // Nuevo campo para el slug
  public category!: string;
  public rating?: number; // Agrega el operador "!" para indicar que será inicializado antes de su uso
  public numReviews? : number;
  public images?: Array<Image>;

}

Product.init(
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
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    slug: {
      type: DataTypes.STRING, // Puedes ajustar el tipo de dato según tus necesidades
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING, // Puedes ajustar el tipo de dato según tus necesidades
      allowNull: true,
    },
    rating: {
      type: DataTypes.DECIMAL(3, 2), // El primer parámetro representa la precisión total y el segundo parámetro representa la cantidad de decimales
      allowNull: true,
    },
    numReviews: {
      type: DataTypes.INTEGER, // El primer parámetro representa la precisión total y el segundo parámetro representa la cantidad de decimales
      allowNull: true,
    }
    
  },
  {
    sequelize,
    modelName: 'Product',
    timestamps: true,
  }
);

Product.hasMany(Image, {
  foreignKey: 'productId',
  as: 'images',
});

Image.belongsTo(Product, {
  foreignKey: 'productId',
  as: 'product',
});

sequelize.sync({ force: false });

export default Product;
