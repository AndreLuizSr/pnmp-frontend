import { Login } from "@/app/(auth-routes)/login/login";
import { Footermain } from "../components/footer";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
        <Login/>
      <Footermain />
    </div>
  );
}
