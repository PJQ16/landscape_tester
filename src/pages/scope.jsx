import React, {useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Pages from "../components/Pages";
import Modal from "../components/Modal";
import axios from "axios";
import config from "../config";
import ScrollTop from "../components/ScrollTop";
export default function Scope() {
  const [campus, setCampus] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(config.urlApi + `/scope`);
      setCampus(res.data);
    } catch (e) {
      console.log(e.message);
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
              <Pages namepage="ระบบจัดการค่า Emission Factor">
                <div className="table-responsive mt-3">
                  <table className="table table-striped table-bordered table-hover">
                    <thead className="text-center">
                      <tr>
                        <th>ลำดับ</th>
                        <th>ขอบเขต</th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {campus.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <Link
                              className="text-decoration-none text-dark"
                              to={`/scope/${item.id}`}
                            >
                              {item.name}
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="text-center">
                      <tr>
                        <th>ลำดับ</th>
                        <th>ขอบเขต</th>
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
