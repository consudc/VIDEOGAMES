const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Op } = require('sequelize');

require('dotenv').config()
const {Videogame, Genre} = require("../db")
const axios = require('axios');
const router = Router();
const {YOUR_API_KEY} = process.env;

const urlConcat= async () => {

const primeraPag = await axios.get
(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}`)
    
const segundaPag = await axios.get
     (`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=2`)         
const tercerPag = await axios.get
     (`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=3`)
const cuartaPag = await axios.get
     (`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=4`)
const quintaPag = await axios.get
     (`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=5`)


const videogamesApi=  await primeraPag.data.results.concat
(segundaPag.data.results,tercerPag.data.results,cuartaPag.data.results,quintaPag.data.results)   

const resultApi = await Promise.all(videogamesApi)

return resultApi
}

router.get("/", async (req, res, next) =>{
     
try{
const name = req.query.name
const {genero}= req.query

const resultApi = await urlConcat()

const resultFinalApi = resultApi.map((el)=>{
     return{
          id : el.id,
          name : el.name,
          image: el.background_image,
          platforms: el.platforms.map(el => el.platform.name), 
          rating: el.rating,
          released: el.released,
          genres : el.genres.map(el=> el.name),
          }
    
     })

    const videogamesDb = await Videogame.findAll({
          //esto es otra promesa
               include :[{
                   model : Genre ,
                   //aca no hace falta aclarar porque es un solo atributo
                   attributes : ["name"],
                   through: {
                       attributes : [],}
                   },

               ]
     })
     
     const infoTotal = resultFinalApi.concat(videogamesDb)
  

     
        if (name){
          
          let videogameName = infoTotal.filter 
          (el => el.name.toLowerCase().includes(name.toLowerCase()))
           let resultName = videogameName.slice(0, 15);

     resultName.length? res.status(200).send(resultName):
     
     res.status(404).send("No se encontro el videojuego")
 
}

     else res.status(200).send(infoTotal)

  
}   catch(error){
     next(error)}
})


router.post("/", async(req, res, next)=>{
try{
    const { name,
           image,
           platforms, 
           description, 
           rating,
           released, 
           genres,
           createdInDb
          } = req.body //esto es lo que recibe del body
     
          if (!name|| !description)
          return res.status(404).json({msg: "ERROR!!"});
          else{
     
              const newGame =  await Videogame.create({
                    name,
                    image: image? image : "https://media.kasperskydaily.com/wp-content/uploads/sites/92/2020/02/17105257/game-ratings-featured.jpg",
                    description,
                    rating,
                    createdInDb,
                    released, 
                    platforms ,
               })
          

let genresId = await Genre.findAll(
     { where : 
          { name: {
          [Op.in]: genres}}} )
console.log(genresId)

newGame.addGenre(genresId)

res.status(200).json({msg: "VideoGame creado con exito"})
}

//console.log(total)

} catch(error) {
          next(error)

          //aca el sigueinte midleware es el del manejo de errores en app.js
     }

})

const getApiId = async (id) => {

     const apiId = await axios.get(`https://api.rawg.io/api/games/${id}?key=${YOUR_API_KEY}`)
     
     const dataUrl = await apiId.data 
     
     const detailId = {
        id :  dataUrl.id,
        description : dataUrl.description_raw,
        name : dataUrl.name,
        image : dataUrl.background_image,
        platforms: dataUrl.platforms.map(el => el.platform.name), 
        released: dataUrl.released,
        rating: dataUrl.rating,
        genres : dataUrl.genres.map(el=> el.name),

     }

        return detailId
 
 }

router.get("/:id", async(req, res,next) =>{

try{
     const {id} = req.params


if (id.length <= 7){
const videoGameApi = await getApiId(id);
  res.status(200).send(videoGameApi)
}

if (id.includes("-")) {

const videoGameDb = await Videogame.findByPk(id,

      {
          include :[{
              model : Genre,

              attributes : ["name"],
                   through: {
                       attributes : [],}
         },

     ]
     }
         )
   
     res.status(200).send(videoGameDb);
}

else res.status(404).json({ msg: "Game not found" })

}catch(error){
     next(error)
     
}
})


router.delete("/:id", async(req, res,next) =>{

     try{
          const {id} = req.params
     
     
     if (id.length <= 7){
 
     res.status(404).send({ msg: "No se puede eliminar juegos existentes" })
     }
     
     if (id.includes("-")) {
     
     const videoGameDb = await Videogame.findByPk(id,
                {
               include :[{
                   model : Genre,
     
                   attributes : ["name"],
                        through: {
                            attributes : [],}
              },
     
          ]
          }
              )
          
              
          await videoGameDb.destroy({
               where :{
                    id
               }
          })
          
          res.status(200).send({ msg: "Juego eliminado" });
     }
     
     // else res.status(404).json({ msg: "Game not found" })
     
     }catch(error){
          next(error)
          
     }
     })






module.exports = router;