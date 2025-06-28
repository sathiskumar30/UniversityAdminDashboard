"use client"

import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"
import { useTheme } from "../providers/theme-provider"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

interface RankingData {
  year: number
  rank: number
}

interface RankingChartProps {
  data: RankingData[]
}

export function RankingChart({ data }: RankingChartProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark";

  const chartData = {
    labels: data.map((d) => d.year.toString()),
    datasets: [
      {
        label: "World Ranking",
        data: data.map((d) => d.rank),
        borderColor: isDark ? "#60A5FA" : "#3B82F6",
        backgroundColor: isDark ? "rgba(96, 165, 250, 0.1)" : "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: isDark ? "#60A5FA" : "#3B82F6",
        pointBorderColor: isDark ? "#1E40AF" : "#1D4ED8",
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "World Ranking Trend (2020-2024)",
        color: isDark ? "#F3F4F6" : "#374151",
        font: {
          size: 16,
          weight: "bold" as const,
        },
        padding: 20,
      },
      tooltip: {
        backgroundColor: isDark ? "#374151" : "#FFFFFF",
        titleColor: isDark ? "#F3F4F6" : "#374151",
        bodyColor: isDark ? "#F3F4F6" : "#374151",
        borderColor: isDark ? "#6B7280" : "#E5E7EB",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: (context: any) => `Rank: #${context.parsed.y}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: isDark ? "#374151" : "#F3F4F6",
        },
        ticks: {
          color: isDark ? "#9CA3AF" : "#6B7280",
          font: {
            size: 12,
          },
        },
      },
      y: {
        reverse: true, // Lower rank numbers should be higher on the chart
        grid: {
          color: isDark ? "#374151" : "#F3F4F6",
        },
        ticks: {
          color: isDark ? "#9CA3AF" : "#6B7280",
          font: {
            size: 12,
          },
          callback: (value: any) => `#${value}`,
        },
        title: {
          display: true,
          text: "World Ranking",
          color: isDark ? "#9CA3AF" : "#6B7280",
          font: {
            size: 12,
            weight: "bold" as const,
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index" as const,
    },
  }

  return (
    <div className="h-80 w-full">
      <Line data={chartData} options={options} />
    </div>
  )
}
