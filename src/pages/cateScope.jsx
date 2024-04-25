import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Pages from "../components/Pages";
import Modal from "../components/Modal";
import axios from "axios";
import config from "../config";
export default function CateScope() {
  const [cateScope, setCateScope] = useState([]);
  const { id, head_id } = useParams();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        config.urlApi + `/categoryScope/${head_id}`
      );
      setCateScope(res.data);
    } catch (e) {
      console.log(e.message);
    }
  };
  const gases = [
    "CO2",
    "Fossil_CH4",
    "CH4",
    "N2O",
    "SF6",
    "NF3",
    "HFCs",
    "PFCs",
    "GWP_HFCs",
    "GWP_PFCs",
    "kgCO2e",
    "sources",
  ];

  const backgroundImageStyle = {
    backgroundImage: 'url("/img/cloud.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",

    // Add other CSS properties as needed
  };
  return (
    <div>
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <Navbar />
          <div id="content">
            <div className="container-fluid">
          
                <Pages
                  namepage={`ก๊าซเรือนกระจก`}
                >
                  <div className="table-responsive mt-3">
                    <table className="table table-striped table-bordered table-hover">
                      <thead className="text-center">
                        <tr>
                          <th>ลำดับ</th>
                          <th>ก๊าซเรือนกระจก</th>
                          <th>หน่วย</th>
                          {gases.map((gas) => (
                            <th>{gas}</th>
                          ))}
                          <th>เปิด</th>
                          <th>ปิด</th>
                          <th>เมนู</th>
                        </tr>
                      </thead>
                      <tbody>
                      {cateScope.map((item, index) => 
                        <tr className="text-center">
                          <td>{index +1}</td>
                          <td>{item.name}</td>
                          <td>{item.lci}</td>
                          <td>{item.CO2}</td>
                          <td>{item.Fossil_CH4}</td>
                          <td>{item.CH4}</td>
                          <td>{item.N2O}</td>
                          <td>{item.SF6}</td>
                          <td>{item.NF3}</td>
                          <td>{item.HFCs}</td>
                          <td>{item.PFCs}</td>
                          <td>{item.GWP_HFCs}</td>
                          <td>{item.GWP_PFCs}</td>
                          <td>{item.kgCO2e}</td>
                          <td>{item.sources}</td>
                          <td>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name={`flexRadioDefault${index}`}
                                id={`flexRadioDefault${item.id}`}
                                value={index}
                                checked
                              />
                            </div>
                          </td>
                          <td>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name={`flexRadioDefault${index}`}
                                id={`flexRadioDefaultChecked${item.id}`}
                                value={index}
                              />
                            </div>
                          </td>
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
                                  <a className="dropdown-item" href="#">
                                    <i className="fa-solid fa-pen-to-square"></i>{" "}
                                    แก้ไข
                                  </a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">
                                    <i className="fa-solid fa-trash"></i> ลบ
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>
                            )}
                      </tbody>
                      <tfoot className="text-center">
                        <tr>
                          <th>ลำดับ</th>
                          <th>ก๊าซเรือนกระจก</th>
                          <th>หน่วย</th>
                          {gases.map((gas) => (
                            <th>{gas}</th>
                          ))}
                          <th>เปิด</th>
                          <th>ปิด</th>
                          <th>เมนู</th>
                        </tr>
                      </tfoot>
                    </table>
                    <button className="btn btn-secondary hover:bg-primary">
                      บันทึก
                    </button>
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
      <Modal></Modal>
    </div>
  );
}
