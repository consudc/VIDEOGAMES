import React from 'react'
import {NavLink} from "react-router-dom";
import styles from "../components/VideogameDetail.module.css"
import { getDetailVideogame } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
// import { useHistory } from 'react-router-dom';



function VideogameDetail(props) {

  const dispatch = useDispatch()


const allDetail = useSelector((state)=> state.detail)

console.log(allDetail)
 
  useEffect (()=>{  

    //esto es para acceder a los params(id) de la ruta
    dispatch(getDetailVideogame(props.match.params.id));
  },[dispatch])
  


  return (
    <div>{
      allDetail?
<div> 

<h1 className="name">{allDetail.name ? allDetail.name : "Nombre no encontrado"}</h1>
<img className="image"
        height="300px"
        width="300px"
        src={allDetail.image ? allDetail.image : "Imagen no encontrada"}
      />
<p>Descripción : {allDetail.description? allDetail.description: "Descripción no encontrada"}</p>
<label  className="genres-label" >Genres: </label>
      <h3 className="genres">
        
        {allDetail.genres ? allDetail.genres.map(e => e.name + (' /')) : "Generos no encontrados"}
      </h3>
  
<h1>Plataforma/s : {allDetail.platforms ? allDetail.platforms + "/ " : "Plataformas no encontradas"}</h1>
<h1>Fecha : {allDetail.released? allDetail.released : "Fecha no encontrada "}</h1>
<h1>Rating : {allDetail.rating ? allDetail.rating: allDetail.rating}</h1> 

</div>  : 
<h1>Loading..</h1>

}

<NavLink to="/home" exact>
  <button>Volver</button>
</NavLink>
      
      
      </div>


  )
}

export default VideogameDetail

// // const detailId = {
// //   id :  dataUrl.id,
// //   description : dataUrl.description_raw,
// //   name : dataUrl.name,
// //   image : dataUrl.background_image,
// //   platforms: dataUrl.platforms.map(el => el.platform.name), 
// //   released: dataUrl.released,
// //   rating: dataUrl.rating,
// //   genres : dataUrl.genres.map(el=> el.name),

// // }