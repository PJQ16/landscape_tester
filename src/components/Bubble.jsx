import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BubbleChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const data = {
        datasets: [
          {
            label: 'User 1',
            data: [
              { x: 'Year 2565', y: 20, r: 10 },
              { x: 'Year 2566', y: 30, r: 15 },
              { x: 'Year 2567', y: 25, r: 12 },
              { x: 'Year 2568', y: 35, r: 18 }
            ],
            backgroundColor: 'rgba(255, 99, 132, 0.5)'
          },
          {
            label: 'User 2',
            data: [
              { x: 'Year 2565', y: 25, r: 12 },
              { x: 'Year 2566', y: 35, r: 18 },
              { x: 'Year 2567', y: 30, r: 15 },
              { x: 'Year 2568', y: 40, r: 20 }
            ],
            backgroundColor: 'rgba(54, 162, 235, 0.5)'
          },
          {
            label: 'User 3',
            data: [
              { x: 'Year 2565', y: 30, r: 15 },
              { x: 'Year 2566', y: 40, r: 20 },
              { x: 'Year 2567', y: 35, r: 18 },
              { x: 'Year 2568', y: 45, r: 22 }
            ],
            backgroundColor: 'rgba(75, 192, 192, 0.5)'
          },
          {
            label: 'User 4',
            data: [
              { x: 'Year 2565', y: 35, r: 18 },
              { x: 'Year 2566', y: 45, r: 22 },
              { x: 'Year 2567', y: 40, r: 20 },
              { x: 'Year 2568', y: 50, r: 25 }
            ],
            backgroundColor: 'rgba(255, 206, 86, 0.5)'
          },
          {
            label: 'User 5',
            data: [
              { x: 'Year 2565', y: 40, r: 20 },
              { x: 'Year 2566', y: 50, r: 25 },
              { x: 'Year 2567', y: 45, r: 22 },
              { x: 'Year 2568', y: 55, r: 28 }
            ],
            backgroundColor: 'rgba(153, 102, 255, 0.5)'
          }
        ]
      };

      const ctx = chartRef.current.getContext('2d');

      new Chart(ctx, {
        type: 'bubble',
        data: data,
        options: {
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Year'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Data'
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

export default BubbleChart;
