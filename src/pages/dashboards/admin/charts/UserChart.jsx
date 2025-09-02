import React, { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function UserChart({ users = [] }) {
  const data = useMemo(() => ({
    labels: ["Users", "Operators", "Admins"],
    datasets: [
      {
        data: [
          users.filter((u) => u.role === "User").length,
          users.filter((u) => u.role === "Operator").length,
          users.filter((u) => u.role === "Admin").length,
        ],
        backgroundColor: ["#6366f1", "#10b981", "#f59e0b"],
        borderWidth: 0,
        hoverOffset: 15,
      },
    ],
  }), [users]);

  const options = {
    responsive: true,
    cutout: "60%",
    plugins: {
      legend: { position: "bottom" },
      tooltip: { cornerRadius: 8 },
    },
    maintainAspectRatio: false,
  };

  return (
    <div style={{ height: "300px" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
}
