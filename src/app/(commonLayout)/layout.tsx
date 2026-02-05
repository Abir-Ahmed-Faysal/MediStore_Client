import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/Navbar";
import { userService } from "@/services/user.service";

export default async function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await userService.getSession();


  return (
    <div >
      <Navbar  data={data}/>
      <div className="min-h-[calc(100vh-136px)]">
            {children}
      </div>
  
      <Footer></Footer>
    </div>
  );
}
