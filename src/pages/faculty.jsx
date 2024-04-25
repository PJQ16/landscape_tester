import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Pages from "../components/Pages";
import Modal from "../components/Modal";
import axios from 'axios';
import config from "../config";
export default function Faculty() {
  const [campus,setCampus] = useState([]);
  const { id } = useParams();
  useEffect(()=>{
      fetchData();
  },[])

  const fetchData = async() =>{
      try{
          const res = await axios.get(config.urlApi + `/place/showCampus/${id}`);
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
                  <Pages namepage="ข้อมูลหน่วยงาน">
             
                  <div className="table-responsive mt-3">
        <table className="table table-striped table-bordered table-hover">
            <thead className='text-center'>
                <tr>
                    <th>ลำดับ</th>
                    <th>รูปภาพ</th>
                    <th>รหัสวิทยาเขค</th>
                    <th>รหัสหน่วยงาน</th>
                    <th>ชื่อหน่วยงาน</th>
                    <th>ที่อยู่</th>
                    <th>latitude</th>
                    <th>longitude</th>
                    <th>เปิด</th>
                    <th>ปิด</th>
                    <th>เมนู</th>
                </tr>
            </thead>
            <tbody className='text-center'>    
            {campus.map((item, index) =>
    <tr key={index}>
        <td>{index + 1}</td>
        <td><img src="https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg" width={60} height={60} alt="" /></td>
        <td>{item.campus_id}</td>
        <td>{item.id}</td>
        <td>{item.fac_name}</td>
        <td>{item.address}</td>
        <td>{item.latitude}</td>
        <td>{item.longitude}</td>
        <td>
            <div className="form-check">
                <input className="form-check-input" type="radio" name={`flexRadioDefault${index}`} id={`flexRadioDefault${item.id}`} value={index} checked />
    
            </div>
        </td>
        <td>
            <div className="form-check">
                <input className="form-check-input" type="radio" name={`flexRadioDefault${index}`} id={`flexRadioDefaultChecked${item.id}`}  value={index} />
                
            </div>
        </td>
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
                    <th>รูปภาพ</th>
                    <th>รหัสวิทยาเขค</th>
                    <th>รหัสหน่วยงาน</th>
                    <th>ชื่อหน่วยงาน</th>
                    <th>ที่อยู่</th>
                    <th>latitude</th>
                    <th>longitude</th>
                    <th>เปิด</th>
                    <th>ปิด</th>
                    <th>เมนู</th>
                </tr>
            </tfoot>
        </table>
        <button className='btn btn-secondary hover:bg-primary'>บันทึก</button>
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
