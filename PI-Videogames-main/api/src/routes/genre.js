const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

require('dotenv').config()
const {Genre} = require("../db")
const axios = require('axios');
const router = Router();
const {YOUR_API_KEY} = process.env;


router.get("/", async (req, res, next)=>{
try{

    const generosApi = await axios.get(`https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`)
    const  genres = await generosApi.data.results.map ((el)=> el.name)


//El método forEach() ejecuta la función indicada una vez por cada elemento del array.
    genres.forEach((el) => {
        Genre.findOrCreate({
            where :{name: el}
        })
    })

    const allGenres = await Genre.findAll()

    
   return res.status(200).send(allGenres)
}

catch(error) {
    next(error)
    res.status(404).send(error)
}
})




module.exports = router;