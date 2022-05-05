import React from 'react'
import {NavLink} from "react-router-dom"
import styles from "./Landing.module.css"


function Landing() {
  return (
    <div className={styles.body}>
      <h1 className={styles.h1}>BIENVENIDOS A HENRY VIDEOGAMES</h1>
      <NavLink to="/home" exact>
      <button className={styles.btn}>START</button>
      </NavLink>
    </div>
  )
}

export default Landing