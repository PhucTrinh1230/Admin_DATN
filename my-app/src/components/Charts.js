import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
);

const Charts = () => {
  const barData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Dataset 1',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  };

  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Dataset 1',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  };

  const pieData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="container-fluid pt-4 px-4">
      <div className="row g-4">
        <div className="col-sm-12 col-xl-6">
          <div className="bg-secondary text-center rounded p-4">
            <h6 className="mb-0">Bar Chart</h6>
            <Bar
              data={barData}
              options={{
                title: {
                  display: true,
                  text: 'Average Rainfall per month',
                  fontSize: 20
                },
                legend: {
                  display: true,
                  position: 'right'
                }
              }}
            />
          </div>
        </div>
        <div className="col-sm-12 col-xl-6">
          <div className="bg-secondary text-center rounded p-4">
            <h6 className="mb-0">Line Chart</h6>
            <Line
              data={lineData}
              options={{
                title: {
                  display: true,
                  text: 'Average Rainfall per month',
                  fontSize: 20
                },
                legend: {
                  display: true,
                  position: 'right'
                }
              }}
            />
          </div>
        </div>
        <div className="col-sm-12 col-xl-6">
          <div className="bg-secondary text-center rounded p-4">
            <h6 className="mb-0">Pie Chart</h6>
            <Pie
              data={pieData}
              options={{
                title: {
                  display: true,
                  text: 'Average Rainfall per month',
                  fontSize: 20
                },
                legend: {
                  display: true,
                  position: 'right'
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
