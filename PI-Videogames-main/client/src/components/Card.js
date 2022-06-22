import React from 'react'
import "./CardNew.css"

function Card({image, name, genres, rating}) {

  return (
<div>

  <div className="gameCard">
  <div className="divdetailgame">
  <div className="face front">
  {/* <button onClick={onClose}>x</button> */}
  <img  src={image} alt="img not found" />

  </div>
    
<div className="textVideogame face back">
<h1 className="nombreGame"><i>{name}</i></h1>
<h3 className="ratingeGame"><i>{rating}</i></h3>
<h4><i>{genres.map((t,index) =>( 
        <p key={index}> {t}</p> 
        ))}
      </i></h4> 

    </div>
    </div>
    </div>
  </div>
  )
}



export default Card

