import Image from "next/image";
import { Footermain } from "../../components/footer";
import LoginForm from "./loginForm";

export function Login() {
  
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex items-center justify-center bg-gradient-to-r from-green-500 to-cyan-700 flex-grow">
        <div className="pl-20 pr-20 flex flex-col bg-white p-8 rounded-xl shadow-xl text-white items-center">
          <div className="flex flex-col mb-5 items-center">
            <Image src="/images/tbwhiteIcon.png" className='w-40 mb-2' width={120} height={120} alt='tbIcone' />
            <span className='text-lg text-zinc-400 text-center mb-4' >
              Sistema de Informação de Tratamentos <br /> Especiais de Tuberculose
            </span>
          </div>
          <LoginForm/>
        </div>
      </div>
      <Footermain />
    </div>
  )
}
