import React, { useState } from "react";
import Swal from "sweetalert2";

export default function Scope2() {
    const [selectActivity, setSelectActivity] = useState(null);
    const [userInput, setUserInput] = useState({
      inputValue: 0,
      calculatedCO2e: 0,
    });
    const [activities, setActivities] = useState([]);
    const headActivity = ['Electricity'];
    const cateScope1 = [
      {
        scope: "scope2",
        Stationary_Combustion: [
          {
            name: "Electricity from PEA",
            lci: "kWh",
            CO2: "0.0000",
            Fossil_CH4: "0.0000",
            CH4: "0.0000",
            N2O: "0.0000",
            SF6: "0.0000",
            NF3: "0.0000",
            HFCs: "0.0000",
            PFCs: "0.0000",
            GWP_HFCs: "0.0000",
            GWP_PFCs: "0.0000",
            kgCO2e: "0.4999",
            sources: "TGO_EF_CFO_Update Apr 2022",
          },
          {
            name: "Electricity from Private Company",
            lci: "kWh",
            CO2: "0.0000",
            Fossil_CH4: "0.0000",
            CH4: "0.0000",
            N2O: "0.0000",
            SF6: "0.0000",
            NF3: "0.0000",
            HFCs: "0.0000",
            PFCs: "0.0000",
            GWP_HFCs: "0.0000",
            GWP_PFCs: "0.0000",
            kgCO2e: "0.0000",
            sources: "TGO_EF_CFO_Update Apr 2022",
          },
          {
            name: "Solar cell",
            lci: "kWh",
            CO2: "2.6987",
            Fossil_CH4: "0.0001",
            CH4: "0.0000",
            N2O: "0.0000",
            SF6: "0.0000",
            NF3: "0.0000",
            HFCs: "0.0000",
            PFCs: "0.0000",
            GWP_HFCs: "0.0000",
            GWP_PFCs: "0.0000",
            kgCO2e: "0.0000",
            sources: "TGO_EF_CFO_Update Apr 2022",
          },
          {
            name: "Wind",
            lci: "kWh",
            CO2: "5.6987",
            Fossil_CH4: "0.0001",
            CH4: "0.0000",
            N2O: "0.0000",
            SF6: "0.0000",
            NF3: "0.0000",
            HFCs: "0.0000",
            PFCs: "0.0000",
            GWP_HFCs: "0.0000",
            GWP_PFCs: "0.0000",
            kgCO2e: "0.0000",
            sources: "TGO_EF_CFO_Update Apr 2022",
          },
        ],
      },
    ];
  
  
    const handleActivityChange = (event) => {
      const selectedActivity = event.target.value;
      const activity = cateScope1[0].Stationary_Combustion.find(
        (activity) => activity.name === selectedActivity
      );
      setSelectActivity(activity);
    };
  
    const handleInputChange = (event) => {
      const value = event.target.value;
      setUserInput((prevUserInput) => {
        const calculatedCO2e =
          value *
          (parseFloat(selectActivity?.kgCO2e || 0))/1000;
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
    };
  
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
    <span className="text-info ps-3">Scope2</span>
    {headActivity.map((activity, index) => (
      <div className="accordion-item" key={index}>
        <h2 className="accordion-header">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#flush-collapse2scope${index}`}
            aria-expanded="false"
            aria-controls={`flush-collapse2scope${index}`}
          >
          {`${activity}`}
          </button>
        </h2>

        <div
          id={`flush-collapse2scope${index}`}
          className="accordion-collapse collapse show"
          data-bs-parent="#accordionFlushExample"
        >
          <div className="accordion-body">
                        <div className="row">
                          <div className="col-md-12">
                            <table className="table table-striped table-bordered table-responsive">
                              <thead>
                                <tr className="text-center">
                                  <th>ลบ</th>
                                  <th>กิจกรรม</th>
                                  <th>หน่วย</th>
                                  <th>ปริมาณ</th>
                                  <th>
                                    EF
                                  </th>
                                  <th>
                                    tCO<sub>2</sub>e/y
                                  </th>
                                  <th>แหล่งอ้างอิง</th>
                                </tr>
                              </thead>
                              <tbody>
                                {activities.map((activity, index) => (
                                  <tr key={index}>
                                    <td>
                                      <button
                                        className="btn btn-danger"
                                        onClick={() => handleRemoveRow(index)}
                                      >
                                        <i className="fa-solid fa-trash"></i>{" "}
                                        ลบ
                                      </button>
                                    </td>
                                    <td>{activity.name}</td>
                                    <td>{activity.lci}</td>
                                    <td>{activity.inputValue}</td>
                                    <td>{activity.kgCO2e}</td>
                                    <td>{activity.calculatedCO2e.toFixed(2)}</td>
                                    <td>{activity.sources}</td>
                                  </tr>
                                ))}
                                <tr>
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
                                      {cateScope1[0].Stationary_Combustion.map(
                                        (activity) => (
                                          <option
                                            key={activity.name}
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
                                 
                                  <td>
                                  <input
                                      type="text"
                                      className="form-control"
                                      value={selectActivity ? selectActivity.kgCO2e : ''}
                                      readOnly
                                    />
                                  </td>
                              
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control "
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
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  ))}
                </div>
  )
}
