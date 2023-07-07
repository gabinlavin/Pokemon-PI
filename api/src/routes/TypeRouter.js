const typeRouter = require("express").Router();
const { Type } = require("../db");
const getTypeData = require("../controllers/getTypeData");
const saveTypeData = require("../controllers/saveTypeData");

// Ruta para obtener todos los tipos de pokemon
typeRouter.get("/", async (req, res) => {
  try {
    // Buscar los tipos de pokemon en la base de datos
    const dbTypes = await Type.findAll();
    if (Object.keys(dbTypes).length) {
      // Si existen tipos en la base de datos, se devuelven como respuesta
      return res.status(200).json(dbTypes);
    }
    // Si no hay tipos en la base de datos, se obtienen desde la API y se guardan en la base de datos
    const allTypes = await getTypeData();
    const savedTypes = await saveTypeData(allTypes);
    return res.status(200).json(savedTypes);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = typeRouter;