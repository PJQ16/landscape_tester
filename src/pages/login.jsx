import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import Swal from 'sweetalert2';



export default function Login() {
const [email,setEmail] = useState('');
const [emailError, setEmailError] = useState('');
const [password,setPassword] = useState('');
const [passwordError, setPasswordError] = useState('');

const navigate = useNavigate();

const handlerLogin = async () => {
  try {
      const payload = {
          email: email,
          password: password
      }
    
     
      const res = await axios.post(config.urlApi + '/admin/login', payload)

      if (res.data.message === 'success') {
          Swal.fire({
              title: 'Sign In',
              icon: 'success',
              text: 'เข้าสู่ระบบเรียบร้อยแล้ว',
              timer: 1500,
              timerProgressBar: true
          })
          localStorage.setItem(config.token_name, res.data.token);
          navigate('/');
      } else if (res.data.message === 'User not found'){
          Swal.fire({
              title: 'Sign In',
              icon: 'warning',
              text: 'ไม่พบข้อมูลในระบบ',
              timer: 2000,
              timerProgressBar: true
          })
      }
  } catch (e) {
      Swal.fire({
          icon: 'error',
          title: 'Error',
          text: e.message
      })
  }
}

const validateEmail = () => {
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    setEmailError('Please enter a valid email address');
  } else {
    setEmailError('');
  }
};

const validatePassword = () => {
  if (password.length < 6) {
    setPasswordError('Password must be at least 6 characters');
  } else {
    setPasswordError('');
  }
};
  

  return (
    <div className='container mt-5 rounded  '>
      <div className='border-dark rounded p-5'>
        <div className='row'>
          <div className='col-md-10'>
            <div className='col-md-12 text-center'>
              <p className='h1 text-white'>
                <img
                  src='http://netzero.cmu.ac.th/web/wp-content/uploads/2023/05/logo-2-scaled-1.png'
                  alt='logocmulandscape'
                  style={{ height: '100px' }}
                />
              </p>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='rounded col-md-5 p-4 mx-1 mt-5 bg-light shadow-sm'>
            <p className='h3 text-dark text-center'>เข้าสู่ระบบ</p>
            <div className='col-md-12'>
              <label className='text-dark'>
                Email
              </label>
              <input
                type='email'
                className='form-control p-2 shadow-sm'
                placeholder='email@email.com'
                onChange={(e)=>setEmail(e.target.value)}
                onBlur={validateEmail}
              />
                {emailError && <p className='text-danger'>{emailError}</p>}
            </div>

            <div className='col-md-12 mt-2'>
              <label  className='text-dark'>
                Password
              </label>
              <input
                type='password'
                required
                className='form-control p-2 shadow-sm'
                placeholder='Password'
                onChange={(e)=>setPassword(e.target.value)}
                onBlur={validatePassword} 
              />
                 {passwordError && <p className='text-danger'>{passwordError}</p>}
            </div>

            <div className='col-md-12 mt-3'>
              {email && password !== ''? <button className='btn btn-primary shadow-sm' onClick={handlerLogin}>
              <i className='fa-solid fa-right-to-bracket'></i> เข้าสู่ระบบ
              </button>
                : <button className='btn btn-primary shadow-sm' disabled>
                <i className="fa-solid fa-lock"></i> เข้าสู่ระบบ
              </button> }
             

              <Link to='/register'>
                <button className='btn btn-primary shadow-sm ms-2'>
                  <i className='fa-solid fa-address-card'></i> สมัครสมาชิก
                </button>
              </Link>
            </div>
          </div>
          <div className='rounded col-md-5 p-4 mx-1 mt-5'>
            <div className='row'>
              <div className='col-md-12'>
                <div
                  className='d-flex justify-content-center align-items-center'
                  style={{ height: '100%', borderRadius: '50%', overflow: 'hidden', position: 'relative' }}
                >
                  <img src='/img/factory.jpg' className='rounded-circle' alt='รูปภาพ' style={{ width: '100%', height: 'auto', opacity: 0.9 }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
