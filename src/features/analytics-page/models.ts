export type UserCount = {
    userName: string;
    chatCount: number;
    lastActiveDate: string;
};

export type UserActivityTableProps = {
    data: UserCount[];
};
