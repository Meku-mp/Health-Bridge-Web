// Import necessary Chart.js components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { useState } from "react";
import { Bar } from "react-chartjs-2";

// Register the Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function InsulinTracking() {
  const data = [
    { date: "Dec 07, 23", MorningDose: "20UI", AfternoonDose: "15UI", EveningDose: "25UI" },
    { date: "Dec 08, 23", MorningDose: "22UI", AfternoonDose: "18UI", EveningDose: "20UI" },
    { date: "Dec 09, 23", MorningDose: "18UI", AfternoonDose: "16UI", EveningDose: "24UI" },
    { date: "Dec 10, 23", MorningDose: "25UI", AfternoonDose: "20UI", EveningDose: "30UI" },
  ];

  const [selectedRow, setSelectedRow] = useState(0);

  const handleRowClick = (index) => {
    setSelectedRow(index);
  };

  // Helper function to extract numeric values from dose strings
  const extractDoseValue = (dose) => parseInt(dose.replace("UI", ""), 10);

  // Chart Data
  const chartData = {
    labels: ["Morning", "Afternoon", "Evening"],
    datasets: [
      {
        label: "UI",
        data: selectedRow !== null
          ? [
              extractDoseValue(data[selectedRow].MorningDose),
              extractDoseValue(data[selectedRow].AfternoonDose),
              extractDoseValue(data[selectedRow].EveningDose),
            ]
          : [0, 0, 0], // Default data if no row is selected
        backgroundColor: ["#06b6d4", "#8b5cf6", "#facc15"], // Bar colors
        borderRadius: 5,
        barThickness: 30,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    indexAxis: "y", // Makes the chart horizontal
    scales: {
      x: {
        ticks: { beginAtZero: true },
        grid: { display: false },
      },
      y: {
        grid: { display: false },
        ticks: { font: { size: 14 }, color: "#475467" },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw} UI`,
        },
      },
    },
  };

  return (
    <div className="flex flex-wrap w-full justify-center items-center gap-[20px]">
      <div className="flex max-w-[520px] max-h-[368px] lg:w-[520px] lg:h-[368px] border rounded-[10px] p-2 items-center justify-center">
            <Bar data={chartData} options={chartOptions} className='max-w-[335px] max-h-[241px] lg:-w-[335px] lg:h-[241px]'/>
      </div>
      <div className="max-w-4xl mx-auto p-4">
        <table className="min-w-full border-collapse shadow-sm">
          <thead className="border-none">
            <tr className="bg-gray-100 text-left">
              <th className="border-none text-center w-[168px] h-[44px] font-medium text-[12px] text-[#475467] bg-[#F9FAFB]">
                Date
              </th>
              <th className="border-none text-center w-[168px] h-[44px] font-medium text-[12px] text-[#475467] bg-[#F9FAFB]">
                Morning Dose
              </th>
              <th className="border-none text-center w-[168px] h-[44px] font-medium text-[12px] text-[#475467] bg-[#F9FAFB]">
                Afternoon Dose
              </th>
              <th className="border-none text-center w-[168px] h-[44px] font-medium text-[12px] text-[#475467] bg-[#F9FAFB]">
                Evening Dose
              </th>
            </tr>
          </thead>
          <tbody className="border border-[#A1A1AA] ">
            {data.map((item, index) => (
              <tr
                key={index}
                onClick={() => handleRowClick(index)}
                className={`cursor-pointer  ${
                  selectedRow === index ? "bg-[#1232584D] text-[#475467]" : "bg-white"
                }`}
              >
                <td className="border border-gray-300 text-center w-[168px] h-[72px] border-r-0 border-t border-b text-[14px] font-normal">
                  {item.date}
                </td>
                <td className="border border-gray-300 text-center w-[168px] h-[72px] border-l-0 border-r-0 border-t border-b text-[14px] font-normal">
                  {item.MorningDose}
                </td>
                <td className="border border-gray-300 text-center w-[168px] h-[72px] border-l-0 border-r-0 border-t border-b text-[14px] font-normal">
                  {item.AfternoonDose}
                </td>
                <td className="border border-gray-300 text-center w-[168px] h-[72px] border-l-0 border-t border-b text-[14px] font-normal">
                  {item.EveningDose}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
