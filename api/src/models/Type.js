const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // Defino el modelo de Type
    sequelize.define('Type', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false,
          }
        },
        { timestamps: false, underscored: true }
    )
}