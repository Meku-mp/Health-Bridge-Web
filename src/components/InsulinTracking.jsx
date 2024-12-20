// InsulinTracking.jsx
import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function InsulinTracking({ data }) {
  const [selectedRow, setSelectedRow] = useState(null);

  console.log(data);

  const handleRowClick = (index) => {
    setSelectedRow(index);
  };

  // Helper function to extract numeric values from dose strings
  const extractDoseValue = (dose) => parseInt(dose.replace("UI", ""), 10);

  // Process the data to fit the chart
  const processedData = data.map((item) => ({
    date: new Date(item.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
    MorningDose: item.morningDose,
    AfternoonDose: item.afternoonDose,
    EveningDose: item.eveningDose,
  }));

  // Determine which data to display based on the selected row
  const chartData = {
    labels: ["Morning", "Afternoon", "Evening"],
    datasets: [
      {
        label: "Insulin Dose (UI)",
        data:
          selectedRow !== null
            ? [
                processedData[selectedRow].MorningDose,
                processedData[selectedRow].AfternoonDose,
                processedData[selectedRow].EveningDose,
              ]
            : [0, 0, 0],
        backgroundColor: ["#06b6d4", "#8b5cf6", "#facc15"],
        borderRadius: 5,
        barThickness: 30,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    indexAxis: "y",
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
        <Bar
          data={chartData}
          options={chartOptions}
          className="max-w-[335px] max-h-[241px] lg:-w-[335px] lg:h-[241px]"
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
          <tbody className="border border-[#A1A1AA]">
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
                <td className="border border-gray-300 text-center w-[168px] h-[72px] border-r-0 border-t border-b text-[14px] font-normal">
                  {item.date}
                </td>
                <td className="border border-gray-300 text-center w-[168px] h-[72px] border-l-0 border-r-0 border-t border-b text-[14px] font-normal">
                  {item.MorningDose} UI
                </td>
                <td className="border border-gray-300 text-center w-[168px] h-[72px] border-l-0 border-r-0 border-t border-b text-[14px] font-normal">
                  {item.AfternoonDose} UI
                </td>
                <td className="border border-gray-300 text-center w-[168px] h-[72px] border-l-0 border-t border-b text-[14px] font-normal">
                  {item.EveningDose} UI
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Define PropTypes for better type checking
InsulinTracking.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      MorningDose: PropTypes.string.isRequired,
      AfternoonDose: PropTypes.string.isRequired,
      EveningDose: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      // Add other relevant fields if present
    })
  ).isRequired,
};
