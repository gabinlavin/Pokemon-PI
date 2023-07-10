const axios = require("axios");

const getTypeData = async () => {
  try {
    // Obtener todos los tipos de Pokémon desde la API
    const allTypes = (
      await axios("https://pokeapi.co/api/v2/type")
    ).data.results.map((type) => {
      return { name: type.name };
    });
    
    // Mapear los resultados obtenidos para extraer únicamente los nombres de los tipos
    
    return allTypes;
  } catch (error) {
    // Lanzar un error con el mensaje de error en caso de que ocurra algún problema
    throw new Error(error.message);
  }
};

module.exports = getTypeData;