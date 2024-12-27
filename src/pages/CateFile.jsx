import Swal from "sweetalert2";
import axios from "axios";
import Modal from "../components/Modal";
import Layout from "../layouts.jsx/layout";
import { useEffect, useState } from "react";
import config from "../config";

export default function CateFile() {
  const [cateName, setCateName] = useState("");
  const [categories, setCategories] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [statuses, setStatuses] = useState([
    { value: "1", label: "แสดงผล" },
    { value: "0", label: "ไม่แสดงผล" },
  ]);
  
  const [selectedStatus, setSelectedStatus] = useState(""); // ค่าที่ถูกเลือก
  

  // Fetch categories from the API
  const fetchCategories = async () => {
    try {
      const response = await axios.get(config.urlApi+"/categories-upload-file");
      setCategories(response.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถดึงข้อมูลหมวดหมู่ได้",
      });
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChangeValue = (e) => {
    setCateName(e.target.value);
  };

  const handleAddOrUpdateCategory = async (e) => {
    e.preventDefault();

    if (!cateName.trim()  || !selectedStatus) {
        Swal.fire({
          icon: "warning",
          title:'เตือน',
          text: "กรุณากรอกชื่อหมวดหมู่",
        });
        return; // หยุดการทำงานถ้าชื่อหมวดหมู่ว่าง
      }

      const payload = {
        cate_name: cateName,
        statue_active: selectedStatus, // เพิ่มค่าสถานะที่ถูกเลือก
      };

    const confirmationMessage = editMode
      ? "ต้องการแก้ไขหมวดหมู่นี้ใช่หรือไม่"
      : "ต้องการเพิ่มหมวดหมู่นี้ใช่หรือไม่";

    const res = await Swal.fire({
      icon: "question",
      title:'คำถาม',
      text: confirmationMessage,
      showCancelButton: true,
      input: "text",
      inputPlaceholder: 'กรุณากรอกคำว่า "ยืนยัน"',
      inputValidator: (value) => {
        if (!value) {
          return "กรุณากรอกข้อความ";
        } else if (value !== "ยืนยัน") {
          return 'กรุณากรอกคำว่า "ยืนยัน"';
        }
        return null;
      },
    });

    if (res.isConfirmed) {
      try {
        if (editMode) {
          await axios.put(`${config.urlApi}/categories-upload-file/${editId}`, payload);
          Swal.fire({
            icon: "success",
            title: "แก้ไขข้อมูลสำเร็จ",
            timer: 1000,
            timerProgressBar: true,
          });
        } else {
          await axios.post(config.urlApi+"/categories-upload-file", payload);
          Swal.fire({
            icon: "success",
            title: "บันทึกข้อมูลสำเร็จ",
            timer: 1000,
            timerProgressBar: true,
          });
        }

        setCateName(""); // Reset input field
        setEditMode(false);
        setEditId(null);
        fetchCategories(); // Refresh categories
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: "ไม่สามารถบันทึกข้อมูลได้",
        });
        console.error("Error adding/updating category:", error);
      }
    }
  };

  const handleEditCategory = (category) => {
    setCateName(category.cate_name);
    setSelectedStatus(category.statue_active); // กำหนดสถานะเริ่มต้น
    setEditMode(true);
    setEditId(category.id);
    document.getElementById("exampleModal").click();
  };
  
  

  const handleDeleteCategory = async (id) => {
    const confirm = await Swal.fire({
      icon: "warning",
      title: "คุณแน่ใจหรือไม่?",
      text: "ข้อมูลจะไม่สามารถกู้คืนได้!",
      showCancelButton: true,
      confirmButtonText: "ลบ",
      cancelButtonText: "ยกเลิก",
      input:'text',
      inputPlaceholder:'กรุณากรอกคำว่า "ลบ"',
      inputValidator:(value)=>{
        if(!value){
            return 'กรุณากรอกข้อความ';
        }else if(value !== 'ลบ'){
            return 'กรุณากรอกคำว่า "ลบ"';
        }
        return null;
      }
    });

    if (confirm.isConfirmed) {
      try {
         axios.delete(`${config.urlApi}/categories-upload-file/${id}`);
        Swal.fire("ลบสำเร็จ!", "", "success");
        fetchCategories(); // Refresh categories
      } catch (error) {
        Swal.fire("เกิดข้อผิดพลาด!", "", "error");
        console.error("Error deleting category:", error);
      }
    }
  };

  const showStatus = (category) => {
    switch (category.statue_active) {
      case "0":
        return (
          <>
            <i className="fas fa-eye-slash me-2 text-primary"></i> <br/>ไม่แสดงผล
          </>
        );
      case "1":
        return (
          <>
            <i className="fas fa-eye me-2  text-primary"></i> <br/> แสดงผล
          </>
        );
      default:
        return "ไม่พบสถานะการแสดงผล";
    }
  };

  return (
    <div>
      <Layout>
        <div className="d-flex justify-content-between">
          <div className="fw-semibold text-lg">หมวดหมู่ไฟล์อัพโหลด</div>
          <div className="">
            <button className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
              <i className="fa-solid fa-folder-plus text-lg me-2"></i> เพิ่มหมวดหมู่
            </button>
          </div>
        </div>
        <div className="table-responsive mt-5">
          <table className="table table-bordered table-striped">
            <thead>
              <tr className="text-center">
                <th>ลำดับ</th>
                <th>ชื่อหมวดหมู่</th>
                <th>สถานะการแสดงผล</th>
                <th>จัดการ</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {categories.map((category, index) => (
                <tr key={category.id}>
                  <td>{index + 1}</td>
                  <td>{category.cate_name}</td>
                  <td>{showStatus(category)}</td>
                  <td>
                    <button
                      className="btn btn-warning mx-1"
                       data-toggle="modal" data-target="#exampleModal"
                      onClick={() => handleEditCategory(category)}
                    >
                      <i className="fa-solid fa-pen-to-square"></i> แก้ไข
                    </button>
                    <button
                      className="btn btn-danger mx-1"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      <i className="fa-solid fa-trash"></i> ลบ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
      <Modal id="exampleModal" size="lg" title={editMode ? "แก้ไขหมวดหมู่ไฟล์อัพโหลด" : "เพิ่มหมวดหมู่ไฟล์อัพโหลด"}>
        <label htmlFor="cate_name">ชื่อหมวดหมู่ไฟล์อัพโหลด</label>
        <div className="row">
              <div className="col-md-12 my-2">
              <input
            type="text"
            name="cate_name"
            className="form-control"
            placeholder="กรอกชื่อหมวดหมู่"
            id="cate_name"
            value={cateName}
            onChange={handleChangeValue}
          />
              </div>

              <div className="col-md-12">
              <select
                className="form-control my-2"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                >
                <option value="">-- เลือกสถานะ --</option>
                {statuses.map((status) => (
                    <option key={status.value} value={status.value}>
                    {status.label}
                    </option>
                ))}
                </select>

              </div>

        </div>
         
            

            <button
            className="btn btn-primary"
            onClick={handleAddOrUpdateCategory}
          >
            <i className="fa-solid fa-circle-plus"></i> {editMode ? "บันทึกการแก้ไข" : "เพิ่มหมวดหมู่ข้อมูล"}
          </button>
      </Modal>
    </div>
  );
}
