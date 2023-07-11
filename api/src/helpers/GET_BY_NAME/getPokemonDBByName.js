const {Pokemon , Type } = require ("../../db");

const getPokemonByName_DB = async (name) => {
    try {
        const pokemon = await Pokemon.findOne({
            where: { name },
            include:{ 
            model: Type,
            // atributes:["name"],
            through: {
                atributes:[],
                },
            },
            
        });
        if (pokemon === null ) throw new Error ("no esta el nombre indicado");
        return pokemon;
        
    } catch (error) {
        throw error
    }
}
module.exports = getPokemonByName_DB;