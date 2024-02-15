import { Footermain } from "@/components/footer/footer";
import { Login } from "@/components/login/login";
import { Sidebar } from "@/components/sidebar/sidebarMain";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
        <Login/>
      <Footermain />
    </div>
  );
}
