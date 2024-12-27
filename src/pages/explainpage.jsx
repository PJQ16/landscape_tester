import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import { Link } from "react-router-dom";
import Pages from "../components/Pages";
import Tab from "../components/Tab";
import CardGroup from "../components/CardGroup";
import CardGroup2 from "../components/CardGroup2";
import ScrollTop from "../components/ScrollTop";

export default function ExplainPage() {
  
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

        <ScrollTop/>
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
