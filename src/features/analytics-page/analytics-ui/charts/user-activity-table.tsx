import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../ui/table";
import React from "react";
import { UserActivityTableProps, UserCount } from "../../models";

const UserActivityTable: React.FC<UserActivityTableProps> = ({ data }) => {
    return (
        <div className="w-full">
            <h3 className=" my-4 flex justify-center">User Activity</h3>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[200px]">User</TableHead>
                        <TableHead className="w-[200px]">Chat Count</TableHead>
                        <TableHead className="w-[200px]">Last Active</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data &&
                        data.map((userChatCount: UserCount) => (
                            <TableRow key={userChatCount.userName}>
                                <TableCell>{userChatCount.userName}</TableCell>
                                <TableCell>{userChatCount.chatCount}</TableCell>
                                <TableCell>
                                    {new Date(
                                        userChatCount.lastActiveDate
                                    ).toLocaleString()}
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default UserActivityTable;
