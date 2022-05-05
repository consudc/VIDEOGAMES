import React from 'react'
import {NavLink} from "react-router-dom";
import styles from "../components/VideogameDetail.module.css"
import { getDatailVideogame } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';


function VideogameDetail() {

  const dispatch = useDispatch()
 
  // const allGenres = useSelector((state)=> state.genres)
  // console.log(allGenres)
  // const allGames = useSelector((state)=> state.videogames)
  // console.log(allGames)

  const allDetail = useSelector((state)=> state.detail)

  useEffect (()=>{
    dispatch(getDatailVideogame());
  },[dispatch])
  
  
  return (
    <div>VideogameDetail</div>
  )
}

export default VideogameDetail