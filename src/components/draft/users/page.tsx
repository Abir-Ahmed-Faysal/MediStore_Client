import { userService } from "@/services/user.service";
import { notFound } from "next/navigation";


const UserManage = async () => {
  const { data, error } = await userService.getUsers();

  if(!data||error){
    notFound()
  }


  return <div>this is user manage page4</div>;
};

export default UserManage;
