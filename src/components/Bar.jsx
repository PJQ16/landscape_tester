import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const BarChart = ({ dataScope }) => {
  const chartRef = useRef(null);
  const [myChart, setMyChart] = useState(null);

  useEffect(() => {
    if (chartRef.current && dataScope.length > 0) {
      const years = dataScope.map(item => item.year);
      const scopes = ['scope1', 'scope2', 'scope3', 'separate', 'removal']; // Assuming these are the scope names
      const backgroundColors = [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(153, 102, 255, 0.5)'
      ];
      const borderColors = [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(153, 102, 255, 0.5)'
      ];

      const datasets = scopes.map((scope, index) => {
        const data = dataScope.map(yearData => {
          const scopeData = yearData.scope.find(item => item.scopename === scope);
          return scopeData ? parseFloat(scopeData.tCO2e) : 0;
        });

        return {
          label: scope,
          data: data,
          backgroundColor: backgroundColors[index],
          borderColor: borderColors[index],
          borderRadius: 15,
        };
      });

      const data = {
        labels: years.map(year => `${year + 543}`), // Convert years to Thai Buddhist calendar
        datasets: datasets
      };

      const options = {
        animation: {
          duration: 2000, // ความยาวเวลาของ animation เป็นมิลลิวินาที
          easing: 'easeInOutQuart' // ลักษณะการเคลื่อนไหวของ animation (อาจใช้ easeOutBounce, linear, easeInOutSine, ฯลฯ)
        }
      };

      if (myChart) {
        console.log("Destroying old chart");
        myChart.destroy(); // Destroy the old chart before creating a new one
      }

      const ctx = chartRef.current.getContext('2d');
      const newChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
          responsive: true,
          scales: {
            x: {
              stacked: false, // Disable stacking for x-axis
            },
            y: {
              stacked: false // Disable stacking for y-axis
            }
          }
        }
      });

      setMyChart(newChart); // Save the new chart instance
    }
  }, [dataScope]);

  return (
    <div>
      <canvas ref={chartRef} width="800" height="400"></canvas>
    </div>
  );
};

export default BarChart;
