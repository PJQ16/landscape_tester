import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const DoughnutPieChart = ({ id, years, scopeData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && scopeData.length > 0) {
      const labels = scopeData.map(item => item.name);
      const data = scopeData.map(item => item.tco2e);

      const chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Data',
            data: data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(193, 117, 26, 0.5)'
            ]
          }
        ]
      };

      const ctx = chartRef.current.getContext('2d');

      new Chart(ctx, {
        type: 'doughnut',
        data: chartData,
        options: {
          responsive: true,
          cutoutPercentage: 20,
          spacing: 10,
          borderRadius: 25,
          plugins: {
            datalabels: {
              color: '#fff',
              formatter: (value, ctx) => {
                let sum = ctx.dataset.data.reduce((acc, data) => acc + data, 0);
                let percentage = ((value * 100) / sum).toFixed(2) + "%";
                return percentage;
              },
              font: {
                size: '14'
              },
              anchor: 'end', // ตำแหน่งของข้อความ (start, center, end)
              align: 'start', // การจัดวางข้อความ (start, center, end)
              offset: 5 // ระยะห่างระหว่างข้อความกับกล่อง
            }
          }
        }
      });
    }
  }, [scopeData]);

  const chartContainerStyle = {
    width: '500px',
    height: '500px',
    position: 'relative'
  };

  const canvasStyle = {
    width: '100%',
    height: '100%'
  };

  return (
    <div style={chartContainerStyle}>
      <canvas ref={chartRef} style={canvasStyle}></canvas>
    </div>
  );
};

export default DoughnutPieChart;
