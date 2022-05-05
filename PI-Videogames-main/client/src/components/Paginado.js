import React from 'react'
import styles from "./Paginado.module.css"


//aca te traes por props el estado de tus games per Page=15, el numero de videogames en todo el estado global =100 
//paginado ==> se va seteando currentPage a medida que (el numero de numero de pagina cambia )


function Paginado({allGames, gamesPerPage, paginado, currentPage}) {
const pageNumber = []

    //que redonde por arriba la division
    //en nuestro caso son 7 --> 100/15
    for (let i= 0; i<= (allGames/gamesPerPage); i++){
         pageNumber.push(i+1)

    }
//entonces en PageNumber te va devolver un array con 7 numeros que equivalen a la cantidad de paginas que hay, de 15 juegos por pagina

               // aca le decis, existe pageNumber? si si mapealo y creame un ul con cada uno de los numero de pagina  y que se pueda hacer un onclick en cada uno de los numero y ahi se va a ir seteando el estado del currentPage a medida que le pasemos el numero atravez del onclik de c/ pagina ==>setCurrentPage 
             // <a  onClick={()=>paginado(number)}>{number}</a>
   
  
const minLimitPage = 1

const maxLimitPage = (allGames/gamesPerPage)


  const  handleClickPrev = () =>{
    paginado(currentPage - 1)
    
    if (currentPage -1 < minLimitPage){
      paginado(minLimitPage)
    }
  }
    
const  handleClickNext = () =>{
 paginado(currentPage + 1)

 if (currentPage + 1 > maxLimitPage){
  paginado(maxLimitPage)
}
}


  return (
    <nav className={styles.nav} >
        <ul >
        <button className= {styles.button} onClick={handleClickPrev}>Prev</button>    
            { pageNumber &&
            pageNumber.map(number => (    
                <li key={number}
                onClick={()=>paginado(number)}
                className={currentPage === number? styles.active : null}
                >{number}
                </li>
                ))
            }
          <button className= {styles.button} onClick={handleClickNext}>Next</button>    
        </ul>
    </nav>
  )
}

export default Paginado