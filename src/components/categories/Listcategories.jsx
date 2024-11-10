import axios from "axios"
import { useEffect, useState } from "react"

const Listcategories = () => {

const[categories,setCategories]=useState([])
const fetchcategories=async()=>{
    try {
        const res=await axios.get("https://backendecomgs1.vercel.app/api/api/categories")
        setCategories(res.data)
        console.log(res.data)
    } catch (error) {
        console.log("error")
    }
    
}
useEffect(()=>{
    fetchcategories()
},[])
  return (
    <div>
      Liste des catégories
      <table className="table table-striped">
        <thead>
            <tr>
                <th>Image catégorie</th>
                <th>Nom catégorie</th>
                <th>Update</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            {
               categories.map((cat,index)=>
                <tr key={index}>
                    <td><img src={cat.imagecategorie} width={100} height={100}/></td>
                    <td>{cat.nomcategorie}</td>
                    <td><button className="btn btn-warning btn-sm">Update</button></td>
                    <td><button className="btn btn-danger btn-sm">Delete</button></td>
                </tr>
            
            
            ) 
            }
        </tbody>

      </table>
      
    </div>
  )
}

export default Listcategories
