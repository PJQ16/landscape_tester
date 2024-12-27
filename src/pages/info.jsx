import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SidebarActivity from "../components/SidebarActivity";
import Tab from "../components/Tab";
import TabActivityInfo from "./Tab/TabActivityInfo";
import TabActivityLocation from "./Tab/TabActivityLocation";
import TabActivityOrganization from "./Tab/TabActivityOrganization";
import TabActivity from "./Tab/TabActivity";
import TabActivitySummary from "./Tab/TabActivitySummary";
import TabActivityReport from "./Tab/TabActivityReport";
import ScrollTop from "../components/ScrollTop";


export default function Info() {
  return (
    <div id="page-top">
      <div id="wrapper">
        <SidebarActivity />
        <div
          id="content-wrapper"
          className="d-flex flex-column"
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

     <ScrollTop/>
    </div>
  );
}
