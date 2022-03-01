"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Board extends Model {
    /**
     * Helper method for defining associations.
     * Thins method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "userId",
        onDelete: "cascade",
      });
      this.hasMany(models.Like, {
        foreignKey: "postId",
        sourceKey: "postId",
      });
    }
  }
  Board.init(
    {
      postId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: DataTypes.STRING,
      content: DataTypes.STRING,
      img: DataTypes.STRING,
      img_position: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Board",
      timestamps: true,
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  return Board;
};
