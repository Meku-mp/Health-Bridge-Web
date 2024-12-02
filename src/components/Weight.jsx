// import React from 'react'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Weight() {

  const data = [
    { date: "January 2024", Weight: "50"},
    { date: "February 2024", Weight: "55"},
    { date: "April 2024", Weight: "60" },
    { date: "May 2024", Weight: "63" },
  ];

   // Prepare the data for the graph
   const chartData = {
    labels: data.map(item => item.date),
    datasets: [
      {
        label: 'Weight (kg)',
        data: data.map(item => item.Weight),
        borderColor: '#22c55e', // Green color for the line
        backgroundColor: 'rgba(34, 197, 94, 0.1)', // Light green for fill
        pointBackgroundColor: '#22c55e',
        pointBorderColor: '#ffffff',
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: true,
        tension: 0.4, // Smooth curve effect
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      title: {
        display: false, // No chart title
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hide vertical grid lines
        },
      },
      y: {
        grid: {
          borderDash: [5, 5], // Dotted horizontal grid lines
          color: 'rgba(0,0,0,0.1)', // Light grid line color
        },
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };


  return (
    <div className="flex flex-wrap w-full justify-center items-center gap-[20px]">
      <div className="flex max-w-[520px] max-h-[368px] lg:w-[520px] lg:h-[368px] border rounded-[10px] p-2 items-center justify-center">
        <Line data={chartData} options={options} className='max-w-[335px] max-h-[241px] lg:-w-[335px] lg:h-[241px]'/>
      </div>
      <div className="max-w-4xl mx-auto p-4">
        <table className="min-w-full border-collapse shadow-sm">
          <thead className="border-none">
            <tr className="bg-gray-100 text-left">
              <th className="border-none text-center w-[168px] h-[44px] font-medium text-[12px] text-[#475467] bg-[#F9FAFB]">
                Date
              </th>
              <th className="border-none text-center w-[168px] h-[44px] font-medium text-[12px] text-[#475467] bg-[#F9FAFB]">
                Weight
              </th>
            </tr>
          </thead>
          <tbody className="border border-[#A1A1AA] ">
            {data.map((item, index) => (
              <tr key={index} className="even:bg-gray-50">
                <td className="border border-gray-300 text-center w-[168px] h-[72px]  border-r-0 border-t border-b text-[14px] font-normal">
                  {item.date}
                </td>
                <td className="border border-gray-300 text-center w-[168px] h-[72px] border-l-0  border-t border-b text-[14px] font-normal">
                  {item.Weight}kg
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
