import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Pages from "../components/Pages";
import Modal from "../components/Modal";
import axios from 'axios';
import config from "../config";
export default function HeadScope() {
  const [campus,setCampus] = useState([]);
  const { id } = useParams();
  useEffect(()=>{
      fetchData();
  },[])

  const fetchData = async() =>{
      try{
          const res = await axios.get(config.urlApi + `/headscope/${id}`);
          setCampus(res.data); 
      }catch(e){
          console.log(e.message);
      }
  }

  const backgroundImageStyle = {
    backgroundImage: 'url("/img/cloud.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",

    // Add other CSS properties as needed
  };
  return (
    <div>
          <div id="wrapper">
            <Sidebar />
            <div id="content-wrapper" className="d-flex flex-column">
              <Navbar />
              <div id="content">
                <div className="container-fluid">
                <Pages namepage={`รูปแบบการเก็บข้อมูล ${id === '4' ? 'รายงานแยก' : (id === '5' ? 'ภาคดูดกลับ' : `ขอบเขตที่ ${id}`)}`} >

             
                  <div className="table-responsive mt-3">
        <table className="table table-striped table-bordered table-hover">
            <thead className='text-center'>
                <tr>
                    <th>ลำดับ</th>
                    <th>รูปแบบการเก็บข้อมูล</th>
                    <th>เมนู</th>
                </tr>
            </thead>
            <tbody className='text-center'>    
            {campus.map((item, index) =>
    <tr key={index}>
        <td>{index + 1}</td>
        <td><Link className="text-decoration-none text-dark"  to={`/scope/${id}/${item.id}`} >{item.head_name}</Link></td>
        <td><div className="btn-group">
  <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
  </button>
  <ul className="dropdown-menu">
    <li><a className="dropdown-item" href="#"><i className="fa-solid fa-pen-to-square"></i> แก้ไข</a></li>
    <li><a className="dropdown-item" href="#"><i className="fa-solid fa-trash"></i> ลบ</a></li>
  </ul>
</div></td>
    </tr>
)}
            </tbody>
            <tfoot className='text-center'>
            <tr>
                    <th>ลำดับ</th>
                    <th>รูปแบบการเก็บข้อมูล</th>
                    <th>เมนู</th>
                </tr>
            </tfoot>
        </table>
        </div>
                        
                    
                  </Pages>
                </div>
              </div>
              <Footer />
            </div>
          </div>
    
          <Link className="scroll-to-top rounded" to="#page-top">
            <i className="fas fa-angle-up"></i>
          </Link>
          <Modal>
        
          </Modal>
        </div>
      );
    }
