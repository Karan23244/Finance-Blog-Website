import React from "react";
import { Line } from "react-chartjs-2";

const Chart = ({ data, labels }) => {
  return (
    <div className="mt-6">
      <Line
        data={{
          labels,
          datasets: [
            {
              label: "Growth Over Time",
              data,
              fill: true,
              backgroundColor: "rgba(79, 70, 229, 0.2)",
              borderColor: "rgba(79, 70, 229, 1)",
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};

export default Chart;
