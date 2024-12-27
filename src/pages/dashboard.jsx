import React, { useEffect, useState } from 'react';
import Map from '../components/Map';
import axios from 'axios';
import config from '../config';
import BarChart from '../components/Bar';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollTop from '../components/ScrollTop';
import Modal from '../components/Modal';
import { Link } from 'react-router-dom';

export default function Dashboard() {
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [dataScope, setDataScope] = useState([]);
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


    useEffect(() => {
        fetchDataScope();
    }, []);

    const fetchDataScope = async () => {
        try {
            const res = await axios.get(config.urlApi + '/dataDashboard');
            setDataScope(res.data);
        } catch (e) {
            console.log(e.message);
        }
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
            <div className="row"></div>
            <div className="row" style={{ marginTop: '30px' }}>
                <div className="col-md-12">
                    <Map />
                </div>
            </div>
            <div className="row" style={{ marginTop: '30px' }}>
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            ภาพรวมการปล่อยก๊าซเรือนกระจก/ปี
                        </div>
                        <div className="card-body">
                            <BarChart dataScope={dataScope} />
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
        <Footer />
      </div>
      </div>

      <ScrollTop/>
      
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
