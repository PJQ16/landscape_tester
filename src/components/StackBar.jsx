import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const StackBarChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May'],
      datasets: [
        {
          label: 'Dataset 1',
          data: [12, 19, 3, 5, 2],
          backgroundColor: 'rgba(255, 99, 132, 0.5)'
        },
        {
          label: 'Dataset 2',
          data: [2, 3, 20, 5, 10],
          backgroundColor: 'rgba(54, 162, 235, 0.5)'
        },
        {
          label: 'Dataset 3',
          data: [3, 10, 13, 15, 22],
          backgroundColor: 'rgba(75, 192, 192, 0.5)'
        }
      ]
    };

    const ctx = chartRef.current.getContext('2d');

    new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true
          }
        }
      }
    });
  }, []);

  return (
    <div>
      <canvas ref={chartRef} width="800" height="400"></canvas>
    </div>
  );
};

export default StackBarChart;
