import React from 'react'
import {NavLink} from "react-router-dom";
import styles from "../components/VideogameDetail.module.css"
import { getDetailVideogame } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';




function VideogameDetail(props) {

  const dispatch = useDispatch()


const allDetail = useSelector((state)=> state.detail)


  useEffect (()=>{  
    //esto es para acceder a los params(id) de la ruta
    dispatch(getDetailVideogame(props.match.params.id),
    )},[dispatch])
  

  return (
    <div className={styles.body}>{
      allDetail?
<div> 

<h1 className={styles.nombre}>{allDetail.name ? allDetail.name : "Nombre no encontrado"}</h1>
<img className="image"
        height="170px"
        width="330px"
        alt={"img not found"}
        src={allDetail.image ? allDetail.image : "Imagen no encontrada"}
      />
<div className={styles.label}>
<h3>DESCRIPCIÓN</h3>
</div>
<div className={styles.parrafo}>
<p className={styles.p}>{allDetail.description? allDetail.description: "Descripción no encontrada"}</p>
</div>
<div className={styles.label} >
<h3 >GENEROS</h3>
</div>
      <p className={styles.parr}>
        {allDetail.createdInDb === true? allDetail.genres.map((el)=> el.name + "/ "): allDetail.genres + "/ " }
      </p>
<div className={styles.label}>
<h3>PLATAFORMA/S</h3>
</div> 
<p className={styles.parr}>{allDetail.platforms ? allDetail.platforms + "/ " : "Plataformas no encontradas"}</p>
<div className={styles.label}>
<h3>FECHA</h3>
</div> 
<p className={styles.parr}>{allDetail.released? allDetail.released : "Fecha no encontrada "}</p>
<div className={styles.label}>
<h3>RATING</h3>
</div> 
<p className={styles.parr}>{allDetail.rating ? allDetail.rating: allDetail.rating}</p> 

</div>  : 
<h1>Loading..</h1>

}

<NavLink to="/home" exact>
  <button className={styles.button}>HOME</button>
</NavLink>
      
      
      </div>


  )
}

export default VideogameDetail

