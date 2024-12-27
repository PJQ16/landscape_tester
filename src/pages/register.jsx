import React, { useContext, useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config";
import Swal from "sweetalert2";
import { UserContext } from "../components/MyContext";


export default function Register() {

  const [firstName, setFirstName] = useState("");
  const [surName, setSurName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [campuies, setCampuies] = useState([]);
  const [selectedCampusId, setSelectedCampusId] = useState("");
  const [faculties, setFaculties] = useState([]);
  const [selectedFacultyId, setSelectedFacultyId] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { userData, setUserData } = useContext(UserContext);
    const navigate = useNavigate();
  const qs = require('qs');

  useEffect(() => {
    fetSelectData();
    fetchData();
  }, []);

const fetchData = async () => {
    try {
      const response = await axios.get(config.urlApi + '/users/showUserApi', config.headers());
  
      if (response.data.message === 'success') {
        setUserData({
          firstname: response.data.result.fname,
          surname: response.data.result.sname,
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

  const fetSelectData = async () => {
    try {
      const response = await axios.get(config.urlApi + "/place/showAllPlace");
      setCampuies(response.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleCampusChange = async (event) => {
    const selectedCampusId = event.target.value;
    setSelectedCampusId(selectedCampusId);

    // Find the campus object based on selectedCampusId
    const selectedCampus = campuies.find((campus) => campus.id === selectedCampusId);

    // If selectedCampus is found, you can access its data
    if (selectedCampus) {
      // Set faculties based on the selected campus
      setFaculties(selectedCampus.faculties || []);
    }
  };

  const handlerRegister = async (e) => {
    e.preventDefault();

    const payload = {
        fname: firstName,
        sname: surName,
        email: email,
        password: password,
        role_id: 4,
        fac_id: selectedFacultyId
    };

    // Convert payload to x-www-form-urlencoded format
    const formData = qs.stringify(payload);

    if (firstName === '' || surName === '' || email === '' || password === '' || selectedFacultyId === '') {
        Swal.fire({
            icon: 'warning',
            title: 'เตือน',
            text: 'กรุณากรอกข้อมูลให้ครบถ้วน'
        });
    } else {
        Swal.fire({
            icon: 'question',
            title: 'แน่ใจหรือไม่?',
            text: 'ต้องการสมัครสมาชิกใช่หรือไม่',
            showCancelButton: true
        }).then(async (res) => {
            if (res.isConfirmed) {
                try {
                    await axios.post(config.urlApi + '/users/Addusers', formData, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    });

                    // Clear form fields
                    setFirstName('');
                    setSurName('');
                    setEmail('');
                    setPassword('');
                    setSelectedFacultyId('');

                    Swal.fire({
                        icon: 'success',
                        title: 'สำเร็จ',
                        text: 'สมัครสมาชิกสำเร็จ',
                        showConfirmButton: false,
                        timer: 2000
                    });

                    // Optionally fetch data or navigate to another page
                    fetchData();
                    navigate('/user');
                } catch (error) {
                    console.error('Error registering user:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'ผิดพลาด',
                        text: 'ไม่สามารถสมัครสมาชิกได้'
                    });
                }
            }
        });
    }
};


  return (
    <div className="container mt-5 rounded">
      <div className="border-dark rounded p-5">
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-12 text-center">
              <p className="h1 text-white">
                <img
                  src="http://netzero.cmu.ac.th/web/wp-content/uploads/2023/05/logo-2-scaled-1.png"
                  alt="logocmulandscape"
                  style={{ height: "100px" }}
                />
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="rounded col-md-12 p-4 mx-1 mt-5 bg-light shadow-sm">
            <form onSubmit={handlerRegister}>
              <p className="h3 text-dark text-center">สมัครสมาชิก</p>
              <div className="col-md-12">
                <label className="text-dark">
                  ชื่อ
                </label>
                <input
                  type="text"
                  className="form-control p-2 shadow-sm"
                  placeholder="ชื่อ"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="col-md-12">
                <label  className="text-dark">
                  นามสกุล
                </label>
                <input
                  type="text"
                  className="form-control p-2 shadow-sm"
                  placeholder="นามสกุล"
                  onChange={(e) => setSurName(e.target.value)}
                />
              </div>
              <div className="col-md-12">
                <label  className="text-dark">
                  อีเมลล์
                </label>
                <input
                  type="email"
                  className="form-control p-2 shadow-sm"
                  placeholder="อีเมลล์"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="col-md-12 mt-2">
                <label className="text-dark">
                  รหัสผ่าน
                </label>
                <input
                  type="password"
                  required
                  className="form-control p-2 shadow-sm"
                  placeholder="รหัสผ่าน"
                  onChange={(e) => setPassword(e.target.value)}
                />
                 {passwordError && (
                  <div className="invalid-feedback">
                    {passwordError}
                  </div>
                )}
              </div>

              <div className="col-md-12 mt-2">
                <label  className="text-dark">
                  วิทยาเขต
                </label>
                <select
                  className="form-control p-2 shadow-sm"
                  value={selectedCampusId}
                  onChange={handleCampusChange}
                  required
                >
                  <option value="">เลือกวิทยาเขต</option>
                  {campuies.map((campus) => (
                    <option key={campus.id} value={campus.id}>
                      {campus.campus_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-12 mt-2">
                <label className="text-dark">
                  หน่วยงาน
                </label>
                <select
                  className="form-control p-2 shadow-sm"
                  value={selectedFacultyId}
                  onChange={(e) => setSelectedFacultyId(e.target.value)}
                  required
                >
                  <option value="">เลือกหน่วยงาน</option>
                  {faculties.map((faculty) => (
                    <option key={faculty.id} value={faculty.id}>
                      {faculty.fac_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-12 mt-2">
              <button className="btn btn-primary" onClick={handlerRegister}><i className="fa-solid fa-address-card"></i> สมัครสมาชิก</button>
           
              <Link to="/user">
                <button className="btn btn-secondary shadow-sm ms-2">
                  <i className="fa-solid fa-right-to-bracket"></i> กลับ
                </button>
              </Link>
              </div>
             
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
