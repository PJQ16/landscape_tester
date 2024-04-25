import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from './MyContext';
import config from '../config';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function SidebarActivity() {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const {userData} = useContext(UserContext);
  const {id,fac_id,years,employee_amount,building_area} = useParams();
  const navigate = useNavigate();
  const [activityData,setActivityData]= useState(null);

  useEffect(()=>{
      axios.get(config.urlApi + `/activity/showPeriod/${fac_id}/${years}/${employee_amount}/${building_area}`).then(res=>{
       
          if (res.data.fac_id  === userData.facultyID) {
              setActivityData(res.data)
            }else{
              navigate('/info');
            }
      }).catch((error)=>{
          console.error('Error Fetching activity Detail',error)
      });
  },[fac_id,years]);


  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const handleLeaveActivity = () => {
    Swal.fire(
      {
        icon:'question',
        title:'คำถาม?',
        text:'ต้องการออกจากกิจกรรมนี้ใช่หรือไม่?',
        showCancelButton:true
      }
    ).then(res =>{
      if(res.isConfirmed){
        navigate('/activity');
      }
    })
  }




  return (
    <ul className="navbar-nav sidebar sidebar-dark accordion " style={{ backgroundColor: '#a18fe8' }} id="accordionSidebar">

      <Link className="sidebar-brand d-flex align-items-center justify-content-center" >
        <div className="sidebar-brand-text mx-3" style={{marginTop:'30px'}}>
          <img src="http://netzero.cmu.ac.th/web/wp-content/uploads/2023/05/logo-2-scaled-1.png" alt="" style={{ width: '100px', height: '50px', marginTop: '20px', marginBottom: '20px' }} />
        </div>
      </Link>

      <hr className="sidebar-divider my-0" />

<li
  className={`nav-item ${
    activeMenu === "components1" ? "active" : ""
  } mt-3`}
>
  <Link
    className="nav-link collapsed"
    data-toggle="collapse"
    data-target="#collapseOne"
    aria-expanded="true"
    aria-controls="collapseOne"
    onClick={() => handleMenuClick("components1")}
  >
  <i className="fa-solid fa-bars"></i>
    <span>ข้อมูลทั่วไป</span>
  </Link>
  <div
    id="collapseOne"
    className="collapse"
    aria-labelledby="headingTwo"
    data-parent="#accordionSidebar"
  >
    <div className="bg-white py-2 collapse-inner rounded">
      <h6 className="collapse-header">Custom Components:</h6>
      <Link className="collapse-item" to={`/activityperiod/info/${id}`}>
        ข้อมูลทั่วไป
      </Link>
      <Link className="collapse-item" to={`/location/${userData.facultyID}/${years}/${employee_amount}/${building_area}`}>
        ตำแหน่งที่ตั้งองค์กร
      </Link>
      <Link className="collapse-item" to={`/structure/${userData.facultyID}/${years}/${employee_amount}/${building_area}`}>
        โครงสร้างองค์กร
      </Link>
    </div>
  </div>
</li>
      
      <hr className="sidebar-divider" />

      
      <li className={`nav-item ${activeMenu === 'activityperiod' ? 'active' : ''}`}>
        <Link className="nav-link"  to={`/activityperiod/${userData.facultyID}/${years}/${employee_amount}/${building_area}`} onClick={() => handleMenuClick('activityperiod')}>
        <i className="fa-solid fa-smog"></i>
          <span>กิจกรรมปล่อยก๊าซเรือนกระจก</span>
        </Link>
      </li> 

      <hr className="sidebar-divider" />


      <li className={`nav-item ${activeMenu === 'uncertainty' ? 'active' : ''}`}>
        <Link className="nav-link" to={`/uncertainty/${userData.facultyID}/${years}/${employee_amount}/${building_area}`} onClick={() => handleMenuClick('uncertainty')}>
        <i className="fa-solid fa-list-check"></i>
          <span>การประเมินความไม่แน่นอน</span>
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
          <span>สรุปผล</span>
        </Link>
        <div
          id="collapseTwo"
          className="collapse"
          aria-labelledby="headingTwo"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Custom Components:</h6>
            <Link className="collapse-item" to={`/summary/${userData.facultyID}/${years}/${employee_amount}/${building_area}`} >
            <i className="fa-solid fa-square-poll-vertical"></i> สรุปผลการคำนวณ
            </Link>
            <Link className="collapse-item" to={`/report/${userData.facultyID}/${years}/${employee_amount}/${building_area}`}>
            <i className="fa-solid fa-file-pdf"></i> ออกรายงาน PDF / Excel
            </Link>
          </div>
        </div>
      </li>


      <hr className="sidebar-divider" />

            <li className={`nav-item ${activeMenu === 'activity' ? 'active' : ''}`}>
            <Link className="nav-link" onClick={handleLeaveActivity}>
            <i className="fa-solid fa-circle-chevron-left"></i>
                <span>ย้อนกลับ</span>
            </Link>
            </li>

      <hr className="sidebar-divider d-none d-md-block" />

    </ul>
  );
}
