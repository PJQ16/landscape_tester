import React, { useEffect, useState } from 'react';
import DoughnutPieChart from '../../components/DoughtNut';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import Swal from 'sweetalert2';


export default function TabActivitySummary() {
  const { years,id } = useParams();
  const [scopeData, setScopeData] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    fetchDataScope();
  }, []);

  const fetchDataScope = async () => {
    try {
      const res = await axios.get(config.urlApi + `/datascope/summary/${years - 543}/${id}`);
      setScopeData(res.data);

      const total = res.data.reduce((acc, item) => acc + parseFloat(item.tco2e), 0);
      setTotalValue(total);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'error',
        text: err.message
      });
    }
  }


  const percentages = scopeData.length > 0 ? 
    scopeData.map(item => ({
      label: item.name,
      percentage: (parseFloat(item.tco2e) / totalValue * 100).toFixed(2)
    })) : [];

  return (
    <div className='d-flex w-100'>
        <div className="card w-50 p-2">
          <div className="card-header">
          สรุปผลการคำนวณ รูปแบบ Doughnut Pie
          </div>
          <div className="card-body" style={{marginLeft:'15%'}}>
            <DoughnutPieChart id={id} years={years} scopeData={scopeData} />
          </div>
        </div>
        <div className="card w-50 p-2">
          <div className="card-header">
          สรุปผลการคำนวณ ตาราง
          </div>
          <div className="card-body">
          <table className="table table-bordered table-striped table-hover">
                  <thead>
                    <tr className='text-center'>
                      <th>ขอบเขต</th>
                      <th>Organization Greenhouse Gas Emissions</th>
                      <th>Ratio Scope 1 and 2</th>
                      <th>Ratio Scope 1 and 2 3</th>
                    </tr>
                  </thead>
                  <tbody>
                  {scopeData.map((item, index) =>
                    <tr className='text-center' key={index}>
                      <td>{item.name}</td>
                      <td>{parseFloat(item.tco2e).toFixed(2)}</td>
                      <td>
                      {item.name === 'scope1' || item.name === 'scope2' ? 
  ((isNaN(percentages.find(p => p.label === item.name)?.percentage) ? '0.00' : percentages.find(p => p.label === item.name)?.percentage) || '0.00') 
  : '-'
}
                          </td>
                      <td>
                      {(isNaN(percentages.find(p => p.label === item.name)?.percentage) ? '0.00' : percentages.find(p => p.label === item.name)?.percentage) || '0.00'}

                      </td>
                    </tr>
                  )}
                    <tr className='text-center'>
                    <td>ผลรวม Scope 1 & 2</td>
                    <td>{(scopeData.reduce((acc, item) => {
                      if (item.name !== 'scope3') {
                        return acc + parseFloat(item.tco2e);
                      }
                      return acc;
                    }, 0)).toFixed(2)}</td>
                    <td>100</td>
                    <td>-</td>
                  </tr>
                  <tr className='text-center'>
                    <td>ผลรวม Scope 1 & 2 & 3</td>
                    <td>{(scopeData.reduce((acc, item) => acc + parseFloat(item.tco2e), 0)).toFixed(2)}</td>
                    <td>-</td>
                    <td>100</td>
                  </tr>
                </tbody>

                </table>
          </div>
        </div>
      </div>
  )
}
