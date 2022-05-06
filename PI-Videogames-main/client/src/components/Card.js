import React from 'react'
import { NavLink } from 'react-router-dom'

import styles from "./Card.module.css"

function Card({image, name, genres}) {

  return (
   
    <div className={styles.cardBody}>
      <h1 className={styles.name}>{name}</h1>
      {/* <h3 className={styles.name}>{genres}</h3> */}
 

       {/* <h3 className={styles.genre}>{genres.map((t,index) =>( 
        <p key={index}> {t.name}</p> 
        ))}
      </h3>  */}

<h3 className={styles.genre}>{genres.map((t,index) =>( 
        <p key={index}> {t}</p> 
        ))}
      </h3> 

      <img src={image} alt="img not found" width= "80px" height="80px" />
      


    </div>
  )
}

export default Card