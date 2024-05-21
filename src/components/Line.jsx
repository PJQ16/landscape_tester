import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const data = {
        labels: ['Year 2565', 'Year 2566', 'Year 2567', 'Year 2568', 'Year 2569', 'Year 2570'],
        datasets: [
          {
            label: 'Dataset 1',
            data: [20, 30, 25, 35, 20, 22],
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
            fill: false
          },
          {
            label: 'Dataset 2',
            data: [25, 35, 30, 40, 39, 21],
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 2,
            fill: false
          },
          {
            label: 'Dataset 3',
            data: [150, 40, 35, 45, 13, 42],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false
          },
          {
            label: 'Dataset 4',
            data: [30, 22, 35, 45, 32, 11],
            borderColor: 'rgba(211, 164, 117, 1)',
            borderWidth: 2,
            fill: false
          },
          {
            label: 'Dataset 5',
            data: [12, 21, 35, 45, 21, 34],
            borderColor: 'rgba(197, 117, 211, 1)',
            borderWidth: 2,
            fill: false
          }
        ]
      };

      const ctx = chartRef.current.getContext('2d');

      new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
          responsive: true,
          scales: {
            x: {
              grid: {
                display: true // เปิดเส้น grid สำหรับแกน x
              },
              ticks: {
                autoSkip: false // แสดงทุกค่าบนแกน x
              }
            },
            y: {
              grid: {
                display: true // เปิดเส้น grid สำหรับแกน y
              },
              ticks: {
                beginAtZero: true // เริ่มต้นที่ศูนย์
              }
            }
          }
        }
      });
    }
  }, []);

  return (
    <div>
      <canvas ref={chartRef} width="800" height="400"></canvas>
    </div>
  );
};

export default LineChart;
