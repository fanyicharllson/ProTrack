import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const Barchartdata = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Dataset 1",
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: "#A498FF",
      borderColor: "#BFB7FF",
      borderWidth: 2,
      hoverBackgroundColor: "#8C78FF",
      hoverBorderColor: "#A498FF",
      borderRadius: 12, 
    },
  ],
};

export const Barchartoptions = {
  responsive: true,
  maintainAspectRatio: false, 
  animation: {
    duration: 2000, 
    easing: "easeInOutQuart", 
  },
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Project Flow",
      font: {
        size: 15,
        weight: "bold",
        
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false, 
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: "rgba(0, 0, 0, 0.1)", 
        borderDash: [5, 5], 
      },
    },
  },
} as const
