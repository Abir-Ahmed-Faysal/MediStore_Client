import AdminUserShowTable from "@/components/modules/adminDashboard/adminUsershowTable";
import { userService } from "@/services/user.service";

const UserManage = async () => {
  const { data, error } = await userService.getUsers();

  if (error) {
    return (
      <div className="rounded-lg border-2 border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10 p-8 text-center">
        <p className="text-red-700 dark:text-red-400 font-medium">Failed to load users</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 p-12 text-center">
        <p className="text-slate-500 dark:text-slate-400 font-medium">No users found</p>
      </div>
    );
  }

  return <AdminUserShowTable data={data} />;
};

export default UserManage;
