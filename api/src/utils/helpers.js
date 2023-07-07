module.exports = {
    // Imprime en la consola el resultado de una función asíncrona
    awaitConsoleLog: async (cb) => console.log(await cb()),
  
    // Procesa un objeto Pokémon y retorna un nuevo objeto con datos relevantes
    parsePokemon: (pokemon) => {
      if (!pokemon) return false;
      return {
        id: pokemon.id,
        name: pokemon.forms[0].name,
        image: pokemon.sprites.other["official-artwork"].front_default,
        hp: pokemon.stats[0].base_stat,
        attack: pokemon.stats[1].base_stat,
        defense: pokemon.stats[2].base_stat,
        speed: pokemon.stats[5].base_stat,
        height: pokemon.height,
        weight: pokemon.weight,
        types: pokemon.types.map((type) => type.type.name),
      };
    },
  
    // Obtiene los tipos de un Pokémon almacenado en la base de datos
    getPokemonTypesFromDb: async (pokemonInDb) => {
      // Devuelve ["eléctrico", "fuego"] con getTypes de la tabla de asociación PokemonTypes
      return await pokemonInDb
        .getTypes()
        .then((types) => {
          // Mapea los nombres de los tipos
          const typeNames = types.map((type) => {
            return type.dataValues.name;
          });
          return typeNames;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  };