import React from "react";
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

const ActivityHoursChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: "Hours",
        data: data.map((item) => item.hours),
        fill: false,
        borderColor: "blue",
      },
      {
        label: "Lessons Taken",
        data: data.map((item) => item.lessons_taken),
        fill: false,
        borderColor: "green",
      },
      {
        label: "Exams Completed",
        data: data.map((item) => item.exams_completed),
        fill: false,
        borderColor: "red",
      },
    ],
  };

  return <Line data={chartData} />;
};

export default ActivityHoursChart;
