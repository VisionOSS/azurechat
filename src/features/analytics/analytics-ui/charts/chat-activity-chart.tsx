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
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { getChartStyle } from "../../../common/util";

Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

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

    const chartData = {
        labels: friendlyDateLabels,
        datasets: [
            {
                label: "Number of Unique Chats",
                data: data.values,
                backgroundColor: "rgba(104, 189, 23, 0.2)",
                borderColor: "rgba(104, 189, 23, 1)",
                borderWidth: 1,
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

    return <Bar data={chartData} options={options} />;
};

export default ChatActivityChart;
