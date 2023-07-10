const { Type } = require("../db");

const saveTypeData = async (allTypes) => {
  try {
    // Guardar los tipos de Pokémon en la base de datos utilizando el modelo Type
    const savedTypes = await Type.bulkCreate(allTypes);

    // Devolver los tipos guardados en la base de datos
    return savedTypes;
  } catch (error) {
    // Lanzar un error con el mensaje de error en caso de que ocurra algún problema
    throw new Error(error.message);
  }
};

module.exports = saveTypeData;