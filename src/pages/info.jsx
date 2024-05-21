import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Map from "../components/Map";
import SidebarActivity from "../components/SidebarActivity";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../config";
import Tab from "../components/Tab";
import TabActivityInfo from "./Tab/TabActivityInfo";
import TabActivityLocation from "./Tab/TabActivityLocation";
import TabActivityOrganization from "./Tab/TabActivityOrganization";
import TabActivity from "./Tab/TabActivity";
import TabActivitySummary from "./Tab/TabActivitySummary";
import TabActivityReport from "./Tab/TabActivityReport";
import Swal from "sweetalert2";
import { UserContext } from "../components/MyContext";


export default function Info() {
  const {id,years,employee_amount,building_area} = useParams();
  const [info,setInfo] = useState([]);
  const {userData} = useContext(UserContext);
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

  const backgroundImageStyle = {
    backgroundImage: 'url("/img/cloud.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
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
       <div className="p-3">
          <Tab>
            <div label="ข้อมูลทั่วไป">
           <TabActivityInfo/>
            </div>
            <div label="แผนภาพองค์กร">
            <TabActivityLocation/>
            </div>
            <div label="โครงสร้างองค์กร">
            <TabActivityOrganization/>
            </div>
            <div label="กิจกรรมการปล่อยก๊าซเรือนกระจก" >
            <TabActivity />
            </div>
            <div label="สรุปผลการคำนวณ">
            <TabActivitySummary/>
            </div>
            <div label="รายงาน">
            <TabActivityReport/>
            </div>
          </Tab>
          </div>

          <Footer />
       
        </div>
      </div>

      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up"></i>
      </a>
    </div>
  );
}
