export const dynamic = "force-dynamic";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/Navbar";
import { userService } from "@/services/user.service";

export default async function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await userService.getSessionWithRole();
  const user = data?.user;

  return (
    <div>
      <Navbar data={user} />
      <div className="md:min-h-[calc(100vh-136px)]">{children}</div>

      <Footer data={user}></Footer>
    </div>
  );
}
