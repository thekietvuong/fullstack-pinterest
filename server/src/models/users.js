/* jshint indent: 2 */

import { Model, Sequelize } from 'sequelize';

export default class users extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    user_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    full_name: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  return users;
  }
}
