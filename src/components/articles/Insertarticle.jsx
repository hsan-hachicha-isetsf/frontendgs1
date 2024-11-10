import axios from "axios"
import { useEffect, useState } from "react"
import { Col, Form, Row } from "react-bootstrap"
import { Link,useNavigate } from "react-router-dom"
import { FilePond,registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

const Insertarticle = () => {
  const[article,setArticle]=useState({})
  const[scategories,setScategories]=useState([])
  const [files, setFiles] = useState([]);
  
  const navigate=useNavigate()
  const fetchscategories=async()=>{
    try {
      const res=await axios.get("https://backendecomgs1.vercel.app/api/api/scategories")
      setScategories(res.data)
      setisLoading(false)
    } catch (error) {
      console.log(error)
    }

  }
  useEffect(()=>{
    fetchscategories()
  },[])

  const handleSave=async(e)=>{
    try {
      e.preventDefault()
      await axios.post("https://backendecomgs1.vercel.app/api/api/articles",article)
      .then(res=>{
        navigate("/articles")
      })
    } catch (error) {
      console.log(error)
    }
  }
  const serverOptions = () => { 
    return {
    process: (fieldName, file, metadata, load, error, progress, abort) => {
    
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'iit2025S1');
    data.append('cloud_name', 'esps');
data.append('publicid', file.name);
axios.post('https://api.cloudinary.com/v1_1/esps/image/upload', data)
.then((response) => response.data)
.then((data) => {

setArticle({...article,imageart:data.url}) ;
load(data);
})
.catch((error) => {
console.error('Error uploading file:', error);
error('Upload failed');
abort();
});
},
};
};
  return (
    <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
    <center><h2>Insérer un article</h2></center>
      <Form>
      <Row className="mb-2">
      <Form.Group as={Col} md="6" >
        <Form.Label>Référence</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Référence" 
        value={article.reference}
        onChange={(e)=>setArticle({...article,reference:e.target.value})}
        />
      </Form.Group>
      <Form.Group as={Col} md="6" >
        <Form.Label>Désignation</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Désignation" 
        value={article.designation}
        onChange={(e)=>setArticle({...article,designation:e.target.value})}
        />
      </Form.Group>
      </Row>
      <Row className="mb-2">
      <Form.Group as={Col} md="6" >
        <Form.Label>Marque</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Marque" 
        value={article.marque}
        onChange={(e)=>setArticle({...article,marque:e.target.value})}
        />
      </Form.Group>
      <Form.Group as={Col} md="6" >
        <Form.Label>Stock</Form.Label>
        <Form.Control 
        type="number" 
        placeholder="Stock" 
        value={article.qtestock}
        onChange={(e)=>setArticle({...article,qtestock:e.target.value})}
        />
        
      </Form.Group>
      </Row>
        <Row className="mb-2">
      <Form.Group as={Col} md="6" >
        <Form.Label>Prix</Form.Label>
        <Form.Control 
        type="number" 
        placeholder="Prix" 
        value={article.prix}
        onChange={(e)=>setArticle({...article,prix:e.target.value})}
        />
      </Form.Group>
      <Form.Group as={Col} md="6" >
        <Form.Label>Image</Form.Label>
        <div style={{ width: "80%", margin: "auto", padding: "1%" }}>
<FilePond

files={files}
acceptedFileTypes="image/*"
onupdatefiles={setFiles}
allowMultiple={true}
server={serverOptions()}
name="file"

/>
</div>
      </Form.Group>
      </Row>
     <Row className="mb-2">
      <Form.Group as={Col} md="6" >
        <Form.Label>Sous catégorie</Form.Label>
        <Form.Control 
        type="select"
        as="select"
        placeholder="Sous catégorie" 
        value={article.scategorieID}
        onChange={(e)=>setArticle({...article,scategorieID:e.target.value})}
        >
            {
              scategories.map((scat,index)=>
              <option value={scat.id}>{scat.nomscategorie}</option>
              )
            }

          </Form.Control>
      </Form.Group>
      </Row>
      <div className="d-flex justify-content-end" >
        <button className="btn btn-success btn-sm" onClick={(e)=>handleSave(e)}><i class="fa-solid fa-floppy-disk"></i> Enregistrer</button>
        &nbsp;
        <Link to="/articles">
        <button className="btn btn-danger btn-sm">
          <i class="fa-solid fa-person-walking-arrow-right"></i>
           Annuler
        </button>
        </Link>
      </div>
    </Form>
    </div>
  )
}

export default Insertarticle
