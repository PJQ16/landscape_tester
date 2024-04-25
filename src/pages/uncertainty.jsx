import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../components/MyContext";
import SidebarActivity from "../components/SidebarActivity";

export default function Uncertainty() {
  const {userData} = useContext(UserContext);
  const {years} = useParams();
  const mockupdata = [
    { type: "Scope1", list: "Stationary Combustion Biodiesel", unit: "L" },
    { type: "Scope2", list: "Electricity Electricity from PEA", unit: "kWh" },
    {
      type: "Scope3",
      list: "Purchased Goods & Services กระดาษ A4 (80 gram): ขาวดำ",
      unit: "kg",
    },
    { type: "รายงานแยก", list: "อื่นๆ", unit: "kg" },
    { type: "ดูดกลับ", list: "ภาคป่าไม้", unit: "kg" },
  ];

  const mockupdata2 = [
    { score: "1-6", detail: "มีความไม่แน่นอนสูง คุณภาพของข้อมูลไม่มีคุณภาพ" },
    { score: "7-12", detail: "มีความไม่แน่นอนเล็กน้อย คุณภาพของข้อมูลปานกลาง" },
    {
      score: "13-18",
      detail: "มีความไม่แน่นอนต่ำ คุณภาพของข้อมูลดีค่อนข้างดี",
    },
    { score: "19-24", detail: "มีความไม่แน่นอนต่ำ คุณภาพของข้อมูลดีเยี่ยม" },
  ];

  const [tableData, setTableData] = useState(
    mockupdata.map(() => ({
      scoreA: "",
      scoreB: "",
      qualityScore: 0,
      dataQuality: "",
    }))
  );

  const handleSelectChange = (index, column, value) => {
    const newData = [...tableData];
    newData[index][column] = value;
  
    // Calculate (A x B) and update qualityScore
    const scoreA = parseInt(newData[index].scoreA, 10) || 0;
    const scoreB = parseInt(newData[index].scoreB, 10) || 0;
    newData[index].qualityScore = scoreA * scoreB;
  
    // Update dataQuality based on your criteria
    newData[index].dataQuality = calculateDataQuality(newData[index].qualityScore);
  
    // You can add additional logic for other columns if needed
  
    setTableData(newData);
  };
  
  const calculateDataQuality = (qualityScore) => {
    // Replace this with your actual criteria for calculating dataQuality
    if (qualityScore > 10) {
      return "High";
    } else {
      return "Low";
    }
  };

  const backgroundImageStyle = {
    backgroundImage: 'url("/img/cloud.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    
    // Add other CSS properties as needed
  };


  return (
    <div id="page-top">
      <div id="wrapper">
        <SidebarActivity />
        <div id="content-wrapper" className="d-flex flex-column" style={backgroundImageStyle}>
          <Navbar />
          <div id="content">
            <div className="container-fluid">
            <span className="h1 text-dark">{userData.campusName} {userData.facultyName}{years}</span>
              <p className="h3">
                {" "}
                การประเมินความไม่แน่นอน ( Uncertainty )
              </p>
              <p className="m-2">
                ความไม่แน่นอนที่เกิดขึ้นกับข้อมูล
                และค่าการปล่อยก๊าซเรือนกระจกที่เลือกใช้
                สามารถตรวจสอบคุณภาพของข้อมูลได้ โดยการกำหนดคะแนนไว้ตามตาราง
              </p>

              <div className="row">
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header p-1">
                      <i className="fa-solid fa-table"></i>{" "}
                      ตารางแสดงระดับคะแนนอ้างอิงของคุณภาพข้อมูลที่ใช้ในการศึกษา
                      การประเมินและการจัดการความไม่แน่น
                    </div>
                    <div className="card-body">
                      <table className="table table-bordered table-striped table-responsive">
                        <thead className="text-center">
                          <tr>
                            <th>ประเภทของกิจกรรม</th>
                            <th>รายการ</th>
                            <th>หน่วย</th>
                            <th>คะแนนการเก็บข้อมูล (A)</th>
                            <th>ค่าEF (B) ผลการประเมิน </th>
                            <th>(A x B) ระดับคุณภาพ </th>
                            <th>คุณภาพข้อมูล</th>
                          </tr>
                        </thead>
                        <tbody className="text-center">
                          {mockupdata.map((item, index) => (
                            <tr key={index}>
                              <td>{item.type}</td>
                              <td>{item.list}</td>
                              <td>{item.unit}</td>
                              <td>
                                <select
                                  className="form-control"
                                  value={item.scoreA}
                                  onChange={(e) =>
                                    handleSelectChange(
                                      index,
                                      "scoreA",
                                      e.target.value
                                    )
                                  }
                                >
                                  <option value="">เลือกคะแนน</option>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                  <option value="6">6</option>
                                </select>
                              </td>
                              <td>
                                <select
                                  className="form-control"
                                  value={item.scoreB}
                                  onChange={(e) =>
                                    handleSelectChange(
                                      index,
                                      "scoreB",
                                      e.target.value
                                    )
                                  }
                                >
                                  <option value="">เลือกคะแนน</option>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                </select>
                              </td>
                              <td>{item.qualityScore}</td>
                              <td>{item.dataQuality}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header">
                      ตารางแสดงระดับคะแนนอ้างอิงของคุณภาพข้อมูลที่ใช้ในการศึกษา
                      การประเมินและการจัดการความไม่แน่น
                    </div>
                    <div className="card-body">
                      <table className="table table-bordered table-striped table-responsive">
                        <thead className="text-center">
                          <tr>
                            <th>รายการ</th>
                            <th colSpan={4}>ระดับคุณภาพ</th>
                          </tr>
                        </thead>
                        <tbody className="text-center">
                          <tr>
                            <td rowSpan={2}>ข้อมูลกิจกรรม</td>
                            <td>X = 6 Points</td>
                            <td colSpan={2}>Y = 3 Points</td>
                            <td>Z = 1 Points</td>
                          </tr>
                          <tr>
                            <td>เก็บข้อมูลอย่างต่อเนื่อง</td>
                            <td colSpan={2}>เก็บข้อมูลจากมิเตอร์และใบเสร็จ</td>
                            <td>เก็บข้อมูลจากการประมาณค่า</td>
                          </tr>
                          <tr>
                            <td rowSpan={2}>Emission Factors</td>
                            <td>C = 4 Points</td>
                            <td>D = 3 Points</td>
                            <td>E = 2 Points</td>
                            <td>F = 1 Points</td>
                          </tr>
                          <tr>
                            <td>EF จากการวัดที่มีคุณภาพ</td>
                            <td>EF จากผู้ผลิต หรือ EF ระดับประเทศ </td>
                            <td>EF ระดับภูมิภาค </td>
                            <td>EF ระดับสากล</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="card mt-5">
                    <div className="card-header">
                      ตารางกำหนดระดับคะแนนและเกณฑ์ที่ใช้ประเมินความไม่แน่นอน
                    </div>
                    <div className="card-body">
                      <table className="table table-bordered table-striped table-responsive">
                        <thead className="text-center">
                          <tr>
                            <th>ระดับ</th>
                            <th>ระดับคะแนนโดยรวมข้อมูล</th>
                            <th>คำอธิบาย</th>
                          </tr>
                        </thead>
                        <tbody className="text-center">
                          {mockupdata2.map((scores, i) => (
                            <tr key={i}>
                              <td>{i + 1}</td>
                              <td>{scores.score}</td>
                              <td>{scores.detail}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex flex-row-reverse">
                <Link to="/summary">
                  <button className="btn btn-primary mt-3">ถัดไป</button>
                </Link>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>

      <a className="scroll-to-top rounded" href="#page-top">
  <i className="fas fa-angle-up"></i>
</a>
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
