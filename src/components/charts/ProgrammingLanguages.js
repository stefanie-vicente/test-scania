import { Pie } from "react-chartjs-2";

const ProgrammingLanguages = ({ data }) => {
  return (
    <div>
      <h2>Programming languages</h2>
      <Pie
        data={{
          labels: data.map((lang) => lang.language),
          datasets: [
            {
              data: data.map((lang) => lang.count),
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
              ],
            },
          ],
        }}
        options={{ responsive: true }}
      />
    </div>
  );
};

export default ProgrammingLanguages;
