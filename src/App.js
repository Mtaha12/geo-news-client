import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register chart elements
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function App() {
  const [news, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          'https://geo-news-server-production.up.railway.app/api/articles'
        );
        const data = await res.json();
        console.log('Fetched Data:', data);
        setArticles(data);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      }
    };
    fetchData();
  }, []);

  const chartData = {
    labels: news.map((_, i) => `News ${i + 1}`),
    datasets: [
      {
        label: 'Total Articles',
        data: news.map((_, i) => i + 1),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(75, 192, 192, 1)',
        hoverBorderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Geo News Article Distribution',
        font: {
          size: 24,
          weight: 'bold',
        },
        color: '#333',
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#333',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#ddd',
        borderWidth: 1,
      },
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            weight: 'bold',
          },
          color: '#333',
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Articles',
          font: {
            size: 16,
            weight: 'bold',
          },
          color: '#333',
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Articles',
          font: {
            size: 16,
            weight: 'bold',
          },
          color: '#333',
        },
        grid: {
          color: '#ddd',
        },
        ticks: {
          beginAtZero: true,
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-700">
        Geo News Visualizer
      </h1>
      <div className="relative h-80">
        <Bar data={chartData} options={chartOptions} />
      </div>
      <ul className="mt-8 space-y-4">
        {news.map((item, idx) => (
          <li
            key={idx}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <strong className="text-xl text-gray-800">{item.time}</strong> -{' '}
            <span className="text-lg text-gray-600">{item.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
