import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <ul
      className="navbar-nav sidebar sidebar-dark accordion "
      style={{ backgroundColor: "#a18fe8" }}
      id="accordionSidebar"
    >
      <Link
        className="sidebar-brand d-flex align-items-center justify-content-center"
        to="/"
      >
        <div className="sidebar-brand-text mx-3" style={{ marginTop: "30px" }}>
          <img
            src="http://netzero.cmu.ac.th/web/wp-content/uploads/2023/05/logo-footer-300x88-1.png"
            alt=""
            style={{
              width: "100px",
              height: "50px",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          />
        </div>
      </Link>

      <hr className="sidebar-divider" />

      <li className={`nav-item ${activeMenu === "หน้าแรก" ? "active" : ""}`}>
        <Link
          className="nav-link"
          to="/"
          onClick={() => handleMenuClick("dashboard")}
        >
          <i className="fa-solid fa-house"></i>
          <span>หน้าแรก</span>
        </Link>
      </li>

      <hr className="sidebar-divider my-0" />

      <li className={`nav-item ${activeMenu === "คำอธิบาย" ? "active" : ""}`}>
        <Link
          className="nav-link"
          to="/about"
          onClick={() => handleMenuClick("about")}
        >
        <i className="fa-solid fa-circle-info"></i>
          <span>คำอธิบาย</span>
        </Link>
      </li>

     

      <hr className="sidebar-divider my-0" />

    <li className={`nav-item ${activeMenu === "activity" ? "active" : ""}`}>
      <Link
        className="nav-link"
        to="/activity"
        onClick={() => handleMenuClick("activity")}
      >
     <i className="fa-solid fa-cloud"></i>
        <span>เพิ่มกิจกรรมการปล่อยก๊าซเรือนกระจก</span>
      </Link>
    </li>
    
    <hr className="sidebar-divider my-0" />

<li className={`nav-item ${activeMenu === "activity" ? "active" : ""}`}>
  <Link
    className="nav-link"
    to="/user"
    onClick={() => handleMenuClick("user")}
  >

<i className="fa-solid fa-user-large"></i>
    <span>ผู้เข้าใช้งานระบบ</span>
  </Link>
</li>


<hr className="sidebar-divider my-0" />

<li className={`nav-item ${activeMenu === "activity" ? "active" : ""}`}>
  <Link
    className="nav-link"
    to="/campusManagement"
    onClick={() => handleMenuClick("campusManagement")}
  >

<i className="fa-solid fa-school"></i>
    <span>วิทยาเขต และหน่วยงาน</span>
  </Link>
</li>

<hr className="sidebar-divider my-0" />

<li className={`nav-item ${activeMenu === "activity" ? "active" : ""}`}>
  <Link
    className="nav-link"
    to="/scope"
    onClick={() => handleMenuClick("scope")}
  >

<i className="fa-solid fa-city"></i>
    <span>ค่าการปล่อยก๊าซเรือนกระจก(Emission Factor) </span>
  </Link>
</li>

<hr className="sidebar-divider my-0" />

<li
  className={`nav-item ${
    activeMenu === "components" ? "active" : ""
  } mt-3`}
>
  <Link
    className="nav-link collapsed"
    data-toggle="collapse"
    data-target="#collapseTwo"
    aria-expanded="true"
    aria-controls="collapseTwo"
    onClick={() => handleMenuClick("components")}
  >
  <i className="fa-solid fa-bars"></i>
    <span>การตั้งค่า</span>
  </Link>
  <div
    id="collapseTwo"
    className="collapse"
    aria-labelledby="headingTwo"
    data-parent="#accordionSidebar"
  >
    <div className="bg-white py-2 collapse-inner rounded">
      <h6 className="collapse-header">Custom Components:</h6>
      <Link className="collapse-item" >
      <i className="fa-solid fa-square-poll-vertical"></i> google map key api
      </Link>
      <Link className="collapse-item">
      <i className="fa-solid fa-file-pdf"></i> การแสดงผลของ หัวข้อ head activity
      </Link>
    </div>
  </div>
</li>


    

      <hr className="sidebar-divider d-none d-md-block" />
    </ul>
  );
}
