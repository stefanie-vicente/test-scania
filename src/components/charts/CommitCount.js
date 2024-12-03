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

  const filteredData = data.reduce(
    (acc, value, index) => {
      if (value !== 0) {
        acc.labels.push(allLabels[index]);
        acc.data.push(value);
      }
      return acc;
    },
    { labels: [], data: [] }
  );

  const options = {
    responsive: true,
    indexAxis: "y",
    plugins: {
      tooltip: {
        displayColors: false,
        callbacks: {
          label: function (context) {
            return context.raw.toString();
          },
          title: function () {
            return [];
          },
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

  return (
    <div style={{ width: "40%" }}>
      <h2>Commit count</h2>
      <Bar
        data={{
          labels: filteredData.labels,
          datasets: [
            {
              label: "Commits",
              data: filteredData.data,
              backgroundColor: "#B5CCEF",
              hoverBackgroundColor: "#225DB1",
            },
          ],
        }}
        options={options}
      />
    </div>
  );
};

export default CommitCount;
