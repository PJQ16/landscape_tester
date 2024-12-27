import React, {useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Pages from "../components/Pages";
import Modal from "../components/Modal";
import axios from "axios";
import config from "../config";
import Swal from "sweetalert2";
import ScrollTop from "../components/ScrollTop";

export default function Faculty() {
  const [campus, setCampus] = useState([]);
  const { id } = useParams();
  const [logo, setLogo] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchData();
  });

  const fetchData = async () => {
    try {
      const res = await axios.get(config.urlApi + `/place/showCampus/${id}`);
      setCampus(res.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  const handlerUpdate = async (e, itemId) => {
    try {
      e.preventDefault();

      if (logo === "") {
        Swal.fire({
          icon: "warning",
          title: "เตือน",
          text: "กรุณาเพิ่มรูปในฟอร์มให้เรียบร้อย",
        });
      } else {
        const formData = new FormData();
        formData.append("logo", logo);

        const url = `${config.urlApi}/place/updateLogo/${itemId}`;

        await axios.put(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        fetchData();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  const getHandlerStatus = (status) => {
    switch (status) {
      case "0":
        return (
          <i className="fa-solid fa-circle-dot" style={{ color: "#8ED960" }}></i>
        );
      case "1":
        return (
          <i className="fa-solid fa-circle-dot" style={{ color: "#979494" }}></i>
        );
      default:
        return (
          <i className="fa-solid fa-circle-dot" style={{ color: "#ffffff" }}></i>
        );
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setLogo(item.logo || "");
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
                    <thead className="text-center">
                      <tr>
                        <th>ลำดับ</th>
                        <th>รูปภาพ</th>
                        <th>รหัสวิทยาเขค</th>
                        <th>รหัสหน่วยงาน</th>
                        <th>ชื่อหน่วยงาน</th>
                        <th>ที่อยู่</th>
                        <th>latitude</th>
                        <th>longitude</th>
                        <th>สถานะ</th>
                        <th>เมนู</th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {campus.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            {item.logo === "" ? (
                              <img
                                src="https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg"
                                width={60}
                                height={60}
                                alt=""
                              />
                            ) : (
                              <img
                                src={`${config.urlApi}/logos/${item.logo}`}
                                width={60}
                                height={60}
                                alt=""
                              />
                            )}
                          </td>
                          <td>{item.campus_id}</td>
                          <td>{item.id}</td>
                          <td>{item.fac_name}</td>
                          <td>{item.address}</td>
                          <td>{item.latitude}</td>
                          <td>{item.longitude}</td>
                          <td>{getHandlerStatus(item.status_activity)}</td>
                          <td>
                            <div className="btn-group">
                              <button
                                type="button"
                                className="btn btn-secondary dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              ></button>
                              <ul className="dropdown-menu">
                                <li>
                                  <Link
                                    className="dropdown-item"
                                    onClick={() => handleEdit(item)}
                                    data-toggle="modal"
                                    data-target="#modalModifyData"
                                    to='#'
                                  >
                                    <i className="fa-solid fa-pen-to-square"></i>{" "}
                                    แก้ไข
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="text-center">
                      <tr>
                        <th>ลำดับ</th>
                        <th>รูปภาพ</th>
                        <th>รหัสวิทยาเขค</th>
                        <th>รหัสหน่วยงาน</th>
                        <th>ชื่อหน่วยงาน</th>
                        <th>ที่อยู่</th>
                        <th>latitude</th>
                        <th>longitude</th>
                        <th>สถานะ</th>
                        <th>เมนู</th>
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

      {selectedItem && (
        <Modal id="modalModifyData" title={selectedItem.fac_name}>
          <form onSubmit={(e) => handlerUpdate(e, selectedItem.id)}>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header text-center">รูปภาพ</div>
                  <div className="card-body">
                    {selectedItem.logo === "" ? (
                      <input
                        type="file"
                        className="form-control"
                        onChange={(e) => setLogo(e.target.files[0])}
                      />
                    ) : (
                      <img
                        src={`${config.urlApi}/logos/${selectedItem.logo}`}
                        width={200}
                        height={200}
                        alt={selectedItem.fac_name}
                        onChange={(e) => setLogo(e.target.files[0])}
                      />
                    )}
                    <input type="hidden" defaultValue={selectedItem.id} />
                  </div>

                  {selectedItem.logo === "" && (
                    <button
                      className="btn btn-secondary mx-5 mb-2"
                      type="submit"
                    >
                      บันทึก
                    </button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </Modal>
      )}

      <ScrollTop/>
    </div>
  );
}
