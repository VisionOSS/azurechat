"use client";

import React, { useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Card } from "@/components/ui/card";
import ChatActivityChart from "./charts/chat-activity-chart";

import "./analytics.css";
import PersonaSplitChart from "./charts/persona-split-chart";
import { max } from "date-fns";
import UserActivityTable from "./charts/user-activity-table";
import { UserActivityTableProps } from "../models";

export type AnalyticsProp = {
    searchParams: {
        pageSize?: number;
        pageNumber?: number;
    };
};

type ChartData = {
    labels: string[];
    values: number[];
};

export const Analytics = (props: AnalyticsProp) => {
    const currentDate = new Date();
    const oneMonthAgo = new Date(currentDate);
    oneMonthAgo.setMonth(currentDate.getMonth() - 1);

    const [startDate, setStartDate] = useState<Date | null>(oneMonthAgo);
    const [endDate, setEndDate] = useState<Date | null>(currentDate);
    const [dailyChatCountData, setDailyChatCountData] = useState<ChartData>({
        labels: [],
        values: [],
    });
    const [personaSplitData, setPersonaSplitData] = useState<ChartData>({
        labels: [],
        values: [],
    });
    const [userCountData, setUserCountData] =
        useState<UserActivityTableProps>();
    const [dailyChatCountLoading, setDailyChatCountLoading] = useState(true);
    const [personaSplitLoading, setPersonaSplitLoading] = useState(true);
    const [userCountLoading, setUserCountLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setDailyChatCountLoading(true);
            setPersonaSplitLoading(true);
            setUserCountLoading(true);
            try {
                const response = await fetch(
                    `/api/analytics?startDate=${startDate?.toISOString()}&endDate=${endDate?.toISOString()}&queryType=messageCountsPerDay`
                );
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const dailyChatCountData = await response.json();
                setDailyChatCountData(dailyChatCountData);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setDailyChatCountLoading(false);
            }
            try {
                const response = await fetch(
                    `/api/analytics?startDate=${startDate?.toISOString()}&endDate=${endDate?.toISOString()}&queryType=personaCounts`
                );
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const dailyChatCountData = await response.json();
                setPersonaSplitData(dailyChatCountData);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setPersonaSplitLoading(false);
            }
            try {
                const response = await fetch(
                    `/api/analytics?startDate=${startDate?.toISOString()}&endDate=${endDate?.toISOString()}&queryType=userCounts`
                );
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const dailyChatCountData = await response.json();
                console.log(dailyChatCountData);

                setUserCountData(dailyChatCountData);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setUserCountLoading(false);
            }
        };

        if (startDate && endDate) {
            fetchData();
        }
    }, [startDate, endDate]);

    return (
        <Card className="h-full flex pt-8 overflow-y-auto">
            <div className="w-full mx-4 space-y-8">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">
                        Analytics
                    </h2>
                </div>
                <div className="flex justify-center space-x-4">
                    <p>Date Range</p>
                    <div className="cursor-pointer">
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            isClearable
                            placeholderText="Start Date"
                        />
                    </div>
                    <div className="cursor-pointer">
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            isClearable
                            placeholderText="End Date"
                        />{" "}
                    </div>
                </div>

                <div className="flex flex-row justify-center space-x-4">
                    <div className="flex-1 min-w-0 flex justify-center items-center w-full">
                        {" "}
                        {dailyChatCountLoading ? (
                            <div className="loader-container flex justify-center items-center w-full h-full">
                                <div className="loader"></div>
                            </div>
                        ) : (
                            <div className="chart-container w-full h-full flex justify-center items-center">
                                <ChatActivityChart data={dailyChatCountData} />
                            </div>
                        )}
                    </div>
                    <div className="flex-1 min-w-0 flex justify-center items-center w-full">
                        {" "}
                        {personaSplitLoading ? (
                            <div className="loader-container flex justify-center items-center w-full h-full">
                                <div className="loader"></div>
                            </div>
                        ) : (
                            <div className="chart-container w-full h-full flex justify-center items-center">
                                <PersonaSplitChart data={personaSplitData} />
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-row justify-center space-x-4">
                    <div className="flex-1 min-w-0 flex justify-center items-center w-full">
                        {" "}
                        {dailyChatCountLoading ? (
                            <div className="loader-container flex justify-center items-center w-full h-full">
                                <div className="loader"></div>
                            </div>
                        ) : (
                            <div className="chart-container w-full h-full flex justify-center items-center">
                                <UserActivityTable data={userCountData} />
                            </div>
                        )}
                    </div>
                    <div className="flex-1 min-w-0 flex justify-center items-center w-full"></div>
                </div>
            </div>
        </Card>
    );
};
