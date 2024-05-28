import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import MapFocus from "../../components/MapFocus";

export default function TabActivityInfo() {
  const [infos, setInfo] = useState([]);
  const [form, setForm] = useState({ comment: '', status_activity: 0 });
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const { id, years } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${config.urlApi}/activity/showPeriodInfo/${id}`);
      setInfo(res.data);
      if (res.data.length > 0) {
        // Assuming the form fields should be set with the first info item
        const firstInfo = res.data[0];
        setForm({
          comment: firstInfo.faculty.comment || '',
          status_activity: firstInfo.faculty.status_activity || 0,
        });
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const formChangeData = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handlerSubmitUpdate = async (event) => {
    try {
      event.preventDefault();
      const payload = {
        comment: form.comment,
        status_activity: form.status_activity,
      };

      const confirmation = await Swal.fire({
        icon: 'question',
        title: 'Question',
        text: 'ต้องการบันทึกข้อมูลใช่หรือไม่?',
        showCancelButton: true,
      });

      if (confirmation.isConfirmed) {
        await Swal.fire({
          icon: 'success',
          title: 'บันทึก',
          text: 'บันทึกข้อมูลสำเร็จ',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });

        await axios.put(`${config.urlApi}/activity/check/${id}`, payload);
        fetchData(); // Fetch data again to update the state
        
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message,
      });
    }
  };

  const renderStatusOptions = (currentStatus) => {
    const statuses = [
      { value: "0", label: "ไม่มีการดำเนินการ" },
      { value: "1", label: "ปรับแก้ไข" },
      { value: "2", label: "ตรวจสอบเรียบร้อย" },
      { value: "3", label: "เกิดข้อผิดพลาด" },
    ];

    return statuses
      .filter((status) => status.value !== currentStatus.toString())
      .map((status) => (
        <option key={status.value} value={status.value}>
          {status.label}
        </option>
      ));
  };

  return (
    <div className="d-flex justify-content-start">
      <div className="w-50 border rounded me-2 p-3 bg-light">
        <div className="d-flex flex-column">
          <h3>แผนที่</h3>
          {infos.map((info) => (
            <MapFocus
              key={info.id}
              detail={`วิทยาเขต ${info.campus.campus_name} หน่วยงาน ${info.faculty.fac_name}`}
              address={`ที่อยู่ ${info.faculty.address}`}
              latitude={parseFloat(info.faculty.latitude)}
              longitude={parseFloat(info.faculty.longitude)}
              setLatitude={setLatitude}
              setLongitude={setLongitude}
            />
          ))}

          <div className="mt-5 p-2">
            {infos.map((item) =>
              item.faculty.logo === "" ? (
                <img
                  key={item.id}
                  src="https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg"
                  style={{ width: '100%' }}
                  className="rounded-lg"
                  alt=""
                />
              ) : (
                <img
                  key={item.id}
                  src={`${config.urlApi}/logos/${item.faculty.logo}`}
                  style={{ width: '100%' }}
                  className="rounded-lg"
                  alt=""
                />
              )
            )}
          </div>
        </div>
      </div>
      <div className="w-50 border rounded me-2 p-3 bg-light">
        <h3>ข้อมูลทั่วไป</h3>
        {infos.map((item) => (
          <div className="d-flex flex-column" key={item.id}>
            <div className="p-2">
              <label>วิทยาเขต</label>
              <input
                type="text"
                className="form-control"
                value={item.campus.campus_name}
                readOnly
              />
            </div>

            <div className="p-2">
              <label>หน่วยงาน</label>
              <input
                type="text"
                className="form-control"
                value={item.faculty.fac_name}
                readOnly
              />
            </div>
            <div className="p-2">
              <label>จำนวนพนักงาน</label>
              <input
                type="text"
                className="form-control"
                value={item.employee_amount}
                readOnly
              />
            </div>

            <div className="p-2">
              <label>พื้นที่ใช้สอย</label>
              <input
                type="text"
                className="form-control"
                value={item.building_area}
                readOnly
              />
            </div>

            <div className="p-2">
              <label>Latitude</label>
              <input
                type="text"
                className="form-control"
                value={item.faculty.latitude}
                readOnly
              />
            </div>

            <div className="p-2">
              <label>Longitude</label>
              <input
                type="text"
                className="form-control"
                value={item.faculty.longitude}
                readOnly
              />
            </div>
            <div className="p-2">
              <label>รูปแบบการคำนวณ</label>
              <input
                type="text"
                className="form-control"
                value="องค์การบริหารจัดการก๊าซเรือนกระจก (องค์การมหาชน)"
                readOnly
              />
            </div>

            <div className="p-2">
              <label>ปีฐาน</label>
              <input
                type="text"
                className="form-control"
                value="2565"
                readOnly
              />
            </div>
            <form onSubmit={handlerSubmitUpdate}>
              <div className="p-2">
                <label>ข้อคิดเห็น</label>
                <textarea
                  className="form-control"
                  cols="30"
                  rows="10"
                  value={form.comment}
                  name="comment"
                  onChange={formChangeData}
                  >
                    {item.comment}
                    </textarea>

              </div>

              <div className="p-2">
                <label>สถานะกิจกรรม</label>
                <select
                  className="form-control"
                  value={form.status_activity}
                  name="status_activity"
                  onChange={formChangeData}
                >
                  {renderStatusOptions(item.status_activity)}
                </select>
              </div>
              <button type="submit" className="btn btn-primary mt-4">
                บันทึก
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
