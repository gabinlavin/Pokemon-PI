const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const sssRouter = require('./sss.js');
const pokemonRouter = require("./PokemonRouter");
const typeRouter = require("./TypeRouter");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/sss', sssRouter);
router.use("/pokemon", pokemonRouter);
router.use("/type", typeRouter);

module.exports = router;