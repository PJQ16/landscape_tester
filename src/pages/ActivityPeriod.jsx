import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import { Link, useNavigate, useParams } from "react-router-dom";
import Scope1 from "../components/Scope1";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../components/MyContext";
import axios from "axios";
import config from "../config";
import SidebarActivity from "../components/SidebarActivity";
import ScrollTop from "../components/ScrollTop";

export default function ActivityPeriod() {
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();
  const { fac_id, years, employee_amount, building_area } = useParams();
  const [activityData, setActivityData] = useState(null);

  useEffect(() => {
    axios
      .get(
        config.urlApi +
          `/activity/showPeriod/${fac_id}/${years}/${employee_amount}/${building_area}`
      )
      .then((res) => {
        if (res.data.fac_id === userData.facultyID) {
          setActivityData(res.data);
        } else {
          navigate("/info");
        }
      })
      .catch((error) => {
        console.error("Error Fetching activity Detail", error);
      });
  }, [fac_id, years, employee_amount, building_area, navigate, userData.facultyID]);

  const backgroundImageStyle = {
    backgroundImage: 'url("/img/cloud.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div>
      <div id="wrapper">
        <SidebarActivity />
        <div
          id="content-wrapper"
          className="d-flex flex-column"
          style={backgroundImageStyle}
        >
          <Navbar />
          <div id="content">
            <div className="container-fluid">
              <span className="h1 text-dark">
                {userData.campusName} {userData.facultyName} {years}
              </span>
              <p className="m-2">หน้าการทำกิจกรรมปล่อยก๊าซเรือนกระจก</p>
              <Scope1 />
              {/* การแสดงข้อมูล activityData */}
              {activityData && (
                <div className="mt-4">
                  <h2>ข้อมูลกิจกรรม</h2>
                  <p>รายละเอียด: {activityData.details}</p>
                  <p>จำนวนพนักงาน: {activityData.employee_amount}</p>
                  <p>พื้นที่อาคาร: {activityData.building_area}</p>
                  {/* เพิ่มข้อมูลที่ต้องการแสดงตามข้อมูลที่ได้จาก API */}
                </div>
              )}
            </div>
          </div>
          <Footer />
        </div>
      </div>

      <ScrollTop />
      <Modal id="logoutModal" title="ออกจากระบบ">
        Select "Logout" below if you are ready to end your current session.
        <div className="modal-footer">
          <button
            className="btn btn-secondary"
            type="button"
            data-dismiss="modal"
          >
            Cancel
          </button>
          <Link className="btn btn-primary" to="/">
            Logout
          </Link>
        </div>
      </Modal>
    </div>
  );
}
