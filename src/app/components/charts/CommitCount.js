import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const CommitCount = ({ data }) => {
  const allLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const filteredData = data
    .map((value, index) =>
      value !== 0 ? { label: allLabels[index], data: value } : null
    )
    .filter((item) => item !== null);

  const options = {
    responsive: true,
    indexAxis: "y",
    plugins: {
      tooltip: {
        displayColors: false,
        callbacks: {
          label: (context) => context.raw.toString(),
          title: () => "",
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
    layout: {
      padding: {
        top: 30,
      },
    },
  };

  const chartData = {
    labels: filteredData.map((item) => item.label),
    datasets: [
      {
        label: "Commits",
        data: filteredData.map((item) => item.data),
        backgroundColor: "#B5CCEF",
        hoverBackgroundColor: "#225DB1",
      },
    ],
  };

  return (
    <div style={{ width: "60%" }}>
      <h4>Commit Count</h4>
      <div style={{ backgroundColor: "#F9FAFB", padding: "20px" }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default CommitCount;
