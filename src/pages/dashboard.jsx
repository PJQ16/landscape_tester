import React, { useEffect, useState } from 'react';
import Map from '../components/Map';
import axios from 'axios';
import config from '../config';
import BarChart from '../components/Bar';

export default function Dashboard() {
    const [dataScope, setDataScope] = useState([]);

    useEffect(() => {
        fetchDataScope();
    }, []);

    const fetchDataScope = async () => {
        try {
            const res = await axios.get(config.urlApi + '/dataDashboard');
            setDataScope(res.data);
            console.log("Fetched data:", res.data); // เพิ่มการดีบัก
        } catch (e) {
            console.log(e.message);
        }
    };

    useEffect(() => {
        console.log("Updated dataScope:", dataScope); // เพิ่มการดีบัก
    }, [dataScope]);

    return (
        <div>
            <div className="row"></div>
            <div className="row" style={{ marginTop: '30px' }}>
                <div className="col-md-12">
                    <Map />
                </div>
            </div>
            <div className="row" style={{ marginTop: '30px' }}>
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            ภาพรวมการปล่อยก๊าซเรือนกระจก/ปี
                        </div>
                        <div className="card-body">
                            <BarChart dataScope={dataScope} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
