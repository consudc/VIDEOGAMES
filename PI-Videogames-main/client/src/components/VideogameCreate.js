import React from 'react';
import {NavLink} from "react-router-dom";
import styles from "../components/VideogameCreate.module.css"
import { createVideogames,getGenres, getPlatforms } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';


const divStyle = {
  backgroundImage: `url(https://i0.wp.com/wallpapersfortech.com/wp-content/uploads/2021/07/Gaming-PC-Wallpaper-HD.png?fit=3840%2C2160&ssl=1)`,
  backgroundSize: "cover",
  position:"fixed",
  backgroundPosition: "100% 100%",
  width: "100vw",
  height: "100vh",
};


// esta function validate recibe un input (lo que escribimos dentro de cada input)
function validate (input){
  let errors = {};
  if (!input.name){
    
    errors.name = "Se requiere un Nombre"
    
  }
  else if (!input.description){
    errors.description = "Se requiere una Descripción"
  }
  else if (!input.platforms){
    errors.platforms = "Se requiere al menos una Plataforma"
  }
  else if (!input.genres ){
    errors.genres = "Se requiere al menos un genero"
  }
  else if (input.rating > 5 || input.rating <= 0) {
    errors.rating = "Se requiere un valor entre 0 y 5";}
  return errors
}


function VideogameCreate() {

  const dispatch = useDispatch()
  const history = useHistory()


const allGenres = useSelector((state)=> state.genres)
  console.log(allGenres)
  
const allPlatforms = useSelector((state)=> state.platforms)

const platformsList = Array.from (new Set((allPlatforms.map((el)=>el.platforms)).flatMap(x => x)))


  const [errors, setErrors]= useState({})

  const [input, setInput] = useState({
    name : "",
    description :"",
    image: "",
    rating: 0,
    released: "",
    genres: [],
    platforms: []
  })
console.log(input)

  useEffect (()=>{
    dispatch(getGenres());
  },[dispatch])

  useEffect (()=>{
    dispatch(getPlatforms());
  },[dispatch])

  const nombreValido =/^[a-zA-Z ]*$/
  
 async function handleSubmit(e){
    e.preventDefault()
    
    if (Object.values(errors).length > 0) {
        alert("Por favor complete la información requerida");}

     else if(
      input.name === ""||
        input.name.length > 20 ||
        !nombreValido.test(input.name)
      ){
         alert("El nombre es obligatorio, solo puede llevar letras y su largo debe ser menor a 20")
       }
      else if(
        !input.genres.length 
      ) {
        alert("Se requiere al menos un Genero");}
    else if (
      !input.platforms.length
      ) { alert("Se requiere al menos una Plataforma");}
     
    else {
      dispatch(createVideogames(input));
    alert("VIDEOGAME CREADO CON EXITO")
    setInput({
    name : "",
    description :"",
    image: "",
    rating: 0,
    released: "",
    genres: [],
    platforms: []
    })
    setErrors({})
    history.push("/home")
//para que vuelva a la pagina anterior

    }}

  function handleChange(e){
    e.preventDefault()
   
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    setErrors(validate({
      ...input,
      [e.target.name] : e.target.value}))
}

function handleSelectGenre(e){
  setInput({
    ...input,
    genres: [...input.genres,e.target.value]


  })
}

function handleSelectPlatform(e){
  setInput({
    ...input,
    platforms: [...input.platforms, e.target.value]

  })
}

function handleDelete(el){

  setInput({
    ...input,
    genres : input.genres.filter((t) => t !== el),
    platforms: input.platforms.filter((t) => t !== el)

  })
}


  return (
    <div style={divStyle}>


  <NavLink to = "/home" exact >
      <button className={styles.btn}>
        HOME
      </button>
  </NavLink>
  
  <h1 className={styles.h1}> CREA TU VIDEOJUEGO</h1>
  <form  onSubmit={(e) => handleSubmit(e)}>

<div className = {styles.form}>
<div className={styles.input} >
  <div>
  <label>NOMBRE *: </label>
  </div>

<input
className={errors.name && styles.danger}
  type= "text"
  name= "name"
  value={input.name}
  onChange={handleChange}
  />
 <div>
 {!errors.name ? null : <div className={styles.error}>{errors.name}</div>}
 </div>
 </div>

<div className={styles.input}>
<div>
  <label>DESCRIPCIÓN *: </label>
  </div>
  <input
    className={errors.description && styles.danger}
    type="text"
    name="description"
    value={input.description}
    onChange={handleChange}
    />
    <div>
   {!errors.description ? null : <div className={styles.error}>{errors.description}</div>}
   </div>
  </div>
  <div className={styles.input}>
  <div className={styles.label}>
  <label>FECHA LANZAMIENTO: </label>
  </div>
  <input 
  className={styles.selectReleased}
    type="date"
    name="released"
    value={input.released}
    onChange={handleChange}
    />

  </div>
  <div className={styles.input}>
  <div>
  <label>RATING: </label>
  </div>
    <input type="text"
    name="rating"
    value={input.rating}
    onChange={handleChange}/>

{!errors.rating? null : <div className={styles.error}>{errors.rating}</div>}
  </div>
  <div className={styles.input}>
  <div>
  <label>IMAGEN: </label>
  </div>
    <input type="text"
    name="image"
    value={input.image}
    onChange={handleChange} />
  </div>

<div className={styles.input}>
<div>
  <label>GENERO/S *: </label>
  </div>
  <select className={styles.select} onChange={handleSelectGenre}>
   
            <option value="" disabled={true} className={errors.genres && styles.danger}>Genres</option>

            {allGenres.map((t)=>(
              <option key={t.id}  value={t.name}>{t.name}</option>
               ))}

  </select>


  {!errors.genres ? null : <p className={styles.error}>{errors.genres}</p>}

  </div>

  {input.genres.map((el, index) => (
            <div className={styles.option} key={index}>
              {el}
              <button className={styles.x}  type="button" onClick={() => handleDelete(el)}>X</button>
            </div>
          ))}


<div className={styles.input}>
<div >
  <label>PLATAFORMA/S *: </label>
  </div>
   <select className={styles.selectPlat}
   onChange={handleSelectPlatform}>
    <option value="" disabled={true} >Platforms</option>
      {platformsList.map((t, index)=>(

<option key={index} className={styles.option} value={t}>{t}</option>
))}
          </select>
</div>


{input.platforms.map((el, index) => (
            <div className={styles.option} key={index}>
              {el}
              <button className={styles.x} type="button" onClick={() => handleDelete(el)}>X</button>
            </div>
          ))}

</div>
<div >
   <input className={styles.crear} type="submit" value="CREAR" 
   disabled={errors.genres || errors.platforms}
   ></input>
   </div>
  </form>

  </div>

  )
}

export default VideogameCreate