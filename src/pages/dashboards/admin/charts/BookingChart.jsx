// src/pages/dashboards/admin/charts/BookingChart.jsx
import React, { useMemo } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Tooltip,
  Legend
);

// Named export for line chart
export function BookingLineChart({ bookings = [] }) {
  const data = useMemo(() => ({
    labels: bookings.map(b => b.bookingDate?.slice(0, 10) || ""),
    datasets: [
      {
        label: "Bookings",
        data: bookings.map(() => 1),
        borderColor: "#6366f1",
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#4f46e5",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  }), [bookings]);

  return <Line data={data} />;
}

// Named export for bar chart
export function TopRoutesBarChart({ topRoutes = [] }) {
  const data = useMemo(() => ({
    labels: topRoutes.map(([route]) => route),
    datasets: [
      {
        label: "Bookings",
        data: topRoutes.map(([, count]) => count),
        backgroundColor: [
          "rgba(99, 102, 241, 0.8)",
          "rgba(79, 70, 229, 0.8)",
          "rgba(67, 56, 202, 0.8)",
          "rgba(139, 92, 246, 0.8)",
          "rgba(124, 58, 237, 0.8)",
          "rgba(109, 40, 217, 0.8)",
        ],
        borderRadius: 8,
        borderWidth: 0,
      },
    ],
  }), [topRoutes]);

  return <Bar data={data} />;
}
