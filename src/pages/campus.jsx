import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Pages from "../components/Pages";
import Modal from "../components/Modal";
import axios from "axios";
import config from "../config";
export default function Campus() {
  const [campus, setCampus] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(config.urlApi + `/place/showCampus`);
      setCampus(res.data);
    } catch (e) {
      console.log(e.message);
    }
  };

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
              <Pages namepage="ข้อมูลวิทยาเขต">
                <div className="table-responsive mt-3">
                  <table className="table table-striped table-bordered table-hover">
                    <thead className="text-center">
                      <tr>
                        <th>ลำดับ</th>
                        <th>ชื่อวิทยาเขต</th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {campus.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <Link
                              className="text-decoration-none text-dark"
                              to={`/faculty/${item.id}`}
                            >
                              {item.campus_name}
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="text-center">
                      <tr>
                        <th>ลำดับ</th>
                        <th>ชื่อวิทยาเขต</th>
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

      <Link className="scroll-to-top rounded" to="#page-top">
        <i className="fas fa-angle-up"></i>
      </Link>
      <Modal></Modal>
    </div>
  );
}
