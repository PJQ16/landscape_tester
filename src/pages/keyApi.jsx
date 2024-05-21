import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Pages from "../components/Pages";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../config";


function KeyAPI() {
    const [datas,setData] =  useState([]);
    const [apiKey,setApiKey] = useState('');

    useEffect(()=>{
        fetchData();
    },[])

    const fetchData = async() =>{
        try{
            const res = await axios.get(config.urlApi + `/googlemapkey`);
            setData(res.data);
        }catch(e){
            Swal.fire({
                icon:'error',
                title:'error',
                text:e.message
            })
        }
    }

  
    const handdlerAddKeyAPI = async(e) =>{
        try{
            e.preventDefault();
            
          const res = await  Swal.fire({
                icon:'question',
                title:'คำถาม',
                text:'ต้องการเพิ่ม Key API ใข่หรือไม่',
                showCancelButton:true
            })

            if(res.isConfirmed){
                await  Swal.fire({
                    icon:'success',
                    title:'สำเร็จ',
                    text:'เพิ่มข้อมูลสำเร็จ',
                })
                const payload = {
                    id:apiKey
                }

                console.log(payload);
    
                await axios.post(config.urlApi + `/getKeymap`,payload);
    
                setApiKey('');
                fetchData(); 
            }
        }catch(e){
            Swal.fire({
                icon:'error',
                title:'error',
                text:e.message
            })
        }
    }

    const setDataKey = () =>{
        setApiKey('');
    }

    const handlerRemove = async(item) =>{
        try{
            const res = await Swal.fire({
                icon:'question',
                title:'คำถาม',
                text:'คุณแน่ใจหรือไม่ที่จะลบข้อมูล',
                showCancelButton:true
            })
            if(res.isConfirmed){
                await Swal.fire({
                    icon:'success',
                    title:'สำเร็จ',
                    text:'ลบข้อมูลสำเร็จ'
                })
                await axios.delete(config.urlApi + `/deleteKeymap/${item.id}`);
                fetchData();
            }
               
        }catch(e){
            Swal.fire({
                icon:'error',
                title:'error',
                text:e.message
            })
        }
    }

  return (
    <div>
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <Navbar />
          <div id="content">
            <div className="container-fluid">
              <Pages namepage="จัดการ Google Map Api">
                <div className="row">
                <div className="col-md-2">
                <button className="btn btn-primary" onClick={setDataKey} id="closeModal" data-toggle='modal' data-target='#modalAddApi'><i className="fa-solid fa-key"></i> เพิ่มKey API</button>
                </div>
                </div>
                <div className="table-responsive">
                    <table className="table table-striped table-bordered mt-2">
                        <thead className="text-center">
                            <tr>
                                <th>ลำดับ</th>
                                <th>Key API</th>
                                <th>จัดการ</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {datas.map((item,index)=>
                            <tr key={index}>
                                <td>{index +1}</td>
                                <td>{item.id}</td>
                                <td>
                            <div className="btn-group">
                              <button
                                type="button"
                                className="btn btn-secondary dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              ></button>
                              <ul className="dropdown-menu">
                                <li>
                                  <a className="dropdown-item" onClick={(e) => handlerRemove(item)} href="#">
                                    <i className="fa-solid fa-trash"></i> ลบ
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </td>
                            </tr>
                            )}

                        </tbody>
                        <tfoot className="text-center">
                            <tr>
                                <th>ลำดับ</th>
                                <th>Key API</th>
                                <th>จัดการ</th>
                            </tr>
                        </tfoot>
                    </table>

                </div>
               
              </Pages>
            </div>
          </div>
          <Footer />
        </div>
      </div>

      <Link className="scroll-to-top rounded" to="#page-top">
        <i className="fas fa-angle-up"></i>
      </Link>
      <Modal id="modalAddApi" title="เพิ่ม Google Map Key API">
        <form onSubmit={handdlerAddKeyAPI}>
        <div className="row">
            <div className="col-md-12">
                <label><i className="fa-solid fa-key"></i> Key API</label>
                <input type="text" className="form-control" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
            </div>
        </div>
        {apiKey === ''
        ?
        <button className="btn btn-primary mt-2" disabled><i className="fa-solid fa-lock"></i> เพิ่ม</button>
        :
        <button className="btn btn-primary mt-2"><i className="fa-solid fa-lock"></i> เพิ่ม</button>
        
        }
        </form>
      </Modal>
    </div>
  );
}

export default KeyAPI;
