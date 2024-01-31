import { SqlQuerySpec } from "@azure/cosmos";
import {
    CHAT_THREAD_ATTRIBUTE,
    ChatThreadModel,
} from "../../chat/chat-services/models";
import { CosmosDBContainer } from "../../common/cosmos";
import { log } from "console";

import { extractDate, getDatesInRange } from "../../common/util";

interface ChatCounts {
    [key: string]: number;
}

export const getMessageCountsPerDay = async (
    startDate: string | null,
    endDate: string | null
) => {
    const container = await CosmosDBContainer.getInstance().getContainer();

    const querySpec: SqlQuerySpec = {
        query: `SELECT
                    c.createdAt,
                    c.type
                FROM c
                WHERE c.type = 'CHAT_THREAD'
                    AND c.createdAt >= '${startDate}'
                    AND c.createdAt <= '${endDate}'`,
        parameters: [
            {
                name: "@type",
                value: CHAT_THREAD_ATTRIBUTE,
            },
        ],
    };

    const { resources } = await container.items.query(querySpec).fetchNext();

    const startDateRange = new Date(extractDate(<string>startDate));
    const endDateRange = new Date(extractDate(<string>endDate));

    const dates = getDatesInRange(startDateRange, endDateRange);

    // Initialize counts for each date
    const chatCounts = dates.reduce((acc: ChatCounts, date) => {
        acc[date] = 0;
        return acc;
    }, {});

    // Count chats per day
    resources.forEach((chat) => {
        if (chat.type === "CHAT_THREAD") {
            const date = extractDate(chat.createdAt);
            if (chatCounts.hasOwnProperty(date)) {
                chatCounts[date]++;
            }
        }
    });

    // Separate the dates and counts into two arrays
    const labels = Object.keys(chatCounts);
    const values = Object.values(chatCounts);

    return { labels, values };
};

export const getPersonaCounts = async (
    startDate: string | null,
    endDate: string | null
) => {
    const container = await CosmosDBContainer.getInstance().getContainer();

    const querySpec: SqlQuerySpec = {
        query: `SELECT c.conversationPersona, COUNT(1) AS personaCount
        FROM c
        WHERE c.type = 'CHAT_THREAD'
            AND c.createdAt >= '${startDate}'
            AND c.createdAt <= '${endDate}'
        GROUP BY c.conversationPersona`,
    };

    const { resources } = await container.items.query(querySpec).fetchNext();

    const labels = resources.map((record) => record.conversationPersona);
    const values = resources.map((record) => record.personaCount);

    return { labels, values };
};

export const getUserCounts = async (
    startDate: string | null,
    endDate: string | null
) => {
    const container = await CosmosDBContainer.getInstance().getContainer();

    const querySpec: SqlQuerySpec = {
        query: `SELECT c.useName AS userName, COUNT(1) AS chatCount
        FROM c
        WHERE c.type = 'CHAT_THREAD'
            AND c.createdAt >= '${startDate}'
            AND c.createdAt <= '${endDate}'
        GROUP BY c.useName`,
    };

    const { resources } = await container.items.query(querySpec).fetchNext();

    const sortedResults = resources.sort((a, b) => b.chatCount - a.chatCount);

    return sortedResults;
};
