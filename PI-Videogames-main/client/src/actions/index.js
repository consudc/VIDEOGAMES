import {GET_GAME_BYNAME, GET_GENRE, GET_GAME_DETAIL, GET_VIDEOGAME, ORDER_NAME, ORDER_RATING, FILTER_CREATED, FILTER_GENRE, GET_PLATFORMS, CREATE_VIDEOGAMES} from "./types"

import axios from "axios"

export function getVideogames (){
    return async function (dispatch){
        var json = await axios.get("http://localhost:3001/videogame", {}
    )
    console.log(json.data)
    //     console.log(json.data)
    return dispatch({
            type : GET_VIDEOGAME,
            payload : json.data}
          )
    }
}
export function getGenres (){
    return async function (dispatch){

        var json = await axios.get("http://localhost:3001/genre")
        console.log(json.data)
        return dispatch({
            type : GET_GENRE,
            payload :json.data}
          )
    }
}
export function getPlatforms (){
    return async function (dispatch){
        var json = await axios.get("http://localhost:3001/videogame")
        
        return dispatch({
            type : GET_PLATFORMS,
            payload :json.data}
          )
    }
}


//este payload son los datos que me llegan desde el form del front

export function createVideogames (payload){
    return async function (dispatch){
        var json = await axios.post("http://localhost:3001/videogame", payload)
        // console.log(json.data)
        
        return json
        
        // return dispatch({
        //     type : CREATE_VIDEOGAMES,
        //     payload } )
    }
}

//estos son todos los generos que estan en tu DB
export function filterByGenre (payload){
    
    return {
    type : FILTER_GENRE,
    payload }   
}

export function filterCreated (payload){
    
    return {
    type : FILTER_CREATED,
    payload  }   
}

export function orderAlphabetic (payload){
    return {
    type : ORDER_NAME,
    payload }   
}

//acael name es mi payload, osea es lo que le voy a pasar a la action!

export function orderRating (payload){
    return {
    type : ORDER_RATING,
    payload }   
}

//SEARCH BAR
export function getVideogameName(name){
    return async function (dispatch){
        try{
        var json = await axios.get("http://localhost:3001/videogame?name=" + name);
        // console.log(json.data)

        return dispatch({
            type : GET_GAME_BYNAME,
            payload : json.data
        })
     
        } catch(error){ 
            console.log(error)
        }
}

}
export function getDatailVideogame(id){
    return async function (dispatch){
        try{
        var json = await axios.get(`http://localhost:3001/videogame/:${id}`);

        // console.log(json.data)
        
            return dispatch({
            type : GET_GAME_DETAIL,
            payload : json.data
        })
        
        } catch(error){ 

            // console.log(error)
        }
}

}

