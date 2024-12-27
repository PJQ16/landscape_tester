import Swal from "sweetalert2";
import axios from "axios";
import Modal from "../components/Modal";
import Layout from "../layouts.jsx/layout";
import { useEffect, useState } from "react";
import config from "../config";

export default function ImportFile() {
  const [file, setFile] = useState(null); // ไฟล์ที่เลือก
  const [fileName, setFileName] = useState(""); // ชื่อไฟล์
  const [fileDetail, setFileDetail] = useState(""); // คำอธิบายไฟล์
  const [categories, setCategories] = useState([]); // รายการหมวดหมู่ไฟล์
  const [nameFile, setNameFiles] = useState([]); // ข้อมูลหมวดหมู่
  const [editMode, setEditMode] = useState(false); // โหมดแก้ไข
  const [editId, setEditId] = useState(null); // ID ไฟล์ที่จะแก้ไข
  const [fileType, setFileType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("1"); // ค่าที่ถูกเลือกสำหรับสถานะ
  const [statuses] = useState([
    { value: "1", label: "แสดงผล" },
    { value: "0", label: "ไม่แสดงผล" },
  ]);
  const [selectedCategory, setSelectedCategory] = useState(""); // เพิ่ม state สำหรับหมวดหมู่

  // ดึงข้อมูลไฟล์ทั้งหมดจาก API
  const fetchCategories = async () => {
    try {
      const response1 = await axios.get(`${config.urlApi}/manageFile`);
      const response2 = await axios.get(
        `${config.urlApi}/categories-upload-file`
      );
      setCategories(response1.data);
      setNameFiles(response2.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถดึงข้อมูลไฟล์ได้",
      });
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value); // เซ็ตค่า ID หมวดหมู่ที่เลือก
  };

  const getFileExtension = (fileName) => {
    return fileName.split(".").pop(); // ดึงส่วนขยายไฟล์ เช่น pdf, xlsx
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files ? e.target.files[0] : null; // ตรวจสอบไฟล์
    if (selectedFile) {
      const allowedTypes = [
        "application/pdf",
        "application/vnd.ms-excel",
        "text/csv",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (!allowedTypes.includes(selectedFile.type)) {
        Swal.fire({
          icon: "error",
          title: "ประเภทไฟล์ไม่รองรับ",
          text: "กรุณาเลือกไฟล์ PDF, Word, Excel หรือ CSV",
        });
        return;
      }

      const extension = getFileExtension(selectedFile.name);
      setFile(selectedFile); // เซตไฟล์
      setFileName(selectedFile.name); // เซตชื่อไฟล์
      setFileType(extension); // เซตประเภทไฟล์
    } else {
      console.warn("ไม่มีไฟล์ถูกเลือก");
    }
  };

  const handleDetailChange = (e) => {
    setFileDetail(e.target.value); // เซตคำอธิบายไฟล์
  };
  

  const handleAddOrUpdateFile = async (e) => {
    e.preventDefault();
  
    if (!file && !editMode) {
      Swal.fire({
        icon: "warning",
        title: "กรุณาเลือกไฟล์ก่อน",
      });
      return;
    }
  
    const formData = new FormData();
    if (file) formData.append("file", file); // ไฟล์ใหม่
    formData.append("file_detail", fileDetail);
    formData.append("file_name", fileName);
    formData.append("file_type", fileType);
    formData.append("cate_upload_id", selectedCategory);
    formData.append("status_active", selectedStatus);
  
    try {
      if (editMode) {
        // อัปเดตข้อมูลไฟล์เดิม
        await axios.put(`${config.urlApi}/manageFile/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        Swal.fire("สำเร็จ", "อัปเดตไฟล์เรียบร้อย", "success");
      } else {
        // เพิ่มไฟล์ใหม่
        await axios.post(`${config.urlApi}/manageFile`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        Swal.fire("สำเร็จ", "เพิ่มไฟล์เรียบร้อย", "success");
      }
  
      fetchCategories(); // โหลดข้อมูลใหม่
      resetForm(); // รีเซ็ตฟอร์ม
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถบันทึกข้อมูลได้",
      });
      console.error("Error saving file:", error);
    }
  };
  
  // ฟังก์ชันสำหรับรีเซ็ตฟอร์ม
  const resetForm = () => {
    setFile(null);
    setFileName("");
    setFileDetail("");
    setSelectedStatus("1");
    setSelectedCategory("");
    setFileType("");
    setEditMode(false);
    setEditId(null);
  };
  
  // ตั้งค่าการแก้ไข
  const handleEditFile = (file) => {
    setFileName(file.file_name); // ชื่อไฟล์
    setFileDetail(file.file_detail); // คำอธิบายไฟล์
    setFileType(file.file_type); // ประเภทไฟล์
    setSelectedCategory(file.cate_upload_id); // หมวดหมู่ที่เลือกไว้
    setSelectedStatus(file.status_active); // สถานะ
    setEditMode(true); // เปิดโหมดแก้ไข
    setEditId(file.id); // เก็บ ID สำหรับอัปเดต
    
    // เปิด Modal แก้ไขข้อมูล
    document.getElementById("modalEditData").click();
  };

  const showStatus = (manage_file) => {
    switch (manage_file.status_active) {
      case "0":
        return (
          <>
            <i className="fas fa-eye-slash me-2 text-primary"></i> <br />
            ไม่แสดงผล
          </>
        );
      case "1":
        return (
          <>
            <i className="fas fa-eye me-2  text-primary"></i> <br /> แสดงผล
          </>
        );
      default:
        return "ไม่พบสถานะการแสดงผล";
    }
  };

  const handleDeleteFile = async (id) => {
    const confirm = await Swal.fire({
      icon: "warning",
      title: "เตือน",
      text: "ข้อมูลจะไม่สามารถกู้คืนได้!",
      showCancelButton: true,
      confirmButtonText: "ลบ",
      cancelButtonText: "ยกเลิก",
      input:'text',
      inputPlaceholder:'กรุณากรอกคำว่า "ลบ"',
      inputValidator:(value)=>{
        if(!value){
          return 'กรุณากรอกความ'
        }else if(value !== 'ลบ'){
          return 'กรุณากรอกคำว่า "ลบ"'
        }
          return null
      }
    });
  
    if (confirm.isConfirmed) {
      try {
        // ส่งคำขอ DELETE ไปยัง API
        await axios.delete(`${config.urlApi}/manageFile/${id}`);
        Swal.fire("ลบสำเร็จ!", "", "success");
  
        // รีเฟรชข้อมูลหลังลบ
        fetchCategories(); // ฟังก์ชันนี้ควรโหลดข้อมูลใหม่
      } catch (error) {
        console.error("Error deleting file:", error);
        Swal.fire("เกิดข้อผิดพลาด!", "", "error");
      }
    }
  };



  const handleDownload = async (fileName) => {
    if (!fileName) {
      Swal.fire("เกิดข้อผิดพลาด!", "ไม่มีชื่อไฟล์ที่จะดาวน์โหลด", "error");
      return;
    }
  
    try {
     const res = await Swal.fire({
            icon:'question',
            title:'ดาวน์โหลด',
            text:'กรุณากรอกคำว่า "ยืนยัน"',
            showCancelButton:true,
            input:'text',
            inputPlaceholder:'กรุณากรอกคำว่า "ยืนยัน"',
            inputValidator:(value)=>{
              if(!value){
                return 'กรุณากรอกข้อความ'
              }else if(value !== "ยืนยัน"){
                return 'กรุณากรอกคำว่า "ยืนยัน"'
              }
                return null
            } 
      });
      if(res.isConfirmed){
        // เรียก API เพื่อดาวน์โหลดไฟล์
        const response = await axios.get(`${config.urlApi}/download/${fileName}`, {
          responseType: "blob", // สำคัญ: เพื่อให้รับข้อมูลเป็น Blob
        });

        // สร้าง URL สำหรับดาวน์โหลด
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName); // ตั้งชื่อไฟล์
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        Swal.fire("ดาวน์โหลดสำเร็จ!", "", "success");
      }

     
    } catch (error) {
      console.error("Error downloading file:", error);
      Swal.fire("เกิดข้อผิดพลาด!", "ไม่สามารถดาวน์โหลดไฟล์ได้", "error");
    }
  };
  
  
  
  return (
    <Layout>
      <div className="d-flex justify-content-between">
        <div className="fw-semibold text-lg">ไฟล์อัพโหลด</div>
        <div>
          <button
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#modalEditData"
          >
            <i className="fa-solid fa-folder-plus text-lg me-2"></i>{" "}
            เพิ่มไฟล์อัพโหลด
          </button>
        </div>
      </div>
      <div className="table-responsive mt-5">
        <table className="table table-bordered table-striped">
          <thead>
            <tr className="text-center">
              <th>ลำดับ</th>
              <th>หมวดหมู่</th>
              <th>คำอธิบายไฟล์</th>
              <th>ชื่อไฟล์</th>
              <th>ปะเภทไฟล์</th>
              <th>สถานะการแสดงผล</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {categories.map((category, IndexCate) =>
              category.manage_files.map((manage_file, IndexManage) => (
                <tr key={category.id}>
                  <td>{IndexManage + 1}</td>
                  <td>{manage_file.file_detail}</td>
                  <td>{category.cate_name}</td>
                  <td
                    className="cursor-pointer"
                    onClick={() => manage_file?.file_name && handleDownload(manage_file.file_name)} // ตรวจสอบว่ามี file_name ก่อน
                  >
                    {manage_file?.file_name || "ไม่มีชื่อไฟล์"} {/* แสดงข้อความหาก file_name ไม่มี */}
                  </td>

                  <td>{showStatus(manage_file)}</td>
                  <td>{manage_file.file_type}</td>
                  <td>
                    <button
                      className="btn btn-warning mx-1"
                      data-toggle="modal"
                      data-target="#modalEditData"
                      onClick={() => handleEditFile(manage_file)}
                    >
                      <i className="fa-solid fa-pen-to-square"></i> แก้ไข
                    </button>
                    <button
                      className="btn btn-danger mx-1"
                      onClick={() => handleDeleteFile(manage_file.id)}
                    >
                      <i className="fa-solid fa-trash"></i> ลบ
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Modal
        id="modalEditData"
        size="lg"
        title={editMode ? "แก้ไขไฟล์" : "เพิ่มไฟล์"}
      >
        <div className="row px-4">
          <div className="col-md-12 my-2">
            <label htmlFor="file_detail">คำอธิบายไฟล์</label>
            <input
              type="text"
              className="form-control"
              placeholder="คำอธิบายไฟล์"
              name="file_detail"
              id="file_detail"
              value={fileDetail}
              onChange={handleDetailChange}
            />
          </div>
          {!editMode &&(
          <div className="col-md-12 my-2">
            <label htmlFor="file_name">เลือกไฟล์</label>
            <input
              type="file"
              className="form-control"
              name="file_name"
              id="file_name"
              onChange={handleFileChange}
              accept=".pdf, .doc, .docx, .xls, .xlsx, .csv"
            />
          </div>
           )}
          {!editMode &&(
          <div className="col-md-4 my-2">
            <label htmlFor="file_type">ประเภทไฟล์</label>
            <input
              type="text"
              className="form-control"
              name="file_type"
              id="file_type"
              value={fileType}
              readOnly
            />
          </div>
          )}

<div className={`${!editMode ? 'col-md-4 ' : 'col-md-6' }my-2`}>
            <label htmlFor="cate_upload_id">หมวดหมู่</label>
            <select
              name="cate_upload_id"
              className="form-control"
              id="cate_upload_id"
              value={selectedCategory}
              onChange={handleCategoryChange} // จัดการการเปลี่ยนแปลง
            >
              <option value="">เลือกหมวดหมู่</option>
              {nameFile.map((item, index) => (
                <option value={item.id} key={index}>
                  {item.cate_name}
                </option>
              ))}
            </select>
          </div>

          <div className={`${!editMode ? 'col-md-4 ' : 'col-md-6' }my-2`}>
            <label htmlFor="status_activeId">สถานะ</label>
            <select
              className="form-control"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              id="status_activeId"
            >
              {statuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>

          <button
            className="btn btn-primary mt-3"
            onClick={handleAddOrUpdateFile}
          >
            {editMode ? "บันทึกการแก้ไข" : "เพิ่มไฟล์"}
          </button>
        </div>
      </Modal>
    </Layout>
  );
}
