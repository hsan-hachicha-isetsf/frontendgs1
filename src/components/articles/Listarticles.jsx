import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ReactLoading from 'react-loading';
const Listarticles = () => {
  const[articles,setArticles]=useState([])
  const[isLoading,setisLoading]=useState(true)

  const fetcharticles=async()=>{
    try {
      const res=await axios.get("https://backendecomgs1.vercel.app/api/api/articles")
      setArticles(res.data)
      setisLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
      fetcharticles()
  },[])
  const handleDelete=async(id)=>{
    if(window.confirm("Êtes vous sure de vouloir supprimer")){
    try {
      await axios.delete(`https://backendecomgs1.vercel.app/api/api/articles/${id}`)
      .then(res=>{
        setArticles(articles.filter(art=>art.id!=id))
      })

    } catch (error) {
      console.log(error)
    }
  }
  }
if(isLoading){
  return(
    <center><ReactLoading type="spinningBubbles" color="red" height={400} width={200} /></center>
  )
}

  return (
    <div>
     <Link to="/articles/add"> <button className="btn btn-success btn-sm"><i className="fa-solid fa-square-plus"></i> Nouveau</button></Link>
    <center>  <h2>Liste des articles</h2></center>
    <table className="table table-striped">
        <thead>
          <tr>
            <th>Référence</th>
            <th>Désignation</th>
            <th>Marque</th>
            <th>Stock</th>
            <th>Prix</th>
            <th>Image</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
          <tbody>
            {
              articles.map((art,index)=>
              <tr key={index}>
                  <td>{art.reference}</td>
                  <td>{art.designation}</td>
                  <td>{art.marque}</td>
                  <td>{art.qtestock}</td>
                  <td>{art.prix}</td>
                  <td><img src={art.imageart} width={100} height={100} alt={art.reference}/></td>
                  <td><Link to={`/articles/edit/${art.id}`} className="btn btn-warning btn-sm"><i className="fa-solid fa-pen-to-square"></i> Update</Link></td>
                  <td><button className="btn btn-danger btn-sm" onClick={()=>handleDelete(art.id)}><i class="fa-solid fa-trash"></i> Delete</button></td>
              </tr>
              )
            }
          </tbody>
    </table>
    </div>
  )
}

export default Listarticles
