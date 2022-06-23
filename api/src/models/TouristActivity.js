const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('TouristActivity', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    difficulty: { //Imagen de la bandera *
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
        isEven(value) {
          if(value < 1 || value > 5) {
            throw new Error('Only values between 1 and 5!')
          }
        }
      }
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 24,
        isEven(value) {
          if(value < 1 || value > 24) {
            throw new Error('Only values between 1 and 24!')
          }
        }
      }
    },
    season: { 
      type: DataTypes.ENUM('Summer', 'Autumn', 'Winter', 'Spring'),
      allowNull: false,
    }
  } , {
    timestamps: false
  });
};