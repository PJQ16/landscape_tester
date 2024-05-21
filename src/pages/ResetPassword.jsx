import React, { useState } from 'react'; // ใช้ React และ useState สำหรับจัดการสถานะในคอมโพเนนต์
import axios from 'axios'; // ใช้ axios สำหรับการร้องขอ HTTP
import { useHistory, useLocation } from 'react-router-dom'; // ใช้ useHistory และ useLocation สำหรับการนำทางและดึงข้อมูลจาก URL

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState(''); // สร้างสถานะสำหรับรหัสผ่านใหม่
  const history = useHistory(); // สร้าง instance ของ useHistory
  const location = useLocation(); // สร้าง instance ของ useLocation
  const token = new URLSearchParams(location.search).get('token'); // ดึง token จาก query string ของ URL

  const handleSubmit = async (e) => {
    e.preventDefault(); // ป้องกันการรีเฟรชหน้าเว็บเมื่อฟอร์มถูกส่ง

    try {
      await axios.post('http://yourbackend.com/reset-password', { token, newPassword }); // ส่งคำขอรีเซ็ตรหัสผ่านไปยัง backend
      alert('Password has been reset'); // แสดงข้อความแจ้งเตือนว่ารีเซ็ตรหัสผ่านสำเร็จ
      history.push('/login'); // นำทางผู้ใช้ไปยังหน้าเข้าสู่ระบบ
    } catch (error) {
      alert('Failed to reset password'); // แสดงข้อความแจ้งเตือนว่าการรีเซ็ตรหัสผ่านล้มเหลว
    }
  };

  return (
    <form onSubmit={handleSubmit}> {/* ฟอร์มสำหรับรีเซ็ตรหัสผ่าน */}
      <input
        type="password"
        placeholder="Enter new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)} // อัปเดตรหัสผ่านใหม่ในสถานะเมื่อผู้ใช้พิมพ์
      />
      <button type="submit">Reset Password</button> {/* ปุ่มส่งฟอร์ม */}
    </form>
  );
};

export default ResetPassword; // ส่งออกคอมโพเนนต์ ResetPassword
