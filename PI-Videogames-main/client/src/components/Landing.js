import React from 'react'
import {NavLink} from "react-router-dom"
import styles from "./Landing.module.css"


function Landing() {
  return (
    <div className={styles.body}>
      <h1 className={styles.h1}>BIENVENIDOS A HENRY VIDEOGAMES</h1>
      <div className={styles.button}>
      <NavLink to="/home" exact>
     
      <img src = {"https://media1.giphy.com/media/eIZtPJavqQ23kc0SWp/200w.webp?cid=790b76119nkvksef9m8enm4ty0gtesc74ct6jgmvona9rzb6&rid=200w.webp&ct=ts"} alt = "img not found" width= "250px" height="250px"className={styles.btn} />
      
      </NavLink>
      </div>
    </div>
  )
}

export default Landing