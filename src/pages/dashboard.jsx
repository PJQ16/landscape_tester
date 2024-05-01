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
            

        }catch(e){
            console.log(e.message);
        }
      }

  return (
    <div>
    <div className="row">
     
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
