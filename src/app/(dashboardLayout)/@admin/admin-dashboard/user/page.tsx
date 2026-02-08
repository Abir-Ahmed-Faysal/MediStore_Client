import AdminUserShowTable from "@/components/modules/adminDashboard/adminUsershowTable";
import { userService } from "@/services/user.service";
import { notFound } from "next/navigation";


const UserManage = async () => {
  const { data, error } = await userService.getUsers();

  if(!data||error){
    notFound()
  }


  return <AdminUserShowTable data={data}/>
};

export default UserManage;
