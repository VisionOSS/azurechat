import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import React from "react";
import { UserActivityTableProps, UserCount } from "../../models";

const UserActivityTable: React.FC<UserActivityTableProps> = ({ data }) => {
    console.log(data);
    return (
        <div className="w-full">
            <h3 className=" my-4 flex justify-center">User Activity</h3>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[200px]">User</TableHead>
                        <TableHead className="w-[200px]">Chat Count</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data &&
                        data.map((userChatCount: UserCount) => (
                            <TableRow key={userChatCount.userName}>
                                <TableCell>{userChatCount.userName}</TableCell>
                                <TableCell>{userChatCount.chatCount}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default UserActivityTable;
