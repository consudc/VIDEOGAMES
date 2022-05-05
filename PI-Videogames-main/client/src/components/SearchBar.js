import React from 'react'
import {getVideogameName} from "../actions/index"
import { useDispatch} from 'react-redux';
import {useState} from "react"


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
    type="text"
    placeholder="Search.."
    onChange={(e)=>handleChange(e)}
    value={name}
    label= "Busca tus juegos: "
    />
    <input
       type= "submit" 
       value ="BUSCAR"
      // onClick={(e)=>handleClick(e)}
      />

</form>
      </div>

  );

}

export default SearchBar