import React from 'react'
import {getVideogameName} from "../actions/index"
import { useDispatch} from 'react-redux';
import {useState} from "react"

import style from "./SearchBar.module.css"


function SearchBar() {
  const dispatch = useDispatch();
  //const allGames= useSelector((state)=> state.videogames)

  const [name, setName] = useState("")
  // console.log(name)
  

function handleClick(e){
  e.preventDefault() 
  dispatch(getVideogameName(name))
  setName("")
  }

  function handleChange (e){
  e.preventDefault()
  // e.target.value = name
  setName(e.target.value)
  }
  
  return (
    <div>
    <form onSubmit={(e)=>handleClick(e)} >
    <input
    className={style.search}
    type="text"
    placeholder="SEARCH.."
    onChange={(e)=>handleChange(e)}
    value={name}
    // label= "Busca tus juegos: "
    />
    <input
    className={style.boton}
       type= "submit" 
       value ="BUSCAR"
      // onClick={(e)=>handleClick(e)}
      />

</form>
      </div>

  );

}

export default SearchBar