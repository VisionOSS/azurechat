import React from "react";
import { useTheme } from "next-themes";

import {
    Chart,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { getChartStyle } from "../../../common/util";

Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

type ChartData = {
    labels: string[];
    values: number[];
};

type PersonaSplitChartProps = {
    data: ChartData;
};

const PersonaSplitChart: React.FC<PersonaSplitChartProps> = ({ data }) => {
    const { theme } = useTheme();

    const chartStyle = getChartStyle(theme);

    const chartData = {
        labels: data.labels,
        datasets: [
            {
                label: "Chats By Persona",
                data: data.values,
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
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
            customCanvasBackgroundColor: {
                color: chartStyle.textColor,
            },
        },
    };

    return <Bar data={chartData} options={options} />;
};

export default PersonaSplitChart;
