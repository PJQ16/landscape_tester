import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import { Link } from "react-router-dom";
import Pages from "../components/Pages";
import axios from "axios";
import config from "../config";
import Tab from "../components/Tab";
import CardGroup from "../components/CardGroup";
import CardGroup2 from "../components/CardGroup2";

export default function ExplainPage() {
    const [categoryData,setCategoryData] = useState([{}]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDataApi = async () => {
            try {
                const res = await axios(config.apiUrl + '/scope/apiActivityScope');
                setCategoryData(res.data);
            } catch (e) {
                console.log('fetchData Error' + e.message);
            } finally {
                // ตั้งค่า loading เป็น false เมื่อข้อมูลได้รับการโหลดเสร็จสิ้น
                setLoading(false);
            }
        };
    
        // เรียกใช้ fetchDataApi หลังจาก setTimeout 1 วินาที
        const timeout = setTimeout(() => {
            fetchDataApi();
        }, 1000);
    
        // Clear timeout เมื่อ component unmount
        return () => clearTimeout(timeout);
    }, []);
    
    

  return (
    <div>
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <Navbar />
          <div id="content">
            <div className="container-fluid">
              <Pages namepage="คำอธิบาย">
                <div className="container">
                    <Tab>
                    <div label="สำหรับการปล่อยก๊าซเรือนกระจก">
                       <CardGroup/>
                    </div>
                    <div label="สำหรับการกรอกข้อมูล">
                        <CardGroup2 />
                    </div>
                    </Tab>
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
      <Modal id="logoutModal" title="ออกจากระบบ">
        Select "Logout" below if you are ready to end your current session.
        <div className="modal-footer">
          <button
            className="btn btn-secondary"
            type="button"
            data-dismiss="modal"
          >
            Cancel
          </button>
          <Link className="btn btn-primary" to="/">
            Logout
          </Link>
        </div>
      </Modal>
    </div>
  );
}
