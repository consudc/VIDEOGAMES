import React from 'react'
import {Link, NavLink} from "react-router-dom"
import styles from "./Home.module.css"
import {useState, useEffect} from "react"//hooks
import Card from "./Card.js"
import Paginado from './Paginado.js'
import SearchBar from './SearchBar.js'

import { useDispatch, useSelector} from "react-redux"

import { getVideogames, orderAlphabetic, orderRating, filterByGenre, filterCreated, getGenres} from '../actions'


function Home() {

  const dispatch = useDispatch();
 


  const allGames= useSelector((state)=> state.videogames)
  // console.log(allGames)
  

  const allGenres = useSelector((state)=> state.genres)

  
 //este setea la pagina actual, que comienza en 1 y despues va cambiando a travez de setCurrentPage
const[currentPage, setCurrentPage] = useState(1)


const[gamesPerPage, setGamesPerPage] = useState(15)

const indexLastVideogame = currentPage * gamesPerPage
const indexFirstVideogame = indexLastVideogame - gamesPerPage


const currentGamesPage = 
allGames.length >0? allGames.slice(indexFirstVideogame,indexLastVideogame) : allGames



const paginado = (pageNumber) =>{
setCurrentPage(pageNumber)}

//constante paginado es la que me va a ayudar en el renderizado por pagina

const[order, setOrder] = useState("all")


useEffect (()=>{
  dispatch(getVideogames(),
  )},[dispatch])

useEffect (()=>{
  dispatch(getGenres());
},[dispatch])


//este es para resetear todos los games ==> 
 function handleClick(e){
   e.preventDefault();
   dispatch(getVideogames())
   setCurrentPage(1)
  
  setOrder((e.target.value))
  }


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
  dispatch(orderAlphabetic(e.target.value)) 
  setCurrentPage(1)
  setOrder(e.target.value)
}


  return (
    <div className={styles.body}>
    <div className={styles.header}>
    <div>
    <NavLink to="/" exact>
    <button className={styles.btn}>
        {"<< BACK"}
      </button>
      </NavLink>
    </div>
    <div  >
        <NavLink  to = "/videogames" exact>
          <input 
          className={styles.btnInput}
          
          type= "submit" 
          value ="CREA TUS JUEGOS">
          </input>
          </NavLink>
  </div>


  <div>
      <button className={styles.btnInput} onClick={e=>{handleClick(e)}}> TODOS TUS JUEGOS</button>
        </div>

   <SearchBar/>


      </div>
<div className={styles.filtros}>
  
       <ul>
       <p className={styles.p}>Ordena por nombre </p>
        <select className= {styles.select} onChange={e=>handleOrder(e)}>
        <option value= "all" disabled={true}>Todos</option> 
          <option value="asc">A-Z</option>
          <option value= "desc">Z-A</option>
          </select>
          </ul>


   <ul>
   <p className={styles.p}>Ordena por rating </p>
  <select className= {styles.select} onChange={e=>handleRating(e)}>
  <option value="all" disabled={true} >Rating</option>
  <option value="ascR">0-5</option>
  <option value= "descR">5-0</option>
        </select>
        </ul>
      
 


      <ul>
        
        <p className={styles.p}>Filtro creado/existente </p>
         
          <select className= {styles.select} onChange={e=>handleFilterCreated(e)}> 
          <option value= "all" disabled={false}>Todos</option>
          <option value= "exis">Existente</option>
          <option value= "creado">Nuevo</option>
          </select>
        </ul>

        <ul>
        
        <p className={styles.p}>Filtro por Genero </p>

          <select className= {styles.select} onChange={e=>handleFilterGenres(e)}> 

          <option value= "all" disabled={false}>Generos</option>
          
          {allGenres.map((g)=>(
          <option key ={g.id} value={g.name} label={g.name} >

          </option>))}
          
          </select>

        </ul>
 
</div> 
  
  {/* le pasamos al componente Paginado por Props  */}
  <Paginado
  gamesPerPage={gamesPerPage} // 15
  allGames={allGames.length} //para que me de un valor numerico ==> 100 videogames
  paginado={paginado}
  currentPage={currentPage}
  /> 
  


 
{/* aca no vas a hacer el mapeo de allGames=> sino de la porcion de pokemons por pagina */}
<div className={styles.contenedor}>
 {currentGamesPage.length?
 currentGamesPage.map((el) =>{
    return(  
    <div key = {el.id}>                   
    <Link className={styles.link} to={"/home/" + el.id}>
    <div >
   <Card
   
   className= {styles.cards}
  
   name ={el.name} 
   genres= {el.createdInDb? el.genres.map((g)=> g.name) : el.genres} 
   image= {el.image}

    /> 
    </div>
    </Link> 
    </div>
  )}) 
  
  :  


<div className={styles.img}>

<img src={"https://i.imgur.com/llF5iyg.gif?noredirect"} alt="GAME NOT FOUND" width= "200px" height="200px" ></img>

</div>

 
 } 
</div>


    </div>
  )
}

export default Home