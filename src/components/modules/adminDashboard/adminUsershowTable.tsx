"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { banUserAction, unBanAction } from "@/actions/userAdminAction";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN" | "SELLER";
  banned: boolean;
}

export default function AdminUserShowTable({ data }: { data: User[] }) {
  const router = useRouter();
  const handleBan = async (id: string) => {
    try {
      const { data, error } = await banUserAction(id);
      if (!data) {
        toast.error("User banned failed");
        return;
      }
      router.refresh();
      toast.success("User banned successfully");
    } catch (error) {
      toast.error("Failed to ban user");
    }
  };

  const handleUnban = async (id: string) => {
    try {
      const { data, error } = await unBanAction(id);
      if (!data) {
        toast.error("User unbanned failed");
      }
      router.refresh();
      toast.success("User unbanned successfully");
    } catch (error) {
      toast.error("Failed to unban user");
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <span className="capitalize">{user.role}</span>
            </TableCell>

            <TableCell>
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                  user.banned
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {user.banned ? "Banned" : "Active"}
              </span>
            </TableCell>

            <TableCell className="text-center space-x-2">
              <Button
                size="sm"
                variant="destructive"
                disabled={user.banned}
                onClick={() => handleBan(user.id)}
              >
                Ban
              </Button>

              <Button
                size="sm"
                variant="outline"
                disabled={!user.banned}
                onClick={() => handleUnban(user.id)}
              >
                Unban
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
