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
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { useState, useMemo } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN" | "SELLER";
  banned: boolean;
}

export default function AdminUserShowTable({ data }: { data: User[] }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const filteredData = useMemo(
    () =>
      data.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [data, searchTerm]
  );

  const handleBan = async (id: string) => {
    setLoadingId(id);
    try {
      const { data: result, error } = await banUserAction(id);
      if (!result) {
        toast.error("Failed to ban user");
        return;
      }
      router.refresh();
      toast.success("User banned successfully");
    } catch (error) {
      toast.error("Failed to ban user");
    } finally {
      setLoadingId(null);
    }
  };

  const handleUnban = async (id: string) => {
    setLoadingId(id);
    try {
      const { data: result, error } = await unBanAction(id);
      if (!result) {
        toast.error("Failed to unban user");
        return;
      }
      router.refresh();
      toast.success("User unbanned successfully");
    } catch (error) {
      toast.error("Failed to unban user");
    } finally {
      setLoadingId(null);
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400";
      case "SELLER":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400";
      case "USER":
        return "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400";
      default:
        return "bg-slate-100 dark:bg-slate-900/30 text-slate-700 dark:text-slate-400";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">User Management</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Manage users and control access</p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <Table>
          <TableHeader className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700">
            <TableRow className="hover:bg-slate-50 dark:hover:bg-slate-800/80">
              <TableHead className="text-slate-700 dark:text-slate-300 font-semibold">Name</TableHead>
              <TableHead className="text-slate-700 dark:text-slate-300 font-semibold">Email</TableHead>
              <TableHead className="text-slate-700 dark:text-slate-300 font-semibold">Role</TableHead>
              <TableHead className="text-slate-700 dark:text-slate-300 font-semibold">Status</TableHead>
              <TableHead className="text-center text-slate-700 dark:text-slate-300 font-semibold">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  <p className="text-slate-500 dark:text-slate-400">No users found</p>
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((user, index) => (
                <TableRow
                  key={user.id}
                  className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <TableCell className="text-slate-900 dark:text-white font-medium">{user.name}</TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-300 text-sm">{user.email}</TableCell>
                  <TableCell>
                    <Badge className={`${getRoleBadgeColor(user.role)} capitalize border-0`}>
                      {user.role}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <Badge
                      className={`border-0 ${
                        user.banned
                          ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                          : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                      }`}
                    >
                      {user.banned ? "🚫 Banned" : "✓ Active"}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-center">
                    <div className="flex justify-center gap-2">
                      {!user.banned ? (
                        <Button
                          size="sm"
                          variant="destructive"
                          className="text-xs"
                          disabled={loadingId === user.id}
                          onClick={() => handleBan(user.id)}
                        >
                          {loadingId === user.id ? "Banning..." : "Ban"}
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          className="text-xs bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700"
                          disabled={loadingId === user.id}
                          onClick={() => handleUnban(user.id)}
                        >
                          {loadingId === user.id ? "Unbanning..." : "Unban"}
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-4">
          <p className="text-sm text-slate-600 dark:text-slate-400">Total Users</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{data.length}</p>
        </div>
        <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-4">
          <p className="text-sm text-slate-600 dark:text-slate-400">Active Users</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
            {data.filter((u) => !u.banned).length}
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-4">
          <p className="text-sm text-slate-600 dark:text-slate-400">Banned Users</p>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">
            {data.filter((u) => u.banned).length}
          </p>
        </div>
      </div>
    </div>
  );
}
