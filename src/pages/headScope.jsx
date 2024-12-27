import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Pages from "../components/Pages";
import Modal from "../components/Modal";
import axios from "axios";
import config from "../config";
import ScrollTop from "../components/ScrollTop";
export default function HeadScope() {
  const [campus, setCampus] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    fetchData();
  });

  const fetchData = async () => {
    try {
      const res = await axios.get(config.urlApi + `/headscope/${id}`);
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
              <Pages
                namepage={`รูปแบบการเก็บข้อมูล ${
                  id === "4"
                    ? "รายงานแยก"
                    : id === "5"
                    ? "ภาคดูดกลับ"
                    : `ขอบเขตที่ ${id}`
                }`}
              >
                <div className="table-responsive mt-3">
                  <table className="table table-striped table-bordered table-hover">
                    <thead className="text-center">
                      <tr>
                        <th>ลำดับ</th>
                        <th>รูปแบบการเก็บข้อมูล</th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {campus.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <Link
                              className="text-decoration-none text-dark"
                              to={`/scope/${id}/${item.id}`}
                            >
                              {item.head_name}
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="text-center">
                      <tr>
                        <th>ลำดับ</th>
                        <th>รูปแบบการเก็บข้อมูล</th>
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
