import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const data = {
        labels: ['Year 2565', 'Year 2566', 'Year 2567', 'Year 2568'],
        datasets: [
          {
            label: 'Dataset 1',
            data: [20, 30, 25, 35],
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(255, 206, 86, 0.5)'
            ]
          }
        ]
      };

      const ctx = chartRef.current.getContext('2d');

      new Chart(ctx, {
        type: 'pie',
        data: data,
        options: {
          responsive: true,
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

export default PieChart;
