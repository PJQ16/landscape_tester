import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import { Link, useParams } from "react-router-dom";
import { Bar } from 'react-chartjs-2';
import { BarElement ,LinearScale, CategoryScale, Chart } from "chart.js";
import { UserContext } from "../components/MyContext";
import SidebarActivity from "../components/SidebarActivity";
Chart.register(LinearScale, CategoryScale,BarElement);

export default function Report() {
    const {years,fac_id} = useParams();
  const {userData} = useContext(UserContext);
 
  const backgroundImageStyle = {
    backgroundImage: 'url("/img/cloud.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    
    // Add other CSS properties as needed
  };
  return (
    <div id="page-top">
      <div id="wrapper">
        <SidebarActivity />
      <div id="content-wrapper" className="d-flex flex-column" style={backgroundImageStyle}>
      <Navbar />
        <div id="content">
     
          <div className="container-fluid">
          <span className="h1 text-dark">{userData.campusName} {userData.facultyName} {years}</span>
            <p className="m-2">หน้าออกรายงานเป็น PDF และ Excel</p>
            <div className="row">
              <div className="col-md-11 ms-3 pt-3">
                  <div className="card shadow-lg">
                    <div className="card-body">
                    <button className="btn btn-dark" data-toggle="modal" data-target="#AddReport"><i className="fa-solid fa-sheet-plastic"></i> เพิ่มรายงาน</button>
                    
                    <div className="container pt-3">
                      <table className="table table-striped">
                      <tr className="text-center">
                        <th>วันที่สร้างรายงาน</th>
                        <th><i className="fa-solid fa-file-pdf"></i> รายงาน PDF</th>
                        <th><i className="fa-solid fa-file-excel"></i> รายงาน Excel</th>
                        <th><i className="fa-solid fa-trash"></i> ลบ</th>
                      </tr>
                      <tr className="text-center">
                        <td>25/03/2556</td>
                        <td><button className="btn btn-outline-primary">ออกรายงาน PDF</button></td>
                        <td><button className="btn btn-outline-success">ออกรายงาน Excel</button></td>
                        <td><button className="border-0 rounded-circle"><i className="fa-solid fa-trash"></i></button></td>
                      </tr>
                      </table>
                    </div>
                    </div>
                  </div>
                  </div>
                     </div>
              </div>
        </div>
        <Footer />
      </div>
      </div>

      <a className="scroll-to-top rounded" href="#page-top">
  <i className="fas fa-angle-up"></i>
</a>
   <Modal title="เพิ่มข้อมูลการออกรายงาน" id="AddReport">
    xxx
   </Modal>
    </div>
  );
}
