// import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function GlucoseLevel() {
  const data = [
    { date: "Dec 07, 23", level: "134 mg/dl", status: "Safe" },
    { date: "Dec 09, 23", level: "70 mg/dl", status: "Safe" },
    { date: "Dec 01, 23", level: "174 mg/dl", status: "Risk" },
    { date: "Dec 01, 23", level: "120 mg/dl", status: "Risk" },
  ];

  const getStatusStyle = (status) => {
    return status === "Safe"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";
  };

  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: "Glucose Level (mg/dl)",
        data: data.map((item) => parseInt(item.level)),
        backgroundColor: data.map((item) =>
          item.status === "Safe" ? "#22c55e" : "#ef4444"
        ),
        borderRadius: 4,
        barThickness: 20,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw} mg/dl`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 12 }, color: "#475467" },
      },
      y: {
        grid: { borderDash: [5, 5], color: "rgba(0, 0, 0, 0.1)" },
        ticks: {
          font: { size: 12 },
          color: "#475467",
          stepSize: 50,
          beginAtZero: true,
        },
        title: {
          display: true,
          text: "mg/dl",
          color: "#475467",
          font: { size: 14 },
        },
      },
    },
  };

  return (
    <div className="flex flex-wrap w-full justify-center items-center gap-[20px]">
      <div className="flex max-w-[520px] max-h-[368px] lg:w-[520px] lg:h-[368px] border rounded-[10px] p-2 items-center justify-center">
        <Line data={chartData} options={chartOptions} className='max-w-[335px] max-h-[241px] lg:-w-[335px] lg:h-[241px]'/>
      </div>
      <div className="max-w-4xl mx-auto p-4">
        <table className="min-w-full border-collapse shadow-sm">
          <thead className="border-none">
            <tr className="bg-gray-100 text-left">
              <th className="border-none text-center w-[168px] h-[44px] font-medium text-[12px] text-[#475467] bg-[#F9FAFB]">
                Date
              </th>
              <th className="border-none text-center w-[168px] h-[44px] font-medium text-[12px] text-[#475467] bg-[#F9FAFB]">
                Level
              </th>
              <th className="border-none text-center w-[168px] h-[44px] font-medium text-[12px] text-[#475467] bg-[#F9FAFB]">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="border border-[#A1A1AA]">
            {data.map((item, index) => (
              <tr key={index} className="even:bg-gray-50">
                <td className="border border-gray-300 text-center w-[168px] h-[72px] border-r-0 border-t border-b text-[14px] font-normal">
                  {item.date}
                </td>
                <td className="border border-gray-300 text-center w-[168px] h-[72px] border-l-0 border-r-0 border-t border-b text-[14px] font-normal">
                  {item.level}
                </td>
                <td className="border border-gray-300 text-center w-[168px] h-[72px] border-l-0 border-t border-b text-[14px] font-medium">
                  <span className={`inline-flex items-center px-3 py-1 rounded-[16px] text-sm font-medium ${getStatusStyle(item.status)}`}>
                    <span className={`w-2 h-2 rounded-full mr-2 ${item.status === "Safe" ? "bg-green-500" : "bg-red-500"}`}></span>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
