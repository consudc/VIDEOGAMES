
import {GET_GAME_BYNAME, GET_GENRE, GET_GAME_DETAIL, GET_VIDEOGAME, ORDER_NAME, ORDER_RATING, FILTER_CREATED, FILTER_GENRE, GET_PLATFORMS, CREATE_VIDEOGAMES} from "../actions/types"


// EL REDUCER SIEMPRE TIENE QUE GENERAR UN NUEVO ESTADO, ESTE ES EL ESTADO GLOBAL!!! osea cuando se modifique algo
//esto puede ser tmb un objeto, o un array que contenga los objetos
const initialState = {
    allVideogames : [],
    videogames: [],
    genres: [],
    platforms: [],
    detail :[]
}


// aca el estado es el estado inicial y luego el otro parametro es la action pero hago destructuring {type, payload}
function reducer (state = initialState, {payload, type}){
    switch (type){
        
        case GET_VIDEOGAME : 

            return {
                ...state,
                allVideogames: payload,
                videogames: payload,
                  
            }

        case FILTER_GENRE : 

        const allGames = state.allVideogames
        
        //(en este caso el payload va a ser el value del select)
        // si el value o el payload es igual a All que me traiga todos los videogames

        
       const genreFiltered = payload === "all"? allGames: 
        
        allGames.filter((el) => 
        el.genres.includes(payload))
        
    // console.log( genreFiltered )
        return {
            ...state,
            videogames: genreFiltered
        }
// esto es para no pisar el estado general 
    case FILTER_CREATED :

    const gamesCreated = state.allVideogames

    const createdFiltered = payload === "creado"? gamesCreated.filter((el) =>el.createdInDb) : 

    gamesCreated.filter((el) =>!el.createdInDb)

    return{
        ...state,
        videogames: createdFiltered
    }
    //si es "all" que me traiga todo, osea el state.allVideogames, sino que me traiga la funcion createdFiltered donde hace el condicional, que si selecciona "creado" busca si existe  en la base de datos (que es el creado por el usuario) o si no es eso que te traiga lo existente

    
    case GET_GAME_BYNAME :
 
       return{
            ...state,
           videogames: payload
        }

    case GET_GAME_DETAIL :
        
            return{
                ...state,
               detail: payload 
            }



    case CREATE_VIDEOGAMES :
            return{
                ...state,
            }

    case GET_GENRE:
        return{
        ...state,
        genres: payload 
                }
    case GET_PLATFORMS:
        return{
        ...state,
        platforms: payload 
        }
               
    case ORDER_NAME : 

    const nameOrder = state.allVideogames

    const orderAlph = payload === "asc"? 
    
    nameOrder.sort(function(a, b){
        if (a.name > b.name){
        return 1}
        if (b.name > a.name){
            return -1}
        else return 0
    })
     : nameOrder.sort(function(a, b){
        if (a.name > b.name){
        return -1}
        if (b.name > a.name){
            return 1}
        else return 0
    })
    // console.log(orderAlph)

    return{
        ...state,
        videogames: orderAlph
    }

    case ORDER_RATING : 

    const ratingOrder = state.allVideogames

    const orderRat = payload === "ascR"? 
    
    ratingOrder.sort(function(a, b){
        if (a.rating > b.rating){
        return 1}
        if (b.rating > a.rating){
            return -1}
        else return 0
    })
     : ratingOrder.sort(function(a, b){
        if (a.rating > b.rating){
        return -1}
        if (b.rating > a.rating){
            return 1}
        else return 0
    })
    // console.log(state)

    return{
        ...state,
        videogames:  payload === "all"? ratingOrder :orderRat
    }

     
        default : 
        return state;
    }

}


export default reducer;