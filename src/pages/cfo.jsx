import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Pages from "../components/Pages";
import Modal from "../components/Modal";
import axios from "axios";
import config from "../config";
import ScrollTop from "../components/ScrollTop";

export default function CFO() {
  const [campusData, setCampusData] = useState([]);
  const [selectedCampus, setSelectedCampus] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { years } = useParams();

  useEffect(() => {
    fetchData();
  });

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${config.urlApi}/activityperiod/${parseInt(years) - 543}`
      );
      setCampusData(res.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleCampusChange = (e) => {
    setSelectedCampus(e.target.value);
    setSelectedFaculty("");
  };

  const handleFacultyChange = (e) => {
    setSelectedFaculty(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const getActivityStatus = (status) => {
    switch (status) {
      case "0":
        return (
          <i className="fa-solid fa-circle-dot" style={{ color: "#979494" }}></i>
        );
      case "1":
        return (
          <i className="fa-solid fa-circle-dot" style={{ color: "#D9C760" }}></i>
        );
      case "2":
        return (
          <i className="fa-solid fa-circle-dot" style={{ color: "#8ED960" }}></i>
        );
      case "3":
        return (
          <i className="fa-solid fa-circle-dot" style={{ color: "#D96460" }}></i>
        );
      default:
        return (
          <i className="fa-solid fa-circle-dot" style={{ color: "#ffffff" }}></i>
        );
    }
  };

  return (
    <div>
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <Navbar />
          <div id="content">
            <div className="container-fluid">
              <Pages namepage={`การตรวจสอบ CFO  ปี ${years}`}>
                <div className="row mt-3">
                  <div className="col-md-2">
                    <label style={{ color: "rgb(161, 143, 232)" }}>
                      <i className="fa-solid fa-land-mine-on"></i> วิทยาเขต
                    </label>
                    <select
                      className="form-control"
                      onChange={handleCampusChange}
                      value={selectedCampus}
                    >
                      <option value="">เลือกวิทยาเขต</option>
                      {campusData.map((campus, index) => (
                        <option key={index} value={campus.campus_name}>
                          {campus.campus_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-2">
                    <label style={{ color: "rgb(161, 143, 232)" }}>
                      <i className="fa-regular fa-building"></i> หน่วยงาน
                    </label>
                    <select
                      className="form-control"
                      onChange={handleFacultyChange}
                      value={selectedFaculty}
                    >
                      <option value="">เลือกหน่วยงาน</option>
                      {selectedCampus &&
                        campusData
                          .find((campus) => campus.campus_name === selectedCampus)
                          .faculties.map((faculty, index) => (
                            <option key={index} value={faculty.fac_name}>
                              {faculty.fac_name}
                            </option>
                          ))}
                    </select>
                  </div>

                  <div className="col-md-2">
                    <label style={{ color: "rgb(161, 143, 232)" }}>
                      <i className="fa-solid fa-magnifying-glass-location"></i>{" "}
                      ค้นหา
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                  </div>

                  <div className="col-md-5">
                    <div className="d-flex justify-content-end">
                      <div className="border border-1 bg-white shadow-sm p-2 rounded-sm">
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <i
                            className="fa-solid fa-circle-dot"
                            style={{ color: "#979494" }}
                          ></i>
                          <label style={{ margin: "5px" }}>ไม่ดำเนินการ</label>
                        </div>

                        <div style={{ display: "flex", alignItems: "center" }}>
                          <i
                            className="fa-solid fa-circle-dot"
                            style={{ color: "#D9C760" }}
                          ></i>
                          <label style={{ marginLeft: "5px" }}>
                            รอดำเนินการ
                          </label>
                        </div>

                        <div style={{ display: "flex", alignItems: "center" }}>
                          <i
                            className="fa-solid fa-circle-dot"
                            style={{ color: "#8ED960" }}
                          ></i>
                          <label style={{ marginLeft: "5px" }}>
                            ดำเนินการเรียบร้อย
                          </label>
                        </div>

                        <div style={{ display: "flex", alignItems: "center" }}>
                          <i
                            className="fa-solid fa-circle-dot"
                            style={{ color: "#D96460" }}
                          ></i>
                          <label style={{ marginLeft: "5px" }}>
                            เกิดข้อผิดพลาด
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="table-responsive mt-3">
                  <table className="table table-striped table-bordered table-hover">
                    <thead className="text-center">
                      <tr>
                        <th>วิทยาเขต</th>
                        <th>หน่วยงาน</th>
                        <th>สถานะการตรวจสอบ</th>
                        <th>เพิ่มเติม</th>
                      </tr>
                    </thead>
                    <tbody>
                      {campusData
                        .filter((campus) => {
                          if (selectedCampus && selectedFaculty) {
                            return campus.campus_name === selectedCampus;
                          } else if (selectedCampus && !selectedFaculty) {
                            return campus.campus_name === selectedCampus;
                          } else {
                            return true;
                          }
                        })
                        .map((campus, index) =>
                          campus.faculties
                            .filter((faculty) => {
                              if (selectedFaculty) {
                                return faculty.fac_name === selectedFaculty;
                              } else {
                                return true;
                              }
                            })
                            .map((faculty, index) =>
                              faculty.activityperiods
                                .filter((activityperiod) => {
                                  // กรองตามคำค้นหาในชื่อหน่วยงานหรือวิทยาเขต
                                  if (searchTerm) {
                                    return (
                                      faculty.fac_name
                                        .toLowerCase()
                                        .includes(searchTerm.toLowerCase()) ||
                                      campus.campus_name
                                        .toLowerCase()
                                        .includes(searchTerm.toLowerCase())
                                    );
                                  } else {
                                    return true;
                                  }
                                })
                                .map((activityperiod, n) => (
                                  <tr key={n} className="text-center">
                                    <td>{campus.campus_name}</td>
                                    <td>{faculty.fac_name}</td>
                                    <td>
                                      {getActivityStatus(
                                        activityperiod.status_activity
                                      )}
                                    </td>
                                    <td>
                                      <Link
                                        className="text-decoration-none text-dark"
                                        to={`/activityperiod/Info/${activityperiod.id}/${years}`}
                                      >
                                        <i
                                          className="fa-solid fa-eye fa-2x"
                                          style={{
                                            color: "rgb(161, 143, 232)",
                                          }}
                                        ></i>
                                      </Link>
                                    </td>
                                  </tr>
                                ))
                            )
                        )}
                    </tbody>
                    <tfoot className="text-center">
                      <tr>
                        <th>วิทยาเขต</th>
                        <th>หน่วยงาน</th>
                        <th>สถานะการตรวจสอบ</th>
                        <th>เพิ่มเติม</th>
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

      <ScrollTop/>
      <Modal></Modal>
    </div>
  );
}
