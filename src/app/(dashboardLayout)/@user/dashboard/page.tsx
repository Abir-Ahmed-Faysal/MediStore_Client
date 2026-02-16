import ProfileComponent from "@/components/modules/user/ProfilePage";
import { userService } from "@/services/user.service";
import React from "react";
type User = {
  name: string;
  email: string;
  phone?: string | null;
  image?: string | null;
  address?: string | null;
};

const ProfilePage = async () => {
  const { data, error } = await userService.getSession();
  if (!data || error) {
    return (
      <div className="text-center pt-10">
        <p>Failed to load profile page</p>
      </div>
    );
  }
  return <ProfileComponent user={data?.user as User}></ProfileComponent>;
};

export default ProfilePage;
