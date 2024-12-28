// import React from 'react'
import { Line } from "react-chartjs-2";
import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import PropTypes from "prop-types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Urination({ data }) {
  const processedData = data.map((item) => ({
    date: new Date(item.createdAt).toLocaleDateString(),
    Morning: item.morning,
    Afternoon: item.afternoon,
    Evening: item.evening,
    Night: item.night,
  }));

  const [selectedRow, setSelectedRow] = useState(0);

  const handleRowClick = (index) => {
    setSelectedRow(index);
  };

  const extractNumber = (times) => parseInt(times);

  // Prepare the data for the graph, filter based on the selected row
  const chartData = {
    labels: ["Morning", "Afternoon", "Evening", "Night"],
    datasets:
      selectedRow !== null
        ? [
            {
              label: processedData[selectedRow].date,
              data: [
                extractNumber(processedData[selectedRow].Morning),
                extractNumber(processedData[selectedRow].Afternoon),
                extractNumber(processedData[selectedRow].Evening),
                extractNumber(processedData[selectedRow].Night),
              ],
              borderColor: "#22c55e", // You can set a specific color for selected data
              backgroundColor: "rgba(34, 197, 94, 0.1)",
              pointBackgroundColor: "#22c55e",
              pointBorderColor: "#ffffff",
              pointRadius: 5,
              pointHoverRadius: 7,
              fill: true,
              tension: 0.4,
            },
          ]
        : [], // If no row is selected, show no data
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          borderDash: [5, 5],
          color: "rgba(0,0,0,0.1)",
        },
        ticks: {
          beginAtZero: true,
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="flex flex-wrap w-full justify-center items-center gap-[20px]">
      <div className="w-[520px] h-[368px] border rounded-[10px] p-20 items-center">
        <Line
          data={chartData}
          options={options}
          className="w-[335px] h-[241px]  mt-[20px]"
        />
      </div>
      <div className="max-w-4xl mx-auto p-4">
        <table className="min-w-full border-collapse shadow-sm">
          <thead className="border-none">
            <tr className="bg-gray-100 text-left">
              <th className="border-none text-center w-[168px] h-[44px] font-medium text-[12px] text-[#475467] bg-[#F9FAFB]">
                Date
              </th>
              <th className="border-none text-center w-[168px] h-[44px] font-medium text-[12px] text-[#475467] bg-[#F9FAFB]">
                Morning
              </th>
              <th className="border-none text-center w-[168px] h-[44px] font-medium text-[12px] text-[#475467] bg-[#F9FAFB]">
                Afternoon
              </th>
              <th className="border-none text-center w-[168px] h-[44px] font-medium text-[12px] text-[#475467] bg-[#F9FAFB]">
                Evening
              </th>
              <th className="border-none text-center w-[168px] h-[44px] font-medium text-[12px] text-[#475467] bg-[#F9FAFB]">
                Night
              </th>
            </tr>
          </thead>
          <tbody className="border border-[#A1A1AA] ">
            {processedData.map((item, index) => (
              <tr
                key={index}
                onClick={() => handleRowClick(index)}
                className={`cursor-pointer ${
                  selectedRow === index
                    ? "bg-[#1232584D] text-[#475467]"
                    : "bg-white"
                }`}
              >
                <td className="border border-gray-300 text-center w-[168px] h-[72px]  border-r-0 border-t border-b text-[14px] font-normal">
                  {item.date}
                </td>
                <td className="border border-gray-300 text-center w-[168px] h-[72px] border-l-0 border-r-0 border-t border-b text-[14px] font-normal">
                  {item.Morning}
                </td>
                <td className="border border-gray-300 text-center w-[168px] h-[72px] border-l-0 border-r-0 border-t border-b text-[14px] font-normal">
                  {item.Afternoon}
                </td>
                <td className="border border-gray-300 text-center w-[168px] h-[72px] border-r-0 border-l-0 border-t border-b text-[14px] font-normal">
                  {item.Evening}
                </td>
                <td className="border border-gray-300 text-center w-[168px] h-[72px] border-l-0 border-t border-b text-[14px] font-normal">
                  {item.Night}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

Urination.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      Morning: PropTypes.string,
      Afternoon: PropTypes.string,
      Evening: PropTypes.string,
      Night: PropTypes.string,
    })
  ),
};
