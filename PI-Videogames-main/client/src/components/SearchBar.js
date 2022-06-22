import React from 'react'
import {getVideogameName} from "../actions/index"
import { useDispatch} from 'react-redux';
import {useState} from "react"



import style from "./SearchBar.module.css"


function SearchBar({setCurrentPage}) {
  const dispatch = useDispatch();


  const [name, setName] = useState("")
  // console.log(name)
  

function handleClick(e){
  e.preventDefault() 
  dispatch(getVideogameName(name))
  setCurrentPage(1)
  setName("")
  }

  function handleChange (e){
  e.preventDefault()
  setName(e.target.value)
  }

  
  
  return (
    <div>
    <form onSubmit={(e)=>handleClick(e)} >
    <input
    className={style.search}
    type="search"
    placeholder="BUSCAR.."
    onChange={(e)=>handleChange(e)}
    value={name}
    aria-label="Search"
    
  
    />
    <input
    className={style.boton}
    type= "submit"
    value= "Buscar"
    />

</form>
      </div>

  );

}

export default SearchBar