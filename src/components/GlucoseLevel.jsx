// GlucoseLevel.jsx
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function GlucoseLevel({ data }) {
  // Process the data to fit the chart
  const processedData = data.map((item) => ({
    date: new Date(item.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
    glucoseLevel: parseInt(item.glucoseLevel, 10),
    status: item.level, // Assuming 'level' indicates status
  }));

  const chartData = {
    labels: processedData.map((item) => item.date),
    datasets: [
      {
        label: "Glucose Level (mg/dl)",
        data: processedData.map((item) => item.glucoseLevel),
        backgroundColor: processedData.map((item) =>
          item.status === "Normal" || item.status === "Safe"
            ? "#22c55e"
            : "#ef4444"
        ),
        borderColor: "#3b82f6",
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        pointBackgroundColor: processedData.map((item) =>
          item.status === "Normal" || item.status === "Safe"
            ? "#22c55e"
            : "#ef4444"
        ),
        pointBorderColor: "#ffffff",
        pointRadius: 5,
        pointHoverRadius: 7,
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
        <Line
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
                Glucose Level
              </th>
              <th className="border-none text-center w-[168px] h-[44px] font-medium text-[12px] text-[#475467] bg-[#F9FAFB]">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="border border-[#A1A1AA]">
            {processedData.map((item, index) => (
              <tr key={index} className="even:bg-gray-50">
                <td className="border border-gray-300 text-center w-[168px] h-[72px] border-r-0 border-t border-b text-[14px] font-normal">
                  {item.date}
                </td>
                <td className="border border-gray-300 text-center w-[168px] h-[72px] border-l-0 border-r-0 border-t border-b text-[14px] font-normal">
                  {item.glucoseLevel} mg/dl
                </td>
                <td className="border border-gray-300 text-center w-[168px] h-[72px] border-l-0 border-t border-b text-[14px] font-medium">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-[16px] text-sm font-medium ${
                      item.status === "Normal" || item.status === "Safe"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full mr-2 ${
                        item.status === "Normal" || item.status === "Safe"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    ></span>
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

// Define PropTypes for better type checking
GlucoseLevel.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      level: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      suggestedAction: PropTypes.string.isRequired,
      risk: PropTypes.string.isRequired,
      glucoseLevel: PropTypes.string.isRequired,
    })
  ).isRequired,
};
