import React from 'react'
import {Link, NavLink} from "react-router-dom"
import styles from "./Home.module.css"
import {useState, useEffect} from "react"//hooks
import Card from "./Card.js"
import Paginado from './Paginado.js'
import SearchBar from './SearchBar.js'


import { useDispatch, useSelector} from "react-redux"
//y estos son equivalentes a mapsStateToProps y mapsdispatchToProps
import { getVideogames, orderAlphabetic, orderRating, filterByGenre, filterCreated, getGenres} from '../actions'

// const inputStyle = {
//     textDecoration: "underline", 
//     cursor: "pointer", 
//     backgroundColor:"lavender",
//     borderRadius: "5px",
//     height:"20px",
// }

function Home() {
// este es como mapsdispatchToProps
  const dispatch = useDispatch();
  // aca con el useEffect despachas la accion a tu store  
  
  //cada vez que lo invoco me trae todo el state

  const allGames= useSelector((state)=> state.videogames)
  console.log(allGames)
  

  const allGenres = useSelector((state)=> state.genres)

// esto es equivalente a mapsStateToProps
  
//   //este setea la pagina actual, que comienza en 1 y despues va cambiando a travez de setCurrentPage
const[currentPage, setCurrentPage] = useState(1)

const[gamesPerPage, setGamesPerPage] = useState(15)

//este es un estado local que setea cuantos videogames hay por pagina
const indexLastVideogame = currentPage * gamesPerPage//por ejemplo en el 1er caso daria 15 ==> es el indice en el que tiene que empezar la proxima, esto represnta a los primero 15 games hasta la posicion 14
const indexFirstVideogame = indexLastVideogame - gamesPerPage //==> en el primer caso empieza en la pos 0, despues pos 15, despues 30, despues 45, 60, 75, 90 ==> el ultimo va a tener 12


const currentGamesPage = 
allGames.length >0? allGames.slice(indexFirstVideogame,indexLastVideogame) : allGames
// console.log(currentGamesPage)

// //aca ejecuto el setCurrentPage => set State
const paginado = (pageNumber) =>{
setCurrentPage(pageNumber)}

//constante paginado es la que me va a ayudar en el renderizado por pagina


const[order, setOrder] = useState("all")



//esto es equivalente a componentDidmount y componentDidUpdate
// aca le pasamos como segundo paramentro un array vacio porque no depende de nadie, sino tendrias que indeicar de que depende este efecto, sino se estaria actualizando todo el tiempo
useEffect (()=>{
  dispatch(getVideogames(),
  )},[dispatch])

useEffect (()=>{
  dispatch(getGenres());
},[dispatch])



 function handleClick(e){
   e.preventDefault();
   // esto es para que se resetee todo de vuelta! te traiga nuevamnete todos los games
   dispatch(getVideogames())
   setCurrentPage(1)
   setOrder(e.target.value)
  }

//las funciones que son hundleChange ==>> se desptcha una accion!!
 function handleFilterCreated(e){
   dispatch(filterCreated(e.target.value))
 }

 function handleFilterGenres(e){
  dispatch(filterByGenre(e.target.value))
}


function handleRating (e){
  dispatch(orderRating(e.target.value))
  setCurrentPage(1)
  setOrder(e.target.value)
}

 function handleOrder(e){
  e.preventDefault();
  dispatch(orderAlphabetic(e.target.value)) //me trae el array ordenado de manera asc o desc en funcion de mi e.target.value
  // // esto es para que se resetee todo de vuelta! te traiga nuevamnete toso los games
  setCurrentPage(1)
  //esto sirve para que me ordene, es decir comienza con un string vacio y luego se setea segun el target value
  setOrder(e.target.value)
}


  return (
    <div className={styles.body}>
    <div className={styles.contenedor}>
    <div>
    <NavLink to="/" exact>
    <button className={styles.btn}>
        INICIO
      </button>
      </NavLink>
    </div>
    <div className={styles.botones} >
        <NavLink to = "/videogames" exact>
          <input
          type= "submit" 
          value ="CREA TUS JUEGOS">
          </input>
          </NavLink>
  </div>

  <SearchBar/>

  <div>
      <button onClick={e=>{handleClick(e)}}> Volver a cargar tus videojuegos</button>
        </div>


      </div>

       <ul>Ordena por nombre:</ul>
        <select onChange={e=>handleOrder(e)}>
        <option value= "" disabled={true}>Orden</option> 
          <option value="asc">A-Z</option>
          <option value= "desc">Z-A</option>
          </select>
<div>
        <ul>Ordena por rating:</ul>
        <select onChange={e=>handleRating(e)}>
        <option value="all" disabled={true} >Rating</option>
          <option value="ascR">0-5</option>
           <option value= "descR">5-0</option>
        </select>
        </div>

      {/* cuando hacemos tanto un ordenamiento como un firltrado usamos el select y en option ponemos cada una de los valores a seleccionar y con su value que nos sirve para apuntar que es lo que queremos */}
          <select onChange={e=>handleFilterCreated(e)}> 
          <option value= "all">Todos</option>
          <option value= "exis">Existente</option>
          <option value= "creado">Nuevo</option>
          </select>

          <select onChange={e=>handleFilterGenres(e)}> 

          <option value= "">Generos</option>
          
          {allGenres.map((g)=>(
          <option key ={g.id} value={g.name} label={g.name} >

          </option>))}
          
          </select>
 
 
  
  {/* le pagamos al componente Paginado por Props  */}
  <Paginado
  gamesPerPage={gamesPerPage}
  allGames={allGames.length} //para que me de un valor numerico ==> 100 videogames
  paginado={paginado}
  currentPage={currentPage}
 
  /> 
  


 
 
{/* aca no vas a hacer el mapeo de allGames=> sino de la porcion de pokemons por pagina */}
 
 {currentGamesPage.length >0 ?
 currentGamesPage.map((el) =>{
    return(                     
      <div key={el.id}>
      <Link to={"/home/" + el.id}>
    <div className={styles.cards}>
   <Card name ={el.name} 
   genres= {el.createdInDb? el.genres.map((g)=>g.name) : el.genres} 
    image= {el.image}
    /> 
   
    {/* <Card name ={el.name} genres= {el.genres} 
    image= {el.image}
    />  */}
   
    </div>
    </Link>
    </div>
  )}) 
  
  :  
  
<img src={"https://c.tenor.com/1qrYT711uEoAAAAM/cargando.gif"} alt="GAME NOT FOUND"></img>
  


//<img className={styles.img} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAe1BMVEX19vcdHhwAAAD////7/P35+vsCBQCWl5i8vL0LDQsVFxWAgIFMTExaW1qOj48TFRJ+f3/w8PHb3N1gYGAvLy6jpKTMzM2ys7OampuHiIhoaWlubm7n6OnV1dYFCADDw8R3d3chIiDi4uOtrq49PTxDREOhoaEyMzFHR0fOrsDKAAAC7UlEQVR4nO3a63KiMBiAYfiSaMAD4gFF8Wzt3v8VbkDacWbVuj9SpH2fmZaWZjq8QxuT0iAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAF4y5HLTW5vpYuXwQfHx09fX2SLOscAdjZ7NjpgNTzGezeWrMOnMO7kSWjc3BDTJupBtYjhvrpq/6P5ixyNYE+iSloT5URynUoDqejIplp84iZ+1GGj2tTtsW3cWyMDOmkLg/nMZTNZNotEvkqCbJdPUWy1ZNOz13NlkqF+8qk8EwjHYtuol1Yfle5ZtELSRWSjoLNekMVCEyrwtDqQozkbFaybLVhXulpdOtCtPrwvFn4UQmrS4M7xQe68K1Hru5p+nrft6zhftoWdSFRqsW3cKnC3dJ9FGoz5NhixKfLRytZFsXqlHLZ5o79/AoeVQX9lpeuC9fLf4pXB3kFP+Mwk4oEt4oVJs4/BmFEp5O8a3CVRTWr4dlYbUWv357WZc2dfuntLguPMpHYS5uCZetTZFll+V4lqVNd9znCpPlLi8kmczek+nVTBO954Pkc126cos2V7h2o4/9zVJ15U1ZEbUWSYPyRbLpkLvKeyhuLXrZM+TuysUVyrDeW+wDFVZ7i6V2mwy3twir05MWFQap3To6PS66Z6vN2G6NsXass/K0u3CztWt31v2urrc2MOl80V3MMu3O6IO1prDW7Rlt0XTGI/VeXl/27vUMYm7s8S+f6svA9sw0ALwz+lV4moyM7b6KrZ9E3ZPOaxBPm2adR2EcNS92uxVvhXE/7zXuT+yx0C2im55ktOpFXgvLb628e3gZI++FaX/gWf/RVPkdhZJ4Jo8CvqUw9IxCCimkkEIKKaSQQgoppJBCCimkkEIKf0vhxrPGC/OhZ3nDfxEO/D+beHgZfgsX/p9ZfCn3WRi+95s39fn8MAzj5oX+CkfyKjw95TZr+yp8/W+feR1+AgEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgV/kLd3CPUalqWowAAAAASUVORK5CYII="/>

  // <div className={styles.img}
  
  // </div>
 } 

    </div>
  )
}

export default Home