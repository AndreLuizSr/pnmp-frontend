import { Footermain } from "./components/footer";
import { Login } from "./login/login";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
        <Login/>
      <Footermain />
    </div>
  );
}
