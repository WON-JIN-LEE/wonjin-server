const { sequelize } = require("../models");
const dbconnect = () =>
  sequelize
    .sync({ force: false })
    .then(() => {
      console.log("Database connected.");
    })
    .catch((err) => {
      console.error(err);
    });

module.exports = dbconnect;
