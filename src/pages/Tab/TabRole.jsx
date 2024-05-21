import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import config from '../../config';
import Modal from '../../components/Modal';

function TabRole() {
    const [roles,setRoles] = useState([]);
    const[roleName,setRoleName] = useState('');

    useEffect(()=>{
        fetchData();
    },[])

    const fetchData = async()=>{
        try{
            const response = await axios.get(config.urlApi + `/role`)
            const dataWithDaysAgo = response.data.map(role => {
                const createdAtDate = new Date(role.createdAt);
                const currentDate = new Date();
                const differenceInMilliseconds = currentDate - createdAtDate;
                const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
                return { ...role, daysAgo: differenceInDays };
            });
            setRoles(dataWithDaysAgo);

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

    const handlerAddRole = async (e) => {
        try {
            e.preventDefault();
            if (roleName.length < 1) { // ตรวจสอบว่าชื่อบทบาทมีความยาวมากกว่า 0 หรือไม่
                await Swal.fire({
                    icon: 'warning',
                    title: 'เตือน!',
                    text: 'กรุณากรอกข้อมูล'
                });
            } else {
                await Swal.fire({
                    icon: 'question',
                    title: 'คำถาม',
                    text: 'คุณแน่ใจหรือไม่ บันทึกข้อมูล',
                    showCancelButton: true
                }).then(async (res) => {
                    if (res.isConfirmed) {
                        await Swal.fire({
                            icon: 'success',
                            title: 'สำเร็จ',
                            text: 'บันทึกข้อมูลสำเร็จ',
                            timer: 1200,
                            timerProgressBar: true
                        });
                        const payload = {
                            role_name: roleName
                        };
                         await axios.post(config.urlApi + `/addrole`, payload);
                         window.close('modal')
                        fetchData(); 
                    }
                });
            }
        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: 'error!!',
                text: e.message
            });
        }
    };
    
  return (
    <div className='mt-3 p-2'>
    <button className="btn btn-primary mb-2" data-toggle="modal" data-target="#ModalAddRole"><i className="fa-solid fa-circle-plus"></i> เพิ่มข้อมูล</button>
     <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
            <thead className='text-center'>
                <tr>
                    <th>ลำดับ</th>
                    <th>บทบาท</th>
                    
                    <th>จัดการข้อมูล บทบาท</th>
                </tr>
            </thead>
            <tbody className='text-center'>
                {roles.map((role,index) =>
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{role.role_name}</td>
                    <td><i className="fa-solid fa-list-check"></i></td>
                </tr>
                )}
            </tbody>
            <tfoot className='text-center'>
                <tr>
                    <th>ลำดับ</th>
                    <th>บทบาท</th>
                    <th>จัดการข้อมูล บทบาท</th>
                </tr>
            </tfoot>
        </table>
        </div>
        <Modal id="ModalAddRole" title="เพิ่มข้อมูล">
                    <form onSubmit={handlerAddRole}>
                        <div className="row">
                            <div className="col-md-12">
                                <label>ระดับผู้ใช้งาน</label>
                                <input type="text" className='form-control mb-3' onChange={(e) => setRoleName(e.target.value)} placeholder='role name' />
                            </div>
                        </div>
                        <button className='btn btn-primary me-2' onClick={handlerAddRole}>บันทึก</button>
                        <button className='btn btn-secondary' data-dismiss="modal">ปิด</button>
                    </form>
        </Modal>
    </div>
  )
}

export default TabRole;
