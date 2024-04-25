import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../config";

export default function Scope1() {
  const [cateDataScope, setCateDataScope] = useState([]);

  useEffect(() => {
    fetchCateDataScope1();
  }, []);

  const saveActivity = async(event) =>{
    Swal.fire({
      icon:'question',
      title:'confirm',
      text:'ต้องการบันทึกข้อมูลกิจกรรมใช่หรือไม่',
      showCancelButton:true
    }).then(res=>{
      if(res.isConfirmed){
        Swal.fire({
          icon:'success',
          title:'Successfully',
          text:'ระบบบันทึกข้อมูลเรียบร้อย',
          timer:1500,
          timerProgressBar:true
        })
      }
    })
  }

  const fetchCateDataScope1 = async () => {
    try {
      const res = await axios.get(config.urlApi + "/scope/apiShowAll");
      setCateDataScope(res.data);
    } catch (e) {
      console.log(e.message);
    }
  };
  

  const Row = ({ activity, scopeName }) => {
  const [calQuantity, setCalQuantity] = useState(0);

    const calculateCO2 = () => {
      if (scopeName === 'scope1') {
        return (activity.EF * calQuantity)/1000;
      } else {
        return (activity.kgCO2e * calQuantity)/1000;
      }
    };

   
    return (
      <tr>
        <td style={{position:'sticky',left:0}}>{activity.name}</td>
        <td>{activity.lci}</td>
        <td>
          <input
            type="number"
            value={calQuantity}
            onChange={(e) => setCalQuantity(e.target.value)}
            style={{border:'0.1px soild black',borderRadius:'25px',padding:'5px',width:'100px'}}
          />
        </td>
        {scopeName === 'scope1' &&
          <>
            <td>{activity.CO2}</td>
            <td>{activity.Fossil_CH4}</td>
            <td>{activity.CH4}</td>
            <td>{activity.N2O}</td>
            <td>{activity.SF6}</td>
            <td>{activity.NF3}</td>
            <td>{activity.HFCs}</td>
            <td>{activity.PFCs}</td>
          </>
        }
        <td>
             {scopeName === 'scope1'
              ? parseFloat(activity.EF).toFixed(4)
              : parseFloat(activity.kgCO2e).toFixed(4)}
        </td>
        <td>{parseFloat(calculateCO2().toFixed(4))}</td>
        <td>{activity.sources}</td>
      </tr>
    );
  };

  return (
    <div className="accordion accordion-flush" id="accordionFlushExample">
      {cateDataScope.map((scope, index) => (
        <div key={index}>
          <span className="ps-3" style={{color:"#9E76B4"}}>{scope.name}</span>
          {scope.headcategories.map((headCategory, headCateId) => (
            <div className="accordion-item" key={headCategory.id}>
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed text-dark"
                
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#flush-collapse${headCategory.id}`}
                  aria-expanded="false"
                  aria-controls={`flush-collapse${headCategory.id}`}
                >
                  {`${headCateId + 1}).${headCategory.head_name}`}
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
                      <table className="table table-striped table-bordered table-responsive shadow-lg">
                        <thead>
                          <tr className="text-center">
                            <th style={{position:'sticky',left:0}}>กิจกรรม</th>
                            <th>หน่วย</th>
                            <th>ปริมาณ / ปี</th>
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
                              </>
                            }
                            <th>EF</th>
                            <th>tCO<sub>2</sub>e</th>
                            <th>แหล่งอ้างอิง</th>
                          </tr>
                        </thead>
                        <tbody>
                          {headCategory.catescopes.map((activity, cateIndex) => (
                            <Row
                              key={cateIndex}
                              activity={activity}
                              scopeName={scope.name}
                            />
                          ))}
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
      <div className="d-flex flex-row-reverse">
        <button className="btn" onClick={saveActivity}  style={{backgroundColor:'#9E76B4',color:'white'}}>
                        บันทึก
                        </button>
      </div>
    </div>
  );
}
