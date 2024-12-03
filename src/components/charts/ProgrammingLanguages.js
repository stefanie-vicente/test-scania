import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ProgrammingLanguages = ({ data }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const dataset = context.dataset;
            const total = dataset.data.reduce((sum, value) => sum + value, 0);
            const percentage = (
              (dataset.data[context.dataIndex] / total) *
              100
            ).toFixed(2);
            return `${percentage}%`;
          },
          title: function () {
            return [];
          },
        },
      },
    },
  };
  return (
    <div style={{ width: "40%" }}>
      <h2>Programming languages</h2>
      <Doughnut
        data={{
          labels: data.map((lang) => lang.language),
          datasets: [
            {
              data: data.map((lang) => lang.count),
              backgroundColor: [
                "#08244C",
                "#E0CFAD",
                "#4C6A53",
                "#C3CAD4",
                "#87713C",
                "#B5CCEF",
                "#443108",
                "#B9C6BC",
                "#252D37",
                "#225DB1",
                "#213627",
                "#606B7B",
              ],
            },
          ],
        }}
        options={options}
      />
    </div>
  );
};

export default ProgrammingLanguages;
