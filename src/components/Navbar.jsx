import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios';
import config from '../config';
import { UserContext } from './MyContext';

export default function Navbar() {
    const { userData, setUserData } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(()=>{
        fetchData();
    },[])
    

    const fetchData = async () => {
        try {
          const response = await axios.get(config.urlApi + '/users/showUserApi', config.headers());
      
          if (response.data.message === 'success') {
            setUserData({
              firstname: response.data.result.fname,
              surname: response.data.result.sname,
              email:response.data.result.email,
              roleName: response.data.result.role.role_name,
              facultyName: response.data.result.faculty.fac_name,
              campusName: response.data.result.faculty.campus.campus_name,
              facultyID : response.data.result.faculty.id,
              campusID : response.data.result.faculty.campus_id,
              latitude: response.data.result.faculty.latitude,
              longitude: response.data.result.faculty.campus_id
            });
          }
        } catch (error) {
          navigate('/login');
        }
      };
      

    const handlerSignOut = (event) => {
        try {
          event.preventDefault();
          
          Swal.fire({
            icon: 'question',
            title: 'ออกจากระบบ',
            text: 'ต้องการออกจากระบบหรือไม่?',
            showConfirmButton: true,
            showCancelButton: true
          }).then(res => {
            if (res.isConfirmed) {
              Swal.fire({
                icon: 'success',
                title: 'ออกจากระบบ',
                text: 'ออกจากระบบเรียบร้อย',
                showConfirmButton: false,
                showCancelButton: false,
                timer: 2000,
                timerProgressBar: true,
              })
              localStorage.removeItem(config.token_name);
              navigate('/login');
            }
          })
        } catch (e) {
          console.log(e.message);
        }
      }
      

  return (
    <div>
                <nav className="navbar navbar-expand topbar mb-4 static-top">
                    <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                        <i className="fa fa-bars"></i>
                    </button>
                    <form
                        className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                        <div className="input-group">
                            <input type="text" className="form-control bg-light border-2 small" placeholder="Search for..."
                                aria-label="Search" aria-describedby="basic-addon2" />
                            <div className="input-group-append">
                                <button className="btn" type="button" style={{backgroundColor:'#a18fe8'}}>
                                    <i className="fas fa-search fa-sm" style={{color:"#ffffff"}}></i>
                                </button>
                            </div>
                        </div>
                    </form>


                    <ul className="navbar-nav ml-auto">

                        <li className="nav-item dropdown no-arrow d-sm-none">
                            <Link className="nav-link dropdown-toggle" to="/" id="searchDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-search fa-fw"></i>
                            </Link>
                        
                            <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                                aria-labelledby="searchDropdown">
                                <form className="form-inline mr-auto w-100 navbar-search">
                                    <div className="input-group">
                                        <input type="text" className="form-control bg-light border-0 small"
                                            placeholder="Search for..." aria-label="Search"
                                            aria-describedby="basic-addon2"/>
                                        <div className="input-group-append">
                                            <button className="btn btn-primary" type="button">
                                                <i className="fas fa-search fa-sm"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </li>

                    
                        <li className="nav-item dropdown no-arrow mx-1">
                           {/*  <Link className="nav-link dropdown-toggle" to="/" id="alertsDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-bell fa-fw"></i>
                              
                                <span className="badge badge-danger badge-counter">3+</span>
                            </Link> */}
                          
                            <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                aria-labelledby="alertsDropdown">
                                <h6 className="dropdown-header">
                                    Alerts Center
                                </h6>
                               {/*  <Link className="dropdown-item d-flex align-items-center" to="/">
                                    <div className="mr-3">
                                        <div className="icon-circle bg-primary">
                                            <i className="fas fa-file-alt text-white"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="small text-gray-500">December 12, 2019</div>
                                        <span className="font-weight-bold">A new monthly report is ready to download!</span>
                                    </div>
                                </Link> */}
                                <Link className="dropdown-item d-flex align-items-center" to="/">
                                    <div className="mr-3">
                                        <div className="icon-circle bg-success">
                                            <i className="fas fa-donate text-white"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="small text-gray-500">December 7, 2019</div>
                                        $290.29 has been deposited into your account!
                                    </div>
                                </Link>
                                <Link className="dropdown-item d-flex align-items-center" to="/">
                                    <div className="mr-3">
                                        <div className="icon-circle bg-warning">
                                            <i className="fas fa-exclamation-triangle text-white"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="small text-gray-500">December 2, 2019</div>
                                        Spending Alert: We've noticed unusually high spending for your account.
                                    </div>
                                </Link>
                                <Link className="dropdown-item text-center small text-gray-500" to="/">Show All Alerts</Link>
                            </div>
                        </li>

                     
                        <li className="nav-item dropdown no-arrow mx-1">
                            <Link className="nav-link dropdown-toggle" to="/" id="messagesDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-envelope fa-fw" style={{color:'#a18fe8'}}></i>
                             
                                <span className="badge badge-danger badge-counter">7</span>
                            </Link>
                         
                            <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                aria-labelledby="messagesDropdown">
                                <h6 className="dropdown-header">
                                    Message Center
                                </h6>
                                <Link className="dropdown-item d-flex align-items-center" to="/">
                                    <div className="dropdown-list-image mr-3">
                                        <img className="rounded-circle" src="img/undraw_profile_1.svg"
                                            alt="..."/>
                                        <div className="status-indicator bg-success"></div>
                                    </div>
                                    <div className="font-weight-bold">
                                        <div className="text-truncate">Hi there! I am wondering if you can help me with a
                                            problem I've been having.</div>
                                        <div className="small text-gray-500">Emily Fowler · 58m</div>
                                    </div>
                                </Link>
                                <Link className="dropdown-item d-flex align-items-center" to="/#">
                                    <div className="dropdown-list-image mr-3">
                                        <img className="rounded-circle" src="img/undraw_profile_2.svg"
                                            alt="..."/>
                                        <div className="status-indicator"></div>
                                    </div>
                                    <div>
                                        <div className="text-truncate">I have the photos that you ordered last month, how
                                            would you like them sent to you?</div>
                                        <div className="small text-gray-500">Jae Chun · 1d</div>
                                    </div>
                                </Link>
                                <Link className="dropdown-item d-flex align-items-center" to="/#">
                                    <div className="dropdown-list-image mr-3">
                                        <img className="rounded-circle" src="img/undraw_profile_3.svg"
                                            alt="..."/>
                                        <div className="status-indicator bg-warning"></div>
                                    </div>
                                    <div>
                                        <div className="text-truncate">Last month's report looks great, I am very happy with
                                            the progress so far, keep up the good work!</div>
                                        <div className="small text-gray-500">Morgan Alvarez · 2d</div>
                                    </div>
                                </Link>
                                <Link className="dropdown-item d-flex align-items-center" to="/">
                                    <div className="dropdown-list-image mr-3">
                                        <img className="rounded-circle" src="https://source.unsplash.com/Mv9hjnEUHR4/60x60"
                                            alt="..."/>
                                        <div className="status-indicator bg-success"></div>
                                    </div>
                                    <div>
                                        <div className="text-truncate">Am I a good boy? The reason I ask is because someone
                                            told me that people say this to all dogs, even if they aren't good...</div>
                                        <div className="small text-gray-500">Chicken the Dog · 2w</div>
                                    </div>
                                </Link>
                                <Link className="dropdown-item text-center small text-gray-500" to="/">Read More Messages</Link>
                            </div>
                        </li>

                        <div className="topbar-divider d-none d-sm-block"></div>

                    
                        <li className="nav-item dropdown no-arrow">
                            <Link className="nav-link dropdown-toggle"  id="userDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span className="mr-2 d-none d-lg-inline text-gray-600 small">{userData.firstname} {userData.surname}</span>
                                <img className="img-profile rounded-circle"
                                    src="img/undraw_profile.svg" alt='profile' />
                            </Link>
                        
                            <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                aria-labelledby="userDropdown">
                                <Link className="dropdown-item" to="/profile">
                                    <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Profile
                                </Link>
                               {/*  <Link className="dropdown-item" to="/">
                                    <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Settings
                                </Link> */}
                            
                                <div className="dropdown-divider"></div>
                                <Link className="dropdown-item" onClick={handlerSignOut}>
                                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Logout
                                </Link>
                            </div>
                        </li>

                    </ul>

                </nav>

    </div>
  )
}
