import {
    getMessageCountsPerDay,
    getPersonaCounts,
    getUserCounts,
} from "@/features/analytics/analytics-services/analytics-service";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        let params = new URL(req.url).searchParams;

        const startDate = params.get("startDate");
        const endDate = params.get("endDate");
        const queryType = params.get("queryType");

        let data;
        switch (queryType) {
            case "messageCountsPerDay":
                data = await getMessageCountsPerDay(startDate, endDate);
                break;
            case "personaCounts":
                data = await getPersonaCounts(startDate, endDate);
                break;
            case "userCounts":
                data = await getUserCounts(startDate, endDate);
                break;
            default:
                return NextResponse.json(
                    { message: "Invalid queryType" },
                    { status: 400 }
                );
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Error fetching data", error: error },
            { status: 500 }
        );
    }
}
