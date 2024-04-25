import React from 'react';
import { Doughnut } from 'react-chartjs-2';

export default function DoughnutChart() {
  const data = {
    labels: ['Category A', 'Category B', 'Category C'],
    datasets: [
      {
        data: [300, 200, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const options = {
    cutout: '70%', // ค่าตัวเลขหรือเปอร์เซ็นต์ที่ต้องการตัดออก
    maintainAspectRatio: false, // เพื่อให้พื้นที่ที่ให้กับ chart ปรับตามขนาดของ container
  };

  return (
    <Doughnut
      data={data}
      options={options}
    />
  );
}
