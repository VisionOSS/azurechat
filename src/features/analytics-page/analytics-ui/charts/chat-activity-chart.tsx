import React from "react";
import { useTheme } from "next-themes";

import {
    Chart,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

import { getChartStyle, MovingAverage } from "../../../common/util";

Chart.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement
);

type ChartData = {
    labels: string[];
    values: number[];
};

type ChatActivityChartProps = {
    data: ChartData;
};

const formatDateLabels = (labels: string[]) => {
    return labels.map((label) => {
        const date = new Date(label);
        return date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
        });
    });
};

const ChatActivityChart: React.FC<ChatActivityChartProps> = ({ data }) => {
    const { theme } = useTheme(); // use the useTheme hook

    const chartStyle = getChartStyle(theme);

    const friendlyDateLabels = formatDateLabels(data.labels);

    const movingAverageData = MovingAverage(data.values, 5);

    const chartData = {
        labels: friendlyDateLabels,
        datasets: [
            {
                type: "bar",
                label: "Number of Unique Chats",
                data: data.values,
                backgroundColor: "rgba(104, 189, 23, 0.2)",
                borderColor: "rgba(104, 189, 23, 1)",
                borderWidth: 1,
            },
            {
                label: "Moving Average of Unique Chats",
                data: movingAverageData,
                type: "line", // This will create a line chart
                fill: false,
                borderColor: "rgba(251, 196, 3, 0.5)",
                tension: 0.08,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                    color: chartStyle.textColor,
                },
                grid: {
                    color: chartStyle.gridColor,
                },
            },
            x: {
                grid: {
                    display: true,
                    drawOnChartArea: true,
                    drawTicks: true,
                    color: chartStyle.gridColor,
                },
                ticks: {
                    color: chartStyle.textColor,
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    color: chartStyle.textColor,
                },
            },
        },
    };

    return <Bar data={chartData as any} options={options} />;
};

export default ChatActivityChart;
