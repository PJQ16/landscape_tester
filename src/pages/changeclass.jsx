import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../config";

export default function Scope1() {
  const [selectActivity, setSelectActivity] = useState(null);
  const [userInput, setUserInput] = useState({
    inputValue: 0,
    calculatedCO2e: 0,
  });

  const [activities, setActivities] = useState([]);
  const [headActivity, setHeadActivity] = useState([]);
  const [cateDataScope, setCateDataScope] = useState([]);


  useEffect(() => {
    fetchHeadDataScope1();
    fetchCateDataScope1();
  }, []);

  const fetchHeadDataScope1 = async () => {
    try {
      const res = await axios.get(config.urlApi + "/scope/apiHeadCategoryData1");
      setHeadActivity(res.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  const fetchCateDataScope1 = async () => {
    try {
      const res = await axios.get(config.urlApi + "/scope/apiShowAll");
      setCateDataScope(res.data);
    } catch (e) {
      console.log(e.message);
    }
  };

 /*  const handleActivityChange = (event) => {
    const selectedActivity = event.target.value;
    const activity = cateDataScope.find(
      (activity) => activity.name === selectedActivity
    );
    setSelectActivity(activity);
    // นับข้อมูลที่มีในตาราง
    const count = activities.filter((act) => act.name === selectedActivity).length;
    console.log(`จำนวน ${selectedActivity}: ${count}`);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setUserInput((prevUserInput) => {
      const calculatedCO2e =
        value * (parseFloat(selectActivity?.EF || 0)) / 1000;
      return {
        ...prevUserInput,
        inputValue: value,
        calculatedCO2e: isNaN(calculatedCO2e) ? 0 : calculatedCO2e,
      };
    });
  };

  const handleAddRow = () => {
    if (selectActivity) {
      const newActivity = {
        ...selectActivity,
        inputValue: userInput.inputValue,
        calculatedCO2e: userInput.calculatedCO2e,
      };
      setActivities((prevActivities) => [...prevActivities, newActivity]);
    
      setSelectActivity(null);
      setUserInput({
        inputValue: 0,
        calculatedCO2e: 0,
      });
    }
  }; */

  const handleRemoveRow = (index) => {
    Swal.fire({
      title:'Sure',
      icon:'question',
      text:'คุณแน่ใจ หรือ ไม่ที่จะลบข้อมูลกิจกรรมนี้',
      showConfirmButton:true,
      showCancelButton:true
    }).then(res =>{
      if(res.isConfirmed){
        setActivities((prevActivities) =>
        prevActivities.filter((_, i) => i !== index)
      );
      }
    })
  };
  return (
    <div className="accordion accordion-flush" id="accordionFlushExample">
      {cateDataScope.map((scope, index) => (
        <div key={index}>
          <span className="text-info ps-3">{scope.name}</span>
          {scope.headcategories.map((headCategory,headCateId) => (
            <div className="accordion-item" key={headCategory.id}>
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#flush-collapse${headCategory.id}`}
                  aria-expanded="false"
                  aria-controls={`flush-collapse${headCategory.id}`}
                >
                  {`${headCateId +1  }).${headCategory.head_name}`}
                </button>
              </h2>
              <div
                id={`flush-collapse${headCategory.id}`}
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  <div className="row">
                    <div className="col-md-12">
                      <table className="table table-striped table-bordered table-responsive">
                        <thead>
                          <tr className="text-center">
                           {/*  <th>ลบ</th> */}
                            <th>กิจกรรม</th>
                            <th>หน่วย</th>
                            <th>ปริมาณ</th>
                            {scope.name === 'scope1' &&
                            <>
                              <th>CO<sub>2</sub></th>
                              <th>Fossil CH<sub>4</sub></th>
                              <th>CH<sub>4</sub></th>
                              <th>N<sub>2</sub>O</th>
                              <th>SF<sub>6</sub></th>
                              <th>NF<sub>3</sub></th>
                              <th>HFC<sub>s</sub></th>
                              <th>PFC<sub>s</sub></th>
                              <th>GWP_HFC<sub>s</sub></th>
                              <th>GWP_PFC<sub>s</sub></th>
                              </>
                          }
                            <th>
                               EF
                            </th>
                            <th>
                                tCO<sub>2</sub>e
                            </th>
                            <th>
                                แหล่งอ้างอิง
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {headCategory.catescopes.map((activity, cateIndex) => (
                            <tr key={cateIndex}>
                              {/* <td>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => handleRemoveRow(cateIndex)}
                                >
                                  <i className="fa-solid fa-trash"></i> ลบ
                                </button>
                              </td> */}
                              <td>{activity.name}</td>
                              <td>{activity.lci}</td>
                              <td><input type="number" className="form-control" /></td>
                              {scope.name === 'scope1' &&
                            <>
                              <td>{activity.CO2}</td>
                              <td>{activity.Fossil_CH4}</td>
                              <td>{activity.CH4}</td>
                              <td>{activity.N2O}</td>
                              <td>{activity.SF6}</td>
                              <td>{activity.NF3}</td>
                              <td>{activity.HFCs}</td>
                              <td>{activity.PFCs}</td>
                              <td>{activity.GWP_HFCs}</td>
                              <td>{activity.GWP_PFCs}</td>
                              </>
                              }
                              {scope.name === 'scope1'? 
                              <td>{activity.EF}</td>
                              : 
                              <td>{activity.kgCO2e}</td>
                               }
                              <td>{activity.calculatedCO2e}</td>
                              <td>{activity.sources}</td>
                            </tr>
                          ))}
                        {/*    <tr >
                                  <td>
                                  <button
                                        className="btn btn-secondary text-white"
                                        onClick={handleAddRow}
                                      >
                                        <i className="fa-solid fa-plus"></i> เพิ่ม
                                      </button>
                                  </td>
                                  <td>
                                    <select
                                      name="activity"
                                      id="activity"
                                      className="form-control"
                                      value={selectActivity ? selectActivity.name : ""}
                                      onChange={handleActivityChange}
                                    >
                                      <option value="">เลือก</option>
                                      {headCategory.catescopes.map((activity, cateIndex) => (
                                          <option
                                            key={index}
                                            value={activity.name}
                                          >
                                            {activity.name}
                                          </option>
                                        )
                                      )}
                                    </select>
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={selectActivity ? selectActivity.lci : ""}
                                      readOnly
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="number"
                                      className="form-control"
                                      value={userInput.inputValue}
                                      onChange={handleInputChange}
                                    />
                                  </td>
                                  {scope.name === 'scope1' && <>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={selectActivity ? selectActivity.CO2 : ""}
                                      readOnly
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={
                                        selectActivity ? selectActivity.Fossil_CH4 : ""
                                      }
                                      readOnly
                                    />
                                  </td>
                                  <td><input
                                      type="text"
                                      className="form-control"
                                      value={
                                        selectActivity ? selectActivity.CH4 : ""
                                      }
                                      readOnly
                                    /></td>

                                    <td><input
                                      type="text"
                                      className="form-control"
                                      value={
                                        selectActivity ? selectActivity.N2O : ""
                                      }
                                      readOnly
                                    /></td>

                                  <td><input
                                      type="text"
                                      className="form-control"
                                      value={
                                        selectActivity ? selectActivity.SF6 : ""
                                      }
                                      readOnly
                                    /></td>
                                  <td>
                                  <input
                                      type="text"
                                      className="form-control"
                                      value={
                                        selectActivity ? selectActivity.NF3 : ""
                                      }
                                      readOnly
                                    />
                                  </td>
                                  <td>
                                  <input
                                      type="text"
                                      className="form-control"
                                      value={
                                        selectActivity ? selectActivity.HFCs : ""
                                      }
                                      readOnly
                                    />
                                  </td>
                                  <td>
                                  <input
                                      type="text"
                                      className="form-control"
                                      value={
                                        selectActivity ? selectActivity.PFCs : ""
                                      }
                                      readOnly
                                    />
                                  </td>
                                  <td>
                                  <input
                                      type="text"
                                      className="form-control"
                                      value={
                                        selectActivity ? selectActivity.GWP_HFCs : ""
                                      }
                                      readOnly
                                    />
                                  </td>
                                  <td>
                                  <input
                                      type="text"
                                      className="form-control"
                                      value={
                                        selectActivity ? selectActivity.GWP_PFCs : ""
                                      }
                                      readOnly
                                    />
                                  </td>
                                  </>
                                  }
                                  {scope.name === 'scope1'
                                  ?
                                  <td>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={selectActivity ? parseFloat(selectActivity.EF).toFixed(4) : ""}
                                        readOnly
                                      />
                                    </td>
                                  :
                                  <td>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={selectActivity ? parseFloat(selectActivity.kgCO2e).toFixed(4) : ""}
                                        readOnly
                                      />
                                    </td>
                                  }
                                    
              
                                                                
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={userInput.calculatedCO2e.toFixed(2)}
                                      readOnly
                                    />
                                  </td>


                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={
                                        selectActivity ? selectActivity.sources : ""
                                      }
                                      readOnly
                                    />
                                  </td>
                                </tr> */}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
