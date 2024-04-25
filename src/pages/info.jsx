import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Map from "../components/Map";
import SidebarActivity from "../components/SidebarActivity";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../config";

export default function Info() {
  const {id,years,employee_amount,building_area} = useParams();
  const [info,setInfo] = useState([]);
  useEffect(()=>{
    fetchData();
  },[])

  const fetchData = async() =>{
    try{
const res = await axios.get(config.urlApi + `/activityperiod/info/${id}`);
    setInfo(res.data);
    }catch(e){
        console.log(e.message);
    }
  }

  const getActivityStatus = (status) => {
    switch (status) {
      case "0":
        return (
          <i
            className="fa-solid fa-circle-dot"
            style={{ color: "#979494" }}
          ></i>
        );
      case "1":
        return (
          <i
            className="fa-solid fa-circle-dot"
            style={{ color: "#D9C760" }}
          ></i>
        );
      case "2":
        return (
          <i
            className="fa-solid fa-circle-dot"
            style={{ color: "#8ED960" }}
          ></i>
        );
      case "3":
        return (
          <i
            className="fa-solid fa-circle-dot"
            style={{ color: "#D96460" }}
          ></i>
        );
      default:
        return (
          <i
            className="fa-solid fa-circle-dot"
            style={{ color: "#ffffff" }}
          ></i>
        );
    }
  };
  const backgroundImageStyle = {
    backgroundImage: 'url("/img/cloud.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",

    // Add other CSS properties as needed
  };
  return (
    <div id="page-top">
      <div id="wrapper">
        <SidebarActivity />
        <div
          id="content-wrapper"
          className="d-flex flex-column"
          style={backgroundImageStyle}
        >
          <Navbar />
        {info.map((infos,index)=> (
            infos.activityperiods.map((activityperiod,index)=> (
              
          <div  id="content">
            <div className="container-fluid">
              <span className="h1 text-dark">
              {infos.fac_name} {activityperiod.years + 543}
              </span>
              <p className="m-2">คำอธิบายหน้า</p>
            
             
              <div className="card rounded">
                <div className="card-title bg-secondary">
                  <span className="ms-3 h4  text-white">
                    <i className="fa-solid fa-circle-info p-3"></i>ข้อมูลหน่วยงาน
                  </span>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-md-6 py-2">วิทยาเขต :</div>
                        <div className="col-md-6 py-2">
                        {infos.campus.campus_name}
                        </div>

                        <div className="col-md-6 py-2">หน่วยงาน :</div>
                        <div className="col-md-6 py-2">
                        {infos.fac_name}
                        </div>

                        <div className="col-md-12">
                          <div className="card ">
                            <div className="card-title p-2 bg-dark text-white rounded">
                              <i className="fa-solid fa-map-location-dot"></i>{" "}
                              แผนที่
                            </div>
                            <div className="card-body">
                              <Map />
                            </div>
                          </div>
                        </div>

                        <form>
                         
                          <div className="row  ps-3 mt-3">
                          <div className="col-md-6">
                            จำนวนพนักงาน :
                          </div>
                          <div className="col-md-5">
                           <input type="text" value={activityperiod.employee_amount} readOnly  className="form-control"/>
                          </div>

                          </div>


                          <div className="row  ps-3 mt-3">
                          <div className="col-md-6">
                            พื้นที่ใช้สอย :
                          </div>
                          <div className="col-md-5">
                           <input type="text"  value={activityperiod.building_area}  className="form-control" readOnly />
                          </div>

                          </div>
                         
                        
                          <div className="row  ps-3 mt-3">
                          <div className="col-md-6">
                           latitude :
                          </div>
                          <div className="col-md-5">
                           <input type="text" className="form-control" value={infos.latitude} readOnly />
                          </div>

                          </div>
                        
                     
                          <div className="row  ps-3 mt-3">
                          <div className="col-md-6">
                           longitude :
                          </div>
                          <div className="col-md-5">
                           <input type="text" className="form-control" 
                            value={infos.longitude} readOnly />
                          
                          </div>

                          </div>
                        

                          <div className="row  ps-3 mt-3">
                          <div className="col-md-6">
                          รูปแบบการคำนวณ :
                          </div>
                          <div className="col-md-5">
                          องค์การบริหารจัดการก๊าซเรือนกระจก (องค์การมหาชน)
                          </div>

                          </div>
                        

                          <div className="row  ps-3 mt-3">
                          <div className="col-md-6">
                          ปีฐาน :
                          </div>
                          <div className="col-md-5">
                          2565
                          </div>
                          </div>
                        </form>
                      </div>
                    </div>

                    <div className="col-md-6 bg-light">
                      <div className="card">
                        <div className="card-title p-2 bg-dark rounded text-white">
                        <i class="fa-solid fa-database"></i>{" "}
                          <span className="text-white"> รายละเอียดองค์กร</span>
                        </div>
                        <div className="card-body">
                         <p>พื้นที่: {parseFloat(activityperiod.building_area).toFixed(2)} ตารางเมตร</p>
                         <p>จำนวนพนักงาน:  {parseInt(activityperiod.employee_amount)} ต่อคน</p>
                         <p>ที่อยู่:  {infos.address}</p>
                         <p>สถานะ:  {getActivityStatus(activityperiod.status_activity)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          ))
          ))}
            
          <Footer />
       
        </div>
      </div>

      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up"></i>
      </a>
    </div>
  );
}
