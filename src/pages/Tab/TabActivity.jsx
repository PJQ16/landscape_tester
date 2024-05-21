import Swal from "sweetalert2";
import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import { useParams } from "react-router-dom";
import Accordion from "../../components/Accordion";
function TabActivity() {
  const [activities, setActivities] = useState([]);
  const [exportSourcesFiles, setExportSourcesFiless] = useState([]);
  const [countAvg, setCountAvg] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchData();
    fetchExportFile();
  }, [id]);

  const fetchData = async() =>{
        try{
          const res = await axios.get(config.urlApi + `/scope/datasocpeTester/${id}`);
          setActivities(res.data);

          const response = await axios.get(config.urlApi + `/dividData/${id}`);
          setCountAvg(response.data);
        }catch(e){
          console.log(e.message);
        }
  }

  const fetchExportFile = async () => {
    try {
      const response = await axios.get(config.urlApi + `/sourcesfile/${id}`);
      setExportSourcesFiless(response.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  const showDataPdf = (exportSourcesFile) => {
    Swal.fire({
      icon: "question",
      title: "เปิดไฟล์",
      text: "ต้องการเปิดไฟล์ใช่หรือไม่",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        window.open(
          `${config.urlApi}/sourcesfile/${exportSourcesFile}`,
          "_blank",
          "noreferrer"
        );
      }
    });
  };
  const calculateEF = (data_scope) => {
    return parseFloat(data_scope.CO2) + parseFloat(data_scope.Fossil_CH4 * 30) + parseFloat(data_scope.CH4 * 28) +  parseFloat(data_scope.N2O * 265) +  parseFloat(data_scope.SF6 * 23500) + parseFloat(data_scope.NF3 * 16100) + parseFloat(data_scope.HFCs * data_scope.GWP_HFCs) + parseFloat(data_scope.PFCs * data_scope.GWP_PFCs) ;
};
  const items = activities.flatMap((activity) =>
  activity.headcategories.map((headCategory, headCategoryIndex) => ({
    title: `${headCategoryIndex + 1}.) ` + headCategory.head_name,
    content: (
      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered">
          <thead>
            <tr className="text-center">
              <th>ชื่อกิจกรรม</th>
              <th>หน่วย</th>
              <th>ผลรวมปริมาณ/ต่อปี</th>
              {activity.id === 1 && (
                <>
                  <th>CO<sub>2</sub></th>
                  <th>Fossil CH<sub>4</sub></th>
                  <th>CH<sub>4</sub></th>
                  <th>N<sub>2</sub>O</th>
                  <th>SF<sub>6</sub></th>
                  <th>NF<sub>3</sub></th>
                  <th>HFC<sub>s</sub></th>
                  <th>PFC<sub>s</sub></th>
                  <th>GWP HFC<sub>s</sub></th>
                  <th>GWP PFC<sub>s</sub></th>
                </>
              )}
              <th>EF</th>
              <th>tCO<sub>2</sub>e/y</th>
              <th>แหล่งอ้างอิง</th>
            </tr>
          </thead>
          <tbody>
            {headCategory.data_scopes.map((data_scope, index) => (
              <tr key={index} className="text-center">
                <td>{data_scope.name}</td>
                <td>{data_scope.lci}</td>
                <td>{data_scope.name ===
                                        "CH4 จากน้ำขังในพื้นที่นา" &&
                                      countAvg !== null &&
                                      countAvg !== 0
                                        ? parseFloat(data_scope.quantity).toFixed(
                                            2
                                          ) / countAvg
                                        : parseFloat(data_scope.quantity).toFixed(
                                            2
                                          )}</td>
                {activity.id === 1 && (
                  <>
                    <td>{data_scope.CO2}</td>
                    <td>{data_scope.Fossil_CH4}</td>
                    <td>{data_scope.CH4}</td>
                    <td>{data_scope.N2O}</td>
                    <td>{data_scope.SF6}</td>
                    <td>{data_scope.NF3}</td>
                    <td>{data_scope.HFCs}</td>
                    <td>{data_scope.PFCs}</td>
                    <td>{data_scope.GWP_HFCs}</td>
                    <td>{data_scope.GWP_PFCs}</td>
                  </>
                )}
                 {activity.id === 1 ?
                <>
                <td>{parseFloat(calculateEF(data_scope).toFixed(4))}</td>
                 <td>{data_scope.name ===
                                        "CH4 จากน้ำขังในพื้นที่นา" &&
                                      countAvg !== null &&
                                      countAvg !== 0
                                        ? parseFloat(((data_scope.quantity * calculateEF(data_scope))/ 1000) / countAvg).toFixed(2)
                                          : parseFloat((data_scope.quantity * calculateEF(data_scope))/ 1000).toFixed(
                                            2
                                          )
                                          }</td> 
                </>
                :
                <>
                <td>{data_scope.EF}</td>
                <td>{parseFloat((data_scope.quantity * data_scope.EF) / 1000).toFixed(2)}</td>
                </>
                 }
                <td>{data_scope.sources}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
    isOpen: false,
  }))
);


  return (
    <div>
      <p className="h3">กิจกรรมการปล่อยก๊าซเรือนกระจก</p>

 <Accordion items={items} />
      <div className="card shadow text-center mt-3 rounded-sm">
        <div
          className="card-body rounded-lg"
          style={{
            background:
              "linear-gradient(90deg, rgb(161, 143, 232) 0%, rgba(61,62,80,1) 50%, rgb(161, 143, 232) 100%)",
            marginTop: "auto",
          }}
        >
          <div className="mb-3">
            {exportSourcesFiles.length === 0 ? (
              <p className="text-center text-white pt-2">
                ไม่มีไฟล์ข้อมูลหลักฐาน
              </p>
            ) : (
              <>
                {exportSourcesFiles.map((exportSourcesFile, index) => (
                  <div key={index}>
                    <button
                      className="btn btn-primary m-3"
                      onClick={() => showDataPdf(exportSourcesFile.file_name)}
                    >
                      หลักฐาน
                    </button>
                    <span className="text-white">
                      {exportSourcesFile.file_name}
                    </span>
                    <hr className="text-white" />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TabActivity;
