// Weight.jsx
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

export default function Weight({ data }) {
  // Process the data to fit the chart
  const processedData = data.map((item) => ({
    date: new Date(item.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
    weight: parseInt(item.weight, 10),
  }));

  const chartData = {
    labels: processedData.map((item) => item.date),
    datasets: [
      {
        label: "Weight (kg)",
        data: processedData.map((item) => item.weight),
        borderColor: "#22c55e",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        pointBackgroundColor: "#22c55e",
        pointBorderColor: "#ffffff",
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
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
        },
      },
    },
  };

  return (
    <div className="flex flex-wrap w-full justify-center items-center gap-[20px]">
      <div className="flex max-w-[520px] max-h-[368px] lg:w-[520px] lg:h-[368px] border rounded-[10px] p-2 items-center justify-center">
        <Line
          data={chartData}
          options={options}
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
                Weight
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
                  {item.weight} kg
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
Weight.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      weight: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      // Add other relevant fields if present
    })
  ).isRequired,
};
