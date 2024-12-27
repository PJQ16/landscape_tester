import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Pages from "../components/Pages";
import Footer from "../components/Footer";
import TabUser from "./Tab/TabUser";
import TabRole from "./Tab/TabRole";
import ScrollTop from "../components/ScrollTop";

function User() {
  return (
    <div>
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <Navbar />
          <div id="content">
            <div className="container-fluid">
              <Pages namepage="จัดการผู้ใช้งานในระบบ">
                
                <div className="col-md-12 bg-light my-2">
                  <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                      <button
                        className="nav-link active"
                        id="nav-home-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-home"
                        type="button"
                        role="tab"
                        aria-controls="nav-home"
                        aria-selected="true"
                      >
                        จัดการผู้ใช้งาน
                      </button>
                      <button
                        className="nav-link"
                        id="nav-profile-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-profile"
                        type="button"
                        role="tab"
                        aria-controls="nav-profile"
                        aria-selected="false"
                      >
                        สิทธิ์การเข้าถึงระบบ
                      </button>
                    </div>
                  </nav>
                  <div className="tab-content" id="nav-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="nav-home"
                      role="tabpanel"
                      aria-labelledby="nav-home-tab"
                  
                    >
                      <TabUser />
                    </div>
                    <div
                      className="tab-pane fade"
                      id="nav-profile"
                      role="tabpanel"
                      aria-labelledby="nav-profile-tab"
                    >
                      <TabRole />
                    </div>
                  </div>
                </div>
              </Pages>
            </div>
          </div>
          <Footer />
        </div>
      </div>

      <ScrollTop/>
      
    </div>
  );
}

export default User;
