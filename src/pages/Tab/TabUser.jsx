import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import config from '../../config';

function TabUser() {
    const [user,setUser] = useState([]);

    useEffect(()=>{
        fetchData();
    },[])

    const fetchData = async()=>{
        try{
            const resonse = await axios.get(config.urlApi + `/users`)
            setUser(resonse.data);

        }catch(e){
            Swal.fire(
                {
                    icon:'error',
                    title:'error!!',
                    text:e.message
                }
            )
        }
    }
  return (
    <div className='mt-5'>
     <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
            <thead className='text-center'>
                <tr>
                    <th>ลำดับ</th>
                    <th>ชื่อ</th>
                    <th>นามสกุล</th>
                    <th>Email</th>
                    <th>หน่วยงาน</th>
                    <th>ระดับผู้ใช้งาน</th>
                    <th>จัดการผู้ใช้งาน</th>
                </tr>
            </thead>
            <tbody className='text-center'>
                {user.map((users,index) =>
               
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{users.fname}</td>
                    <td>{users.sname}</td>
                    <td>{users.email}</td>
                    <td>{users.faculty.fac_name}</td>
                    <td>{users.role.role_name}</td>
                    <td><i className="fa-solid fa-list-check"></i></td>
                </tr>
                )}
               
            </tbody>
            <tfoot className='text-center'>
            <tr>
                     <th>ลำดับ</th>
                    <th>ชื่อ</th>
                    <th>นามสกุล</th>
                    <th>Email</th>
                    <th>หน่วยงาน</th>
                    <th>ระดับผู้ใช้งาน</th>
                    <th>จัดการผู้ใช้งาน</th>
                </tr>
            </tfoot>
        </table>
        </div>
    </div>
  )
}

export default TabUser