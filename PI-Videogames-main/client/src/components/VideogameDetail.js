import React from 'react'
import {NavLink, useParams, useHistory} from "react-router-dom";
import styles from "../components/VideogameDetail.module.css"
import { getDetailVideogame, deleteVideo} from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';




function VideogameDetail() {

  const {id} = useParams()

  const dispatch = useDispatch()
  const history = useHistory()

  const allDetail = useSelector((state)=> state.detail)

  useEffect (()=>{  
    dispatch(getDetailVideogame(id),
    )},[dispatch])


  function onClose (id){
      dispatch(deleteVideo(id))
      var respuesta = window.confirm("Confirm delete?")
      if(respuesta)
      alert("Videogame delete");
      else
      alert("Usted no aceptó."); 
      history.push("/home")
    }
    
  return (
    
 <div className={styles.body}>{
      allDetail?

<div className={styles.containerDet}> 

<div className={styles.titImg}> 

<NavLink to = "/home" exact >
    <img src = {"https://media3.giphy.com/media/FtTfX6RsPPExhjuymq/200w.webp?cid=790b7611xrpo8f8qrk4vpjooq62pednxs5al5vaa2muy2lv4&rid=200w.webp&ct=s"} alt ="Img not found" className={styles.button}/>
  </NavLink>
</div>

<div className={styles.envImg}>
<h1 className={styles.nombre}>{allDetail.name ? allDetail.name : "Nombre no encontrado"}</h1>

<div className={styles.fotoDetalle} >
<img className={styles.img}
        alt={"img not found"}
        src={allDetail.image ? allDetail.image : "Imagen no encontrada"}
      />

<div className={styles.parrafo} contenteditable = "true">
<p className={styles.p}>{allDetail.description? allDetail.description: "Descripción no encontrada"}</p>
</div>
</div>

<div className={styles.otraInfo}>

<div className={styles.label} >
<h3 >GENEROS</h3>

      <p className={styles.parr}>
        {allDetail.createdInDb === true? allDetail.genres.map((el)=> el.name + "/ "): allDetail.genres + "/ " }
      </p>
</div>
<div className={styles.label}>
<h3>PLATAFORMA/S</h3>
 
<p className={styles.parr}>{allDetail.platforms ? allDetail.platforms + "/ " : "Plataformas no encontradas"}</p>
</div>
<div className={styles.label}>
<h3>FECHA</h3>

<p className={styles.parr}>{allDetail.released? allDetail.released : "Fecha no encontrada "}</p>
</div> 

<div className={styles.label}>
<h3>RATING</h3>

<p className={styles.parr}>{ allDetail.rating ? allDetail.rating: allDetail.rating}</p> 
</div> 
</div>  
</div>

</div>
  
: 
<div className='parent'>
<img src={"https://media4.giphy.com/media/ehUXZUHL1jph7TcelU/200w.webp?cid=790b7611xw35q1itdildkzwk99yuwtoc6zbo7mm3fwbashzi&rid=200w.webp&ct=s"} alt="GAME NOT FOUND" className={styles.cardImg} ></img>
</div>
 

}

      
      
</div>


  )
}

export default VideogameDetail

