import { Footermain } from "@/components/footer/footer";
import { Login } from "@/components/login/login";
import { Sidebar } from "@/components/sidebar/sidebarMain";
import { UsersManage } from "@/components/user/userMain";



export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <Sidebar />
        <UsersManage />
      </div>
      <Footermain />
    </div>
  );
}
