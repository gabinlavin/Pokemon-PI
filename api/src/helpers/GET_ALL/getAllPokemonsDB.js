const { Pokemon, Type } = require("../../db");

const getAllPokemons_DB = async () => {
  try {

    //Buscamos los pokemons en la base de datos con el metodo FindAll() de sequelize q me devuelve un array de objetos
    /**
     * @FindAll => Si no incluyola propiedad "inlcudes", lo que va a pasar es q me va a traer solo los pokemons, sin los types asignados cuando el pokemon de creo en la base de datos
     * por eso al usar el includes lo que hago es incluirle la TABLA TYPES como si fuera una propiedad mas al objeto en cuestion...
     * 
     * @name => solo incluyo el atributo name de la tabal types, porque no necesito nada mas
     * 
     * {
     * types: ["fire"]  => quedaria algo asi y los otros atributos
     * name:
     * hp:
     * attack:
     * etc....
     * }
     * @Model => es el modelo que queres que se integre a la tabla, esto no funcionaria si la tabala types no estuviese relacionada con la tabala pokemons por medio de la tabala "PokemonsTypes"
     * @through => sirve para q no te traiga datos basura la tabala types cuando se hace la consulta ej => dataActualizeTypes, => te indica cuando se actualizo por ultima vez ese tipo en la tala Types
     */
    let allPokemonsDB = await Pokemon.findAll({
      include: {
        //Tabla
        attributes: ["name"],
        model: Type,
        //Tabla intermedia
        through: {
          attributes: [],
        },
      },
    });
    //Parseamos los pokemons porque a veces vienen medios raros q no me trae el nombre y esas boludeces
    //podes quitar esto y fijarte como vienen sin este parseo :3
    let parsedPokemons = allPokemonsDB.map((pokemon) => {
      let parsedPokemon = pokemon.toJSON();
      if (parsedPokemon.Types) {
        parsedPokemon.Types = parsedPokemon.Types.map((type) => type.name);
      }
      return parsedPokemon;
    });
    
    return parsedPokemons
  } catch (error) {
    //Siempre crea estos tipos de errores con la clase Error => new Error("soy un error") (acepta solo strings ojo)
    //porque a veces el throw no funca bien :3s
    throw new Error(error.message)
  }
};

module.exports = getAllPokemons_DB;
