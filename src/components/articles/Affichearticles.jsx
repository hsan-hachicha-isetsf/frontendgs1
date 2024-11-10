import React from 'react'
import MediaCard from './MediaCard'

const Affichearticles = ({articles}) => {
  return (
     <div className="card-container">
    
      {
     articles.map((art,index)=>
        <MediaCard 
        reference={art.reference}
        designation={art.designation}
        prix={art.prix}
        image={art.imageart}/>
        )
      }
   </div>
  )
}

export default Affichearticles
