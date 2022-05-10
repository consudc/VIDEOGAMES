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
console.log(currentGamesPage)

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
        <option value= "" disabled={true}>Orden</option> 
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
 

      {/* cuando hacemos tanto un ordenamiento como un firltrado usamos el select y en option ponemos cada una de los valores a seleccionar y con su value que nos sirve para apuntar que es lo que queremos */}
      <ul>
        
        <p className={styles.p}>Filtro creado/existente </p>
         
          <select className= {styles.select} onChange={e=>handleFilterCreated(e)}> 
          <option value= "all" disabled={true} >Todos</option>
          <option value= "exis">Existente</option>
          <option value= "creado">Nuevo</option>
          </select>
        </ul>

        <ul>
        
        <p className={styles.p}>Filtro por Genero </p>

          <select className= {styles.select} onChange={e=>handleFilterGenres(e)}> 

          <option value= "" disabled={true}>Generos</option>
          
          {allGenres.map((g)=>(
          <option key ={g.id} value={g.name} label={g.name} >

          </option>))}
          
          </select>

        </ul>
 
</div> 
  
  {/* le pagamos al componente Paginado por Props  */}
  <Paginado
  gamesPerPage={gamesPerPage}
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
  //  key={el.id}
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