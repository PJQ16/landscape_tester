import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../components/MyContext";
import SidebarActivity from "../components/SidebarActivity";

export default function Structure() {
  const {years} = useParams();
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
          <span className="h1 text-dark">{userData.campusName} {userData.facultyName}{years}</span>
            <p className="m-2">คำอธิบายหน้า</p>
            
          <div className="row">
            <div className="col-md-6">
              <div className="container rounded">
                ต้องใช้รูปภาพขนาด กว้าง ( 700 px ) X ( 300 px ) สูง
                <input type="file" className="form-control"/>
              </div>
            </div>

            <div className="col-md-6">
              <div className="container rounded">
               <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7zz2asm15b0_oyxlYKuP68nn6Vs7vu_tCOw&usqp=CAU" alt="nature" style={{borderRadius:'30px',height:'300px',width:'100%'}} />
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
    <Modal id="logoutModal" title="ออกจากระบบ">
    Select "Logout" below if you are ready to end your current session.
    <div className="modal-footer">
                    <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    <Link className="btn btn-primary" to="/">Logout</Link>
                </div>
    </Modal>
    </div>
  );
}
