export type UserCount = {
    userName: string;
    chatCount: number;
};

export type UserActivityTableProps = {
    data: UserCount[];
};
