"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Board, {
        foreignKey: "userId",
        sourceKey: "userId",
      });
      this.hasMany(models.Like, {
        foreignKey: "userId",
        sourceKey: "userId",
      });
    }
  }
  User.init(
    {
      userId: {
        primaryKey: true,
        type: DataTypes.STRING,
      },
      password: DataTypes.STRING,
      nickname: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      timestamps: true,
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );

  return User;
};
