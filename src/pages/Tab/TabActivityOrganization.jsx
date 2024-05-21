import axios from 'axios';
import React, { useEffect, useState } from 'react'
import config from '../../config';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
export default function TabActivityOrganization() {
    const [showImages,setShowImages] = useState([]);
    const {id} = useParams();

    useEffect(() =>{
      fetchImages();
    },[]);

  const fetchImages = async()=>{
    try{
  
      const res = await axios.get(config.urlApi + `/images/ImageFr03/${id}`)
      setShowImages(res.data);
      
    }catch(error){
      Swal.fire(
        {
          icon:'error',
          title:'error',
          text:error.message
        }
      )
    }
}
  return (
    <div className='d-flex flex-column justify-content-center '>
      <h3 className='text-center'>โครงสร้างองค์กร</h3>
      <div className="p-3 m-1">
      {showImages.map((item) => 
      <img src={`${config.urlApi}/uploads/${item.file_name}`} className='m-2' style={{width:'100%'}} key={item.id} alt="" />
      )}
          </div>
    </div>
  )
}
