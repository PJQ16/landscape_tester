import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Pages from "../components/Pages";
import axios from "axios";
import config from "../config";
import Swal from "sweetalert2";
import { UserContext } from "../components/MyContext";
export default function Profile() {
    const {userData} = useContext(UserContext);
  return (
    <div>
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <Navbar />
          <div id="content">
            <div className="container-fluid">
              <Pages namepage="Profile">
                  <div className="card p-2 bg-light col-lg-12 col-md-12 col-sm-12">
                    <div className="card-body rounded-md">
                        <div className="row justify-content-center">

                        <div className="col-lg-9 col-sm-12">
                        <img  src="img/undraw_profile_1.svg" class="rounded-circle w-25" style={{marginLeft:'35%'}} alt="..."/>
                        </div>


                        <div className="col-lg-5 col-sm-12 mt-2">
                        <label>ชื่อ</label>
                        <input type="text" name="" value={userData.firstname} className="form-control form-control-lg" disabled />
                        </div>

                        <div className="col-lg-5 col-sm-12 mt-2">
                        <label>นามสกุล</label>
                        <input type="text" name="" value={userData.surname} id="" className="form-control form-control-lg" disabled />
                        </div>

                        <div className="col-lg-10  col-sm-12 mt-2">
                        <label>อีเมล์</label>
                        <input type="text" name="" value={userData.email} className="form-control form-control-lg" disabled />
                        </div>

                        <div className="col-lg-5  col-sm-12 mt-2">
                        <label>วิทยาฃต</label>
                        <input type="text" name="" value={userData.campusName} className="form-control form-control-lg" disabled />
                        </div>


                        <div className="col-lg-5  col-sm-12 mt-2">
                        <label>หน่วยงาย</label>
                        <input type="text" name="" value={userData.facultyName} className="form-control form-control-lg" disabled />
                        </div>

                        <div className="col-lg-10  col-sm-12 mt-2">
                        <button className="btn btn-warning"> <i className="fa-solid fa-user-pen"></i> แก้ไข</button>
                        </div>
                      

                    </div>
                    </div>
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
    </div>
  );
}
