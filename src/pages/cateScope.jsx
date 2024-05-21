import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Pages from "../components/Pages";
import Modal from "../components/Modal";
import axios from "axios";
import config from "../config";
import Swal from "sweetalert2";
export default function CateScope() {
  const [cateScope, setCateScope] = useState([]);
  const [headName, setHeadName] = useState("");
  const [lci, setLci] = useState("");
  const [co2, setCo2] = useState(0);
  const [fossilCH4, setFossilCH4] = useState(0);
  const [ch4, setCh4] = useState(0);
  const [n2o, setN2o] = useState(0);
  const [sf6, setSf6] = useState(0);
  const [nf3, setNf3] = useState(0);
  const [hfcs, setHfcs] = useState(0);
  const [pfcs, setPfcs] = useState(0);
  const [gwpHFCs, setGwpHFCs] = useState(0);
  const [gwpPFCs, setGwpPFCs] = useState(0);
  const [kgCO2e, setKgCo2e] = useState(0);
  const [sources, setSources] = useState("");
  const [cateId, setCateId] = useState(0);

  const { head_id } = useParams();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(config.urlApi + `/categoryScope/${head_id}`);
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

  const handdleCreateData = async (e) => {
    try {
      e.preventDefault();
      if(cateId === 0){
        if (
          headName === "" ||
          lci === "" ||
          co2 === "" ||
          fossilCH4 === "" ||
          ch4 === "" ||
          n2o === "" ||
          sf6 === "" ||
          nf3 === "" ||
          hfcs === "" ||
          pfcs === "" ||
          gwpHFCs === "" ||
          gwpPFCs === "" ||
          kgCO2e === "" ||
          sources === ""
        ) {
          Swal.fire({
            icon: "warning",
            title: "คำเตือน",
            text: "กรุณากรอกข้อมูลให้ครบถ้วน",
          });
        } else {
          const payload = {
            name: headName,
            lci: lci,
            CO2: co2,
            Fossil_CH4: fossilCH4,
            CH4: ch4,
            N2O: n2o,
            SF6: sf6,
            NF3: nf3,
            HFCs: hfcs,
            PFCs: pfcs,
            GWP_HFCs: gwpHFCs,
            GWP_PFCs: gwpPFCs,
            kgCO2e: kgCO2e,
            sources: sources,
            head_id: head_id,
          };
          const res = await Swal.fire({
            icon: "question",
            title: "คำถาม",
            text: "คุณต้องการเพิ่มข้อมูลใช่หรือไม่",
            showCancelButton: true,
          });
          if (res.isConfirmed) {
            await Swal.fire({
              icon: "success",
              title: "สำเร็จ",
              text: "เพิ่มข้อมูลสำเร็จ",
              timer: 1500,
              timerProgressBar: true,
            });
            await axios.post(config.urlApi + `/scope/addCategoryScope`, payload);
            setHeadName("");
            setLci("");
            setCo2(0);
            setFossilCH4(0);
            setCh4(0);
            setN2o(0);
            setSf6(0);
            setNf3(0);
            setHfcs(0);
            setPfcs(0);
            setGwpHFCs(0);
            setGwpPFCs(0);
            setKgCo2e(0);
            setSources("");
            setCateId(0);
            fetchData();
            document.getElementById('btnClose').click();
          }
        }
      }else {
        if (
          headName === "" ||
          lci === "" ||
          co2 === "" ||
          fossilCH4 === "" ||
          ch4 === "" ||
          n2o === "" ||
          sf6 === "" ||
          nf3 === "" ||
          hfcs === "" ||
          pfcs === "" ||
          gwpHFCs === "" ||
          gwpPFCs === "" ||
          kgCO2e === "" ||
          sources === ""
        ) {
          Swal.fire({
            icon: "warning",
            title: "คำเตือน",
            text: "กรุณากรอกข้อมูลให้ครบถ้วน",
          });
        } else {
          const payload = {
            name: headName,
            lci: lci,
            CO2: co2,
            Fossil_CH4: fossilCH4,
            CH4: ch4,
            N2O: n2o,
            SF6: sf6,
            NF3: nf3,
            HFCs: hfcs,
            PFCs: pfcs,
            GWP_HFCs: gwpHFCs,
            GWP_PFCs: gwpPFCs,
            kgCO2e: kgCO2e,
            sources: sources,
            head_id: head_id,
          };
          const res = await Swal.fire({
            icon: "question",
            title: "คำถาม",
            text: "คุณต้องการแก้ไขข้อมูลใช่หรือไม่",
            showCancelButton: true,
          });
          if (res.isConfirmed) {
            await Swal.fire({
              icon: "success",
              title: "สำเร็จ",
              text: "แก้ไขข้อมูลสำเร็จ",
              timer: 1500,
              timerProgressBar: true,
            });
            await axios.put(config.urlApi + `/scope/updateCategoryScope/${cateId}`, payload);
            setHeadName("");
            setLci("");
            setCo2(0);
            setFossilCH4(0);
            setCh4(0);
            setN2o(0);
            setSf6(0);
            setNf3(0);
            setHfcs(0);
            setPfcs(0);
            setGwpHFCs(0);
            setGwpPFCs(0);
            setKgCo2e(0);
            setSources("");
            setCateId(0);
            fetchData();
            document.getElementById('btnClose').click();
          }
        }

      }
      
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "เกิดข้อผิดพลาด",
      });
    }
  };
  const newCreate = () => {
    setHeadName("");
    setLci("");
    setCo2(0);
    setFossilCH4(0);
    setCh4(0);
    setN2o(0);
    setSf6(0);
    setNf3(0);
    setHfcs(0);
    setPfcs(0);
    setGwpHFCs(0);
    setGwpPFCs(0);
    setKgCo2e(0);
    setSources("");
    setCateId(0);
  };

  const handdleEdit = (item) => {
    setHeadName(item.name);
    setLci(item.lci);
    setCo2(item.CO2);
    setFossilCH4(item.Fossil_CH4);
    setCh4(item.CH4);
    setN2o(item.N2O);
    setSf6(item.SF6);
    setNf3(item.NF3);
    setHfcs(item.HFCs);
    setPfcs(item.PFCs);
    setGwpHFCs(item.GWP_HFCs);
    setGwpPFCs(item.GWP_PFCs);
    setKgCo2e(item.kgCO2e);
    setSources(item.sources);
    setCateId(item.id);

  };

  const handlerDelete = async (Id) => {
    try {
      const res = await Swal.fire({
        icon: 'question',
        title: 'Confirm',
        text: 'ต้องการลบข้อมูลนี้ใช่หรือไม่',
        showCancelButton: true,
        input: 'text',
        inputPlaceholder: 'พิมพ์ "YES" เพื่อยืนยัน',
        inputValidator: (value) => {
          if (!value || value.toLowerCase() !== 'yes') {
            return 'โปรดพิมพ์คำว่า "YES" เพื่อยืนยันการลบ.';
          }
        }
      });
  
      if (res.isConfirmed) {
        await Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'ลบข้อมูลสำเร็จ',
          timer: 800,
          timerProgressBar: true
        });
      
        await axios.delete(config.urlApi + `/catescopeDelete/${Id}`)
     
      }
      fetchData();
     
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "เกิดข้อผิดพลาด",
      });
    }
  }
  
  return (
    <div>
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <Navbar />
          <div id="content">
            <div className="container-fluid">
              <Pages namepage={`ก๊าซเรือนกระจก`}>
                <div className="table-responsive mt-3">
                  <button
                    className="btn btn-primary mb-2"
                    onClick={newCreate}
                    data-toggle="modal"
                    data-target="#modalAddEf"
                    id="btnClose"
                  >
                    <i className="fa-solid fa-circle-plus"></i> เพิ่มค่าEF
                  </button>
                  <table className="table table-striped table-bordered table-hover">
                    <thead className="text-center">
                      <tr>
                        <th>ลำดับ</th>
                        <th>ก๊าซเรือนกระจก</th>
                        <th>หน่วย</th>
                        {gases.map((gas, index) => (
                          <th key={index}>{gas}</th>
                        ))}
                        <th>เมนู</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cateScope.map((item, index) => (
                        <tr className="text-center" key={index}>
                          <td>{index + 1}</td>
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
                            <div className="btn-group">
                              <button
                                type="button"
                                className="btn btn-secondary dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              ></button>
                              <ul className="dropdown-menu">
                                <li>
                                  <a
                                    className="dropdown-item"
                                    href="#"
                                    onClick={(e) => handdleEdit(item)}
                                    data-toggle="modal"
                                    data-target="#modalAddEf"
                                  >
                                    <i className="fa-solid fa-pen-to-square"></i>{" "}
                                    แก้ไข
                                  </a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#" onClick={(e) => handlerDelete(item.id)}>
                                    <i className="fa-solid fa-trash"></i> ลบ
                                  </a>
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
                        <th>ก๊าซเรือนกระจก</th>
                        <th>หน่วย</th>
                        {gases.map((gas, index) => (
                          <th key={index}>{gas}</th>
                        ))}
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

      <Link className="scroll-to-top rounded" to="#page-top">
        <i className="fas fa-angle-up"></i>
      </Link>
      <Modal id="modalAddEf" title="เพิ่มค่า Emisson Factors">
        <form onSubmit={handdleCreateData}>
          <div className="row">
            <div className="col-md-6">
              <label>ก๊าซเรือนกระจก</label>
              <input
                type="text"
                onChange={(e) => setHeadName(e.target.value)}
                value={headName}
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label>หน่วย</label>
              <input
                type="text"
                onChange={(e) => setLci(e.target.value)}
                value={lci}
                className="form-control"
              />
            </div>

            <div className="col-md-4">
              <label>
                CO<sub>2</sub>
              </label>
              <input
                type="number"
                onChange={(e) => setCo2(e.target.value)}
                value={co2}
                className="form-control"
              />
            </div>

            <div className="col-md-4">
              <label>
                Fossil CH<sub>4</sub>
              </label>
              <input
                type="number"
                onChange={(e) => setFossilCH4(e.target.value)}
                value={fossilCH4}
                className="form-control"
              />
            </div>

            <div className="col-md-4">
              <label>
                CH<sub>4</sub>
              </label>
              <input
                type="number"
                onChange={(e) => setCh4(e.target.value)}
                value={ch4}
                className="form-control"
              />
            </div>

            <div className="col-md-4">
              <label>
                N<sub>2</sub>O
              </label>
              <input
                type="number"
                onChange={(e) => setN2o(e.target.value)}
                value={n2o}
                className="form-control"
              />
            </div>

            <div className="col-md-4">
              <label>
                SF<sub>6</sub>
              </label>
              <input
                type="number"
                onChange={(e) => setSf6(e.target.value)}
                value={sf6}
                className="form-control"
              />
            </div>

            <div className="col-md-4">
              <label>
                NF<sub>3</sub>
              </label>
              <input
                type="number"
                onChange={(e) => setNf3(e.target.value)}
                value={nf3}
                className="form-control"
              />
            </div>

            <div className="col-md-4">
              <label>
                HFC<sub>s</sub>
              </label>
              <input
                type="number"
                onChange={(e) => setHfcs(e.target.value)}
                value={hfcs}
                className="form-control"
              />
            </div>

            <div className="col-md-4">
              <label>
                PFC<sub>s</sub>
              </label>
              <input
                type="number"
                onChange={(e) => setPfcs(e.target.value)}
                value={pfcs}
                className="form-control"
              />
            </div>

            <div className="col-md-4">
              <label>
                GWP HFC<sub>s</sub>
              </label>
              <input
                type="number"
                onChange={(e) => setGwpHFCs(e.target.value)}
                value={gwpHFCs}
                className="form-control"
              />
            </div>

            <div className="col-md-4">
              <label>
                GWP PFC<sub>s</sub>
              </label>
              <input
                type="number"
                onChange={(e) => setGwpPFCs(e.target.value)}
                value={gwpPFCs}
                className="form-control"
              />
            </div>

            <div className="col-md-4">
              <label>
                kgCO<sub>2</sub>e
              </label>
              <input
                type="number"
                onChange={(e) => setKgCo2e(e.target.value)}
                value={kgCO2e}
                className="form-control"
              />
            </div>

            <div className="col-md-4">
              <label>แหล่งอ้างอิง</label>
              <input
                type="text"
                onChange={(e) => setSources(e.target.value)}
                value={sources}
                className="form-control"
              />
            </div>
          </div>
          {cateId === 0 ?  <button className="btn btn-primary my-2" onClick={handdleCreateData}>
            <i className="fa-solid fa-circle-plus"></i>เพิ่มค่าEF
          </button> :  <button className="btn btn-primary my-2" onClick={handdleCreateData}>
          <i className="fa-solid fa-pen-to-square"></i>แก้ไขข้อมูล
          </button> }
         
        </form>
      </Modal>
    </div>
  );
}
