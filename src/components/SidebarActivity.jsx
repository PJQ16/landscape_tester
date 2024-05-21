import React, {useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function SidebarActivity() {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const {years,id} = useParams();

  const navigate = useNavigate();


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
        navigate(`/CFO/${years}`);
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
