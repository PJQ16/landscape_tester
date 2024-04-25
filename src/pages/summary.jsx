import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import { Link, useParams } from "react-router-dom";
import { Bar } from 'react-chartjs-2';
import { BarElement ,LinearScale, CategoryScale, Chart } from "chart.js";
import { UserContext } from "../components/MyContext";
import SidebarActivity from "../components/SidebarActivity";
Chart.register(LinearScale, CategoryScale,BarElement);

export default function Summary() {
  const {userData} = useContext(UserContext);
  const {years} = useParams();
  const data = {
    labels: ['scope1', 'scope2', 'scope3', 'separate', 'removal'],
    datasets: [
      {
        label: 'Mockup Data',
        data: [50, 30, 80, 40, 60],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'category',
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
        axis: 'y', 
        title: {
          display: true,
          text: 'tCO2e',
        },
      },
    },
  };

  const headscope = [
    {scope:'Scope1',ogge:'10',rs12:'24',rs123:'30'},
    {scope:'Scope2',ogge:'15',rs12:'27',rs123:'32'},
    {scope:'Scope3',ogge:'18',rs12:'19',rs123:'33'},
    {scope:'Separate',ogge:'8',rs12:'26',rs123:'34'},
    {scope:'Summary Scope1 & 2',ogge:'17',rs12:'35',rs123:'36'},
    {scope:'Summary Scope1 & 2 & 3',ogge:'20',rs12:'32',rs123:'37'},

  ]

  const backgroundImageStyle = {
    backgroundImage: 'url("/img/cloud.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    
    // Add other CSS properties as needed
  };
  return (
    <div id="page-top">
      <div id="wrapper">
        <SidebarActivity />
      <div id="content-wrapper" className="d-flex flex-column" style={backgroundImageStyle}>
      <Navbar />
        <div id="content">
     
          <div className="container-fluid">
          <span className="h1 text-dark">{userData.campusName} {userData.facultyName}{years}</span>
            <p className="m-2">หน้าสรุปผลรวมการคำนวณก๊าซเรือนกระจก</p>
            <div className="row">

              <div className="col-md-6">
                <div className="card">
                  <div className="card-header  bg-light text-dark">
                  Greenhouse Gas Summary
                  </div>
                  <div className="card-body">
                  <table className="table table-bordered table-striped table-responsive">
                        <thead >
                          <tr className="text-center">
                            <th>Scope</th>
                            <th>Organizational Greenhouse Gas Emissions</th>
                            <th>Ratio Scope 1 and 2</th>
                            <th>Ratio Scope 1 2 and 3</th>
                          </tr>
                        </thead>
                        <tbody className="text-center">
                          {headscope.map((item,index)=>
                          <tr key={index}>
                            <td>{item.scope}</td>
                            <td>{item.ogge}</td>
                            <td>{item.rs12}</td>
                            <td>{item.rs123}</td>
                          </tr>
                          )}
                        </tbody>
                      </table>
                  </div>
                  <div className="card-footer bg-light text-dark">
                  2024
                  </div>
                </div>
              </div>


              <div className="col-md-6">
                <div className="card">
                  <div className="card-header  bg-light text-dark">
                  Greenhouse Gas Summary Chart
                  </div>
                  <div className="card-body">
                
                  <Bar data={data} options={options} />

                  </div>
                  <div className="card-footer bg-light text-dark">
                  2024
                  </div>
                </div>
              </div>



            </div>
          </div>
        </div>
        <Footer />
      </div>
      </div>

      <a className="scroll-to-top rounded" href="#page-top">
  <i className="fas fa-angle-up"></i>
</a>
    <Modal id="logoutModal" title="ออกจากระบบ">
    Select "Logout" below if you are ready to end your current session.
    <div className="modal-footer">
                    <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    <Link className="btn btn-primary" to="/">Logout</Link>
                </div>
    </Modal>
    </div>
  );
}
