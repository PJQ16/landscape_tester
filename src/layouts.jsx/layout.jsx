import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Content from "../components/Content";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import { Link } from "react-router-dom";

export default function Layout() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleLogout = (event) => {
    event.preventDefault();
    // ทำตามขั้นตอนการ Logout ที่คุณต้องการ
    // ตัวอย่าง: window.location.href = "/login";
    // หรือใช้ React Router history API
    handleClose();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const backgroundImageStyle = {
    backgroundImage: 'url("/img/cloud.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    
    // Add other CSS properties as needed
  };
  return (
    <div>
      <div id="wrapper">
        <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column" style={backgroundImageStyle}>
      <Navbar />
        <div id="content" >
     
          <div className="container-fluid" >
          <Content page={currentPage} onPageChange={handlePageChange} />
          </div>
        </div>
        <Footer />
      </div>
      </div>

      <Link className="scroll-to-top rounded" to="#page-top">
        <i className="fas fa-angle-up"></i>
    </Link>
    <Modal show={show} onHide={handleClose} id="logoutModal" title="ออกจากระบบ">
      Select "Logout" below if you are ready to end your current session.
      <div className="modal-footer">
        <button className="btn btn-secondary" type="button" onClick={handleClose}>Cancel</button>
        <Link className="btn btn-primary" to="/login" onClick={handleLogout}>Logout</Link>

      </div>
    </Modal>
    </div>
  );
}
