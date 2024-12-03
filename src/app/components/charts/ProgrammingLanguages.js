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
          label: (context) => {
            const dataset = context.dataset;
            const total = dataset.data.reduce((sum, value) => sum + value, 0);
            const percentage = (
              (dataset.data[context.dataIndex] / total) *
              100
            ).toFixed(2);
            return `${context.label} ${percentage}%`;
          },
          title: () => "",
        },
      },
    },
  };

  const languageLabels = data.map((lang) => lang.language);
  const languageData = data.map((lang) => lang.count);

  const backgroundColors = [
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
  ];

  return (
    <div>
      <h4>Programming Languages</h4>
      <div style={{ backgroundColor: "#F9FAFB", padding: "20px" }}>
        <Doughnut
          data={{
            labels: languageLabels,
            datasets: [
              {
                data: languageData,
                backgroundColor: backgroundColors,
                borderWidth: 0,
              },
            ],
          }}
          options={options}
        />
      </div>
    </div>
  );
};

export default ProgrammingLanguages;
