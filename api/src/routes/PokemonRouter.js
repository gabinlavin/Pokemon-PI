const pokemonRouter = require("express").Router();
const { Pokemon, Type } = require("../db");
const { validate } = require("uuid");
const getPokemonByName_API = require("../helpers/GET_BY_NAME/getPokemonAPIByName")
const { getPokemonTypesFromDb } = require("../utils/helpers");
const getPokemonData = require("../Controllers/getPokemonData");
const getPokemonById = require("../controllers/getPokemonById");
const getPokemonByName = require("../Controllers/getPokemonByName");
const axios = require("axios")

// Ruta para obtener todos los pokemons o un pokemon específico por nombre
pokemonRouter.get("/", async (req, res) => {
  try {

    let { name } = req.query;
    if (name) {
      name = name.toLowerCase();
      const pokemon = await getPokemonByName(name);
      return res.status(200).json(pokemon);

    }
    const pokemons = await getPokemonData();
    return res.json(pokemons);
  } catch (error) {
    res.status(404).send(error.message)
  }
});


// Ruta para crear un nuevo pokemon
pokemonRouter.post("/", async (req, res) => {
  try {
    const {
      name,
      image,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      types,
    } = req.body;

    const repeated = await getPokemonByName_API(name)
    if(repeated.name) throw new Error("Nombre de pokemon repetido")
    
    const verificacion = Type.count() 
    if (verificacion === 0){
      throw new Error ("No hay tipos en la BD")
    }
    // const typeIds = filteredDbTypes.map((type) => type.id);
    // console.log(typeIds);

    
     if (!types.length)
       throw Error(`Types table must be initialized before Pokemons table.`);

    // Crear un nuevo pokemon en la base de datos y asignarle los tipos correspondientes
    const newPokemon = await Pokemon.create({
      name,
      image,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
    });
    await newPokemon.addTypes(types);

    res.status(200).json({ ...newPokemon.dataValues, types: types });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al verificar el nombre del Pokémon' });
    res.status(404).json(error.message);
  }
});

// Ruta para obtener un pokemon por su ID
pokemonRouter.get("/:idPokemon", async (req, res) => {
  const { idPokemon } = req.params;
  try {
    // Validar si el ID es un UUID
    if (validate(idPokemon)) {
      // Buscar el pokemon en la base de datos
      const pokemonInDb = await Pokemon.findByPk(idPokemon);

      if (pokemonInDb) {
        // Obtener los tipos del pokemon desde la base de datos
        const pokemonTypes = await getPokemonTypesFromDb(pokemonInDb);
        console.log(pokemonTypes);
        return res
          .status(200)
          .json({ ...pokemonInDb.dataValues, types: pokemonTypes });
      }

    }
    if (!parseInt(idPokemon)) throw Error(`ID must be an integer or a UUID.`);
    // Buscar el pokemon en la API
    const pokemonInApi = await getPokemonById(idPokemon);
    if (!pokemonInApi)
      throw Error(`The pokemon with ID ${idPokemon} does not exist.`);
    return res.status(200).json(pokemonInApi);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = pokemonRouter;