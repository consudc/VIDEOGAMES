// controllers


  //model

  const {DataTypes} = require('sequelize');
const sequelize = require('../database/config');

const ServiceModel = sequelize.define('services', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    detail: {
        type: DataTypes.STRING,
        allowNull: false
    },

    price: {
        type: DataTypes.FLOAT,
        allowNull:false
    },

    time: {
        type: DataTypes.TIME,
        allowNull: false
    },

    img: {
        type: DataTypes.STRING,
        defaultValue:'https://img2.freepng.es/20180405/pww/kisspng-hair-cutting-shears-scissors-computer-icons-scissor-5ac5cbedcb8877.1228515315229122378337.jpg',
        allowNull: true,
        // validate: {
        //     isUrl: true,

        //   }
    },
    state:{
        type: DataTypes.BOOLEAN,
        defaultValue:true
    }

}, {timestamps: false});

module.exports = ServiceModel;


//route

// actualizar un servicio, 2 validaciones una que sea un uuid y la otra que estemos editando un servicio que exista
router.put('/:idServicio', [
    check('idServicio', 'No es un id valido').isUUID(),
    check('idServicio').custom(verificarServicio),
    validarCampos
  ], putService)
  
  // eliminar un producto se validan dos cosas, una que sea un uuid y segundo que estemos eliminando un producto que realmente exista
  router.delete('/:idServicio', [
    check('idServicio', 'No es un id valido').isUUID(),
    check('idServicio').custom(verificarServicio),
    validarCampos
  ], deleteService)
