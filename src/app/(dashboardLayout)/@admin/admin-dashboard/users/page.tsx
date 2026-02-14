import AdminUserShowTable from "@/components/modules/adminDashboard/adminUsershowTable";
import { userService } from "@/services/user.service";
import { notFound } from "next/navigation";

const UserManage = async () => {
  const { data, error } = await userService.getUsers();

  if (error) {
    return (
      <div className="text-red-500 text-center py-4">Internal server error</div>
    );
  }

  if (data.length === 0) {
    return <div className="text-red-500 text-center py-4">No user found</div>;
  }

  return <AdminUserShowTable data={data} />;
};

export default UserManage;
