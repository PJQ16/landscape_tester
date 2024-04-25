import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import { Link } from "react-router-dom";
import Pages from "../components/Pages";
import axios from "axios";
import config from "../config";
import { UserContext } from "../components/MyContext";
import Swal from "sweetalert2";


export default function Activity() {
  const [periods, setPeriods] = useState([]);
  const [selectYears, setSelectYears] = useState("");
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const maxYearsDifference = 3;

  
  const selectyears = Array.from({ length: maxYearsDifference + 1 }, (_, index) => currentYear - index);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(config.urlApi + "/activity/showPeriod");
      setPeriods(res.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  

  const handlerAddPeriod = async (event) => {
    try {
      event.preventDefault();
      const payload = {
        years: selectYears,
      }
  
      if (selectYears === "") {
        Swal.fire({
          icon: "warning",
          title: "warning",
          text: "กรุณาเลือกปีด้วย",
        });
      } else {
        Swal.fire({
          icon: "question",
          title: "Confirm?",
          text: "แน่ใจหรือไม่?",
          showConfirmButton: true,
          showCancelButton: true,
        }).then(async (res) => {
          if (res.isConfirmed) {
            Swal.fire({
              icon: "success",
              title: "Successfully",
              text: "บันทึกสำเร็จ",
              timer: 1500,
            });
  
            const formData = new URLSearchParams(payload);
  
            await axios.post(
              config.urlApi + '/activity/AddPeriod',
              formData,
              {
                headers: {
                  'content-type': 'application/x-www-form-urlencoded',
                },
              }
            );
            fetchData();
          }
        });
      }
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
              <Pages namepage="เพิ่มกิจกรรมการปล่อยก๊าซเรือนกระจก">
                <div className="container">
                <div className="col-md-12 bg-light">
                      <div className="card shadow">
                        <div className="card-title p-2 bg-dark rounded text-white">
                          <i className="fa-solid fa-circle-plus"></i>{" "}
                          <span className="text-white">เพิ่มปีกิจกรรมการปล่อยก๊าซเรือนกระจก</span>
                        </div>
                        <div className="card-body">
                          <button
                            className="btn mb-2 text-white"
                            style={{ backgroundColor: "#a18fe8" }}
                            data-toggle="modal"
                            data-target="#addPeriod"
                          >
                            <i className="fa-solid fa-plus"></i> เพิ่มปี
                          </button>
                          <ul className="list-group">
                          {periods.map((item) => (
                        item.fac_id === userData.facultyID ? (
                          <Link
                            to={`/CFO/${item.years + 543}`}
                            key={item.years}
                          >
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                              <span className="text-decoration-none">{item.years + 543}</span>
                              <span
                                className="badge rounded-pill"
                                style={{ backgroundColor: "#a18fe8" }}
                              >
                                14
                              </span>
                            </li>
                          </Link>
                        ) : null
                      ))}
                                                </ul>
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
      <Modal id="addPeriod" title="เพิ่มปีกิจกรรม">
        <form onSubmit={handlerAddPeriod}>
          <label>เลือกปี</label>
          
        <select
          onChange={(e) => setSelectYears(e.target.value)}
          value={selectYears}
          className="form-control"
        >
          <option value="">เลือกปี</option>
          {selectyears.map((years) => {
            const hasData = periods.some((item) => (item.years) === years && item.fac_id === userData.facultyID);
            return hasData ? null : (
              <option key={years} value={years}>
                {years + 543}
              </option>
            );
          })}
        </select>

        {selectYears === "" ? (
  <button
    className="btn mt-2 text-white"
    style={{ backgroundColor: "#a18fe8" }}
    onClick={handlerAddPeriod}
    disabled
  >
    เพิ่มข้อมูล
  </button>
) : (
  <button
    className="btn mt-2 text-white"
    style={{ backgroundColor: "#a18fe8" }}
    onClick={handlerAddPeriod}
  >
    เพิ่มข้อมูล
  </button>
)}
        </form>
      </Modal>
    </div>
  );
}
