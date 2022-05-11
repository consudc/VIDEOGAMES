import React from 'react'


import styles from "./Card.module.css"

function Card({image, name, genres}) {

  return (
  <div className={styles.card}>
  <img  className={styles.imagen} src={image} alt="img not found" width= "190px" height="90px" />


    <div className={styles.cardBody}>
      <h1 className={styles.name}>{name}</h1>

<h3 className={styles.genre}>{genres.map((t,index) =>( 
        <p key={index}> {t}</p> 
        ))}
      </h3> 



      
      


    </div>

    </div>
  )
}

export default Card