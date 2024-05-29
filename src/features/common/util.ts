import { customAlphabet } from "nanoid";

import { ChatThreadModel } from "../chat-page/chat-services/models";

export const uniqueId = () => {
    const alphabet =
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const nanoid = customAlphabet(alphabet, 36);
    return nanoid();
};

// Function to extract the date part from the timestamp
export const extractDate = (isoString: string) => {
    return isoString.split("T")[0];
};

// Function to generate all dates between two dates
export const getDatesInRange = (startDate: Date, endDate: Date) => {
    const date = new Date(startDate.getTime());
    const dates = [];

    while (date <= endDate) {
        dates.push(date.toISOString().split("T")[0]);
        date.setDate(date.getDate() + 1);
    }

    return dates;
};

export const getChartStyle = (theme: string | undefined) => {
    switch (theme) {
        case "dark":
            return {
                textColor: "#FFFFFF",
                gridColor: "rgba(255, 255, 255, 0.1)",
            };
        case "light":
            return {
                textColor: "#000000",
                gridColor: "rgba(0, 0, 0, 0.1)",
            };
        case "system":
            return {
                textColor: "#FFFFFF",
                gridColor: "rgba(255, 255, 255, 0.1)",
            };
        default:
            return {
                textColor: "#000000",
                gridColor: "rgba(0, 0, 0, 0.1)",
            };
    }
};

export const sortByTimestamp = (a: ChatThreadModel, b: ChatThreadModel) => {
    return (
        new Date(b.lastMessageAt).getTime() -
        new Date(a.lastMessageAt).getTime()
    );
};

export function MovingAverage(data: number[], n: number): number[] {
    let ret = Array(data.length).fill(0);
    for (let i = 0; i < data.length; i++) {
        if (i >= n) {
            let sum = 0;
            for (let j = 0; j < n; j++) {
                sum += data[i - j];
            }
            ret[i] = sum / n;
        } else {
            ret[i] = data[i];
        }
    }
    return ret;
}
