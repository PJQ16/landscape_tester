import React, { useEffect,useState } from 'react'
import Map from '../components/Map';
import axios from 'axios';
import config from '../config';
export default function Dashboard() {
    const [dataScope, setDataScope] = useState([]);
    useEffect(() => {
        fetchDataScope();
      }, []);
      const fetchDataScope = async() =>{
        try{
            const res = await axios.get(config.urlApi + '/scope/currentApishow')
            setDataScope(res.data);

        }catch(e){
            console.log(e.message);
        }
      }

  return (
    <div>
    <div className="row">
     {dataScope.map((item, index) => (
        <div key={index} className='col-md-3'>
          <div className="card" style={{ backgroundColor: index % 2 === 0 ? '#9E76B4' : '#B3B476' }}>
            <div className="card-body shadow-sm text-white">
              <i className="fas fa-leaf fa-5x"></i>
              {item.name}  {parseFloat(item.tco2e).toFixed(2)} <span className='fw-bold'>tCO<sub>2</sub>e</span>
            </div>
          </div>
        </div>
      ))}
      </div>
    
  
    <div className="row" style={{marginTop:'30px'}}>
        <div className="col-md-12 ">
                  <Map />
        </div>
    </div>


    <div className="row" style={{marginTop:'30px'}}>
        <div className="col-md-6">
            <div className="card">
                <div className="card-body">
                   Data1
                </div>
            </div>
        </div>
   

        <div className="col-md-6">
            <div className="card">
                <div className="card-body">
                  Data2
                </div>
            </div>
        </div>
    </div>

    
    <div className="row" style={{marginTop:'30px'}}>
        <div className="col-md-4">
            <div className="card">
                <div className="card-body">
                   StackChart
                </div>
            </div>
        </div>


        <div className="col-md-4">
            <div className="card">
                <div className="card-body">
                StackChart
                </div>
            </div>
        </div>
   

        <div className="col-md-4">
            <div className="card">
                <div className="card-body">
                StackChart
                </div>
            </div>
        </div>
    </div>


    <div className="row" style={{marginTop:'30px'}}>
        <div className="col-md-6">
            <div className="card">
                <div className="card-body">
                 
                </div>
            </div>
        </div>
   

        <div className="col-md-6">
            <div className="card">
                <div className="card-body">
                 pie chart
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}
