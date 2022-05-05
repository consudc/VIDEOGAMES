const { Router } = require('express');
// Importar todos los routers;

const gamesRoute = require("./videogame")
const generoRoute = require("./genre")
// const platformRoute = require("./platform")

const router = Router();


// Configurar los routers

router.use ("/videogame",gamesRoute)
router.use ("/genre", generoRoute)
// router.use ("/platform", platformRoute)

module.exports = router;
