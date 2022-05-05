import React from 'react';
import {NavLink} from "react-router-dom";
import styles from "../components/VideogameCreate.module.css"
import { createVideogames,getGenres, getPlatforms } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const divStyle = {
  backgroundImage: `url("https://img.freepik.com/vector-gratis/fondo-transparente-videojuegos_6997-1230.jpg?w=2000")`,
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
    errors.platforms = "Se requiere una Plataformas"
  }
  else if (!input.genres){
    errors.genres = "Se requiere al menos un genero"
  }
  else if (input.rating > 5 || input.rating <= 0) {
    errors.rating = "Required value between 1 and 5";}
  return errors
}


function VideogameCreate() {

  const dispatch = useDispatch()
  const history = useHistory()


  const allGenres = useSelector((state)=> state.genres)
  console.log(allGenres)
  
  const allPlatforms = useSelector((state)=> state.platforms)

  // console.log(allPlatforms)

const platformsList = Array.from (new Set((allPlatforms.map((el)=>el.platforms)).flatMap(x => x)))

// console.log(platformsList)

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


  function handleSubmit(e){
    e.preventDefault()
    if (Object.values(errors).length > 0) {
      alert("Please complete the information required");
    } else if (
      input.name === "" &&
      input.description === "" &&
      input.rating === ""  &&
      !input.platforms.length &&
      !input.genres.length
    ) {
      alert("Please complete the form");}
    else {
      dispatch(createVideogames(input));
    alert("PERSONAJE CREADO CON EXITO")
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
   {/* <div className={styles.root}>  */}

  <NavLink to = "/home" exact >
      <button className={styles.btn}>
        HOME
      </button>
  </NavLink>
  <h1 className={styles.h1}> CREA TU VIDEOJUEGO</h1>

  <form className = {styles.form}  onSubmit={(e) => handleSubmit(e)}>
<div>
  <label>Nombre: </label>
<input

className={errors.name && styles.danger}
  type= "text"
  name= "name"
  value={input.name}
  onChange={handleChange}
  />
 {!errors.name ? null : <div className={styles.error}>{errors.name}</div>}
 </div>
<div>
  <label> Descripción: </label>
  <input
    className={errors.description && styles.danger}
    type="text"
    name="description"
    value={input.description}
    onChange={handleChange}
    />
   {!errors.description ? null : <p className={styles.error}>{errors.description}</p>}

  </div>
  <div>
  <label>Fecha de lanzamiento:</label>
  <input type="text"
    name="released"
    value={input.released}
    onChange={handleChange}
    />

  </div>
  <div>
  <label>
    Rating:</label>
    <input type="text"
    name="rating"
    value={input.rating}
    onChange={handleChange}/>

{!errors.rating? null : <div className={styles.error}>{errors.rating}</div>}
  </div>
  <div>
  <label>
    Imagen:</label>
    <input type="text"
    name="image"
    value={input.image}
    onChange={handleChange} />
  </div>

<div>
Elige Genero/s:
  <select onChange={handleSelectGenre}>
            <option value="" disabled={true} className={errors.genres && styles.danger}>Genres</option>

            {allGenres.map((t)=>(
              <option key={t.id} value={t.name}>{t.name}</option>
               ))}
  </select>
  {!errors.genres ? null : <div className={styles.error}>{errors.genres}</div>}
  </div>

  {input.genres.map((el, index) => (
            <div key={index}>
              {el}
              <button type="button" onClick={() => handleDelete(el)}>X</button>
            </div>
          ))}


<div>

Elige Plataforma/s:
   <select onChange={handleSelectPlatform}>
    <option value="">Platforms</option>
      {platformsList.map((t, index)=>(

<option key={index} value={t}>{t}</option>
))}
          </select>
</div>


{input.platforms.map((el, index) => (
            <div key={index}>
              {el}
              <button type="button" onClick={() => handleDelete(el)}>X</button>
            </div>
          ))}
{!errors.platforms ? null : <p className={styles.error}>{errors.platforms}</p>}

<div className={styles.crear}>
   <input type="submit" value="Crear" 
   disabled={!!errors.genres || !!errors.platforms}
   ></input>
   </div>
  </form>



</div>
  )
}

export default VideogameCreate