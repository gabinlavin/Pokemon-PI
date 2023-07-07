const pokemonRouter = require("express").Router();
const { Pokemon, Type } = require("../db");
const { validate } = require("uuid");
const { getPokemonTypesFromDb } = require("../utils/helpers");
const getPokemonData = require("../Controllers/getPokemonData");
const getPokemonById = require("../controllers/getPokemonById");
const getPokemonByName = require("../controllers/getPokemonByName");

// Ruta para obtener todos los pokemons o un pokemon específico por nombre
pokemonRouter.get("/", async (req, res) => {
  let { name } = req.query;
  try {
    // Si no se proporciona un nombre en la consulta, se obtienen todos los pokemons
    if (!name) {
      const allPokemons = await getPokemonData();
      return res.status(200).json(allPokemons);
    }
    // Si se proporciona un nombre en la consulta, se busca ese pokemon específico
    const pokemon = await getPokemonByName(name);
    if (!pokemon) throw Error(`There is no pokemon named "${name}".`);
    return res.status(200).json(pokemon);
  } catch (error) {
    res.status(404).send(error.message);
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

    // Filtrar los tipos de la base de datos según los tipos proporcionados
    const filteredDbTypes = (await Type.findAll()).filter((type) =>
      types.includes(type.name)
    );
    const typeIds = filteredDbTypes.map((type) => type.id);
    console.log(typeIds);

    if (!typeIds.length)
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
    await newPokemon.addTypes(typeIds);

    res.status(200).json({ ...newPokemon.dataValues, types: types });
  } catch (error) {
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