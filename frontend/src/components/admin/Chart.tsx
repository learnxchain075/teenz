import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { useTheme } from '@/hooks/useTheme';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ChartData {
  daily: number;
  weekly: number;
  monthly: number;
  total: number;
  yearly?: number;
}

interface ChartProps {
  type: 'line' | 'bar';
  data?: ChartData;
  title?: string;
}

export default function AdminChart({ type, data, title }: ChartProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // If no data provided, show empty state
  if (!data) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
        No data available
      </div>
    );
  }

  const labels = ['Daily', 'Weekly', 'Monthly', 'Yearly', 'Total'];
  const values = [data.daily, data.weekly, data.monthly, data.yearly || 0, data.total];
  
  const chartData = {
    labels,
    datasets: [
      {
        label: title || (type === 'line' ? 'Revenue' : 'Orders'),
        data: values,
        borderColor: 'hsl(246, 80%, 60%)',
        backgroundColor: type === 'line' 
          ? 'hsla(246, 80%, 60%, 0.1)' 
          : 'hsla(246, 80%, 60%, 0.8)',
        fill: type === 'line',
        tension: type === 'line' ? 0.4 : 0,
        borderRadius: type === 'bar' ? 4 : 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.raw;
            return type === 'line' 
              ? `$${value.toLocaleString()}`
              : value.toLocaleString();
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
          color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
        },
      },
      y: {
        grid: {
          color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
          callback: (value: number) => {
            return type === 'line' 
              ? `$${value.toLocaleString()}`
              : value.toLocaleString();
          }
        },
      },
    },
  };

  return (
    <div className="h-64">
      {type === 'line' ? (
        <Line data={chartData} options={options} />
      ) : (
        <Bar data={chartData} options={options} />
      )}
    </div>
  );
}