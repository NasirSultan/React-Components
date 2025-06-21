// src/HeavyChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Chart data (ideally externalized or fetched dynamically)
const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
  datasets: [
    {
      label: 'Votes',
      data: [12, 19, 3, 5, 2],
      backgroundColor: 'rgba(59, 130, 246, 0.6)',
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: '#374151', // Tailwind gray-700 for better visibility
        font: {
          size: 14,
        },
      },
    },
    title: {
      display: true,
      text: 'Votes Per Color',
      color: '#1f2937', // Tailwind gray-800
      font: {
        size: 16,
        weight: 'bold',
      },
    },
  },
  animation: {
    duration: 1000,
    easing: 'easeOutQuart',
  },
  maintainAspectRatio: false,
};

const HeavyChart = () => {
  return (
    <section
      aria-labelledby="chart-title"
      className="p-4 bg-white rounded-2xl shadow-md mt-6 w-full max-w-md transition-all duration-500"
    >
      <h2
        id="chart-title"
        className="text-xl font-semibold mb-4 text-blue-700"
      >
        Vote Chart
      </h2>
      <div className="h-72 sm:h-80">
        <Bar data={data} options={options} />
      </div>
    </section>
  );
};

export default HeavyChart;
