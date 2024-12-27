import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import config from "../../config";
import Modal from "../../components/Modal";
import { Link } from "react-router-dom";

function TabUser() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State สำหรับการค้นหา
  const [selectedUser, setSelectedUser] = useState(null); // State สำหรับผู้ใช้ที่ถูกเลือก

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const responseUser = await axios.get(config.urlApi + `/users`);
      const responseRole = await axios.get(config.urlApi + `/role`);
      setUsers(responseUser.data);
      setRoles(responseRole.data);
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "error!!",
        text: e.message,
      });
    }
  };

  const updateRoleUser = async (e, email) => {
    try {
      e.preventDefault();
      const payload = {
        role_id: e.target.elements.roleSelect.value,
      };
      await axios.put(config.urlApi + `/update/userRole/${email}`, payload);
      // ดึงข้อมูลใหม่หลังจากการอัปเดตเสร็จสิ้น
      document.getElementById(`btnClose${email}`).click();
      fetchData();
    
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!!",
        text: error.message,
      });
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.sname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.faculty.fac_name.toLowerCase().includes(searchTerm.toLowerCase()) // เพิ่มเงื่อนไขสำหรับหน่วยงาน
  );

  const handleEdit = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="mt-3 p-2">
      <div className="d-flex justify-content-between">
        <Link to="/register">
          <button className="btn btn-primary mb-2">
            <i className="fa-solid fa-user-plus"></i> เพิ่มผู้ใช้งาน
          </button>
        </Link>
        <p>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="ค้นหาผู้ใช้งาน...."
            style={{ borderRadius: '20px', border: '2px solid #E4DBD2', margin: '5px', paddingLeft: '20px' }}
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </p>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead className="text-center">
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
          <tbody className="text-center">
            {filteredUsers.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.fname}</td>
                <td>{user.sname}</td>
                <td>{user.email}</td>
                <td>{user.faculty.fac_name}</td>
                <td>{user.role.role_name}</td>
                <td>
                  <Link
                    to="#"
                    data-toggle="modal"
                    data-target="#modalEditUser"
                    onClick={() => handleEdit(user)}
                    className="text-dark text-decoration-none"
                    id={`btnClose${user.email}`}
                  >
                    <i className="fa-solid fa-list-check"></i>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="text-center">
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

      {selectedUser && (
        <Modal
          id="modalEditUser"
          title={`แก้ไขสิทธิ์ผู้ใช้งาน ${selectedUser.email}`}
        >
          <form onSubmit={(e) => updateRoleUser(e, selectedUser.email)}>
            <select className="form-control" name="roleSelect">
              <option value={`${selectedUser.role.id}`}>
                {selectedUser.role.role_name}
              </option>
              {roles.map(
                (role,index) =>
                  selectedUser.role.id !== role.id && (
                    <option key={index} value={`${role.id}`}>
                      {role.role_name}
                    </option>
                  )
              )}
            </select>
            <div className="row col-md-12 my-2">
              <button type="submit" className="btn btn-secondary">
                บันทึก
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default TabUser;
