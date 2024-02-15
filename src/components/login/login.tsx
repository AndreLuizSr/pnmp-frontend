import Image from "next/image";
import { Footermain } from "../footer/footer";
import Link from "next/link";

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
          <form className="flex flex-col w-full max-w-sm">
            <div className="mb-5">
              <label className="block text-gray-400 text-sm font-bold" htmlFor="username">
                Usuário:
              </label>
              <input
                className="w-11/12 p-3 border-b border-gray-300 outline-none"
                type="text"
                id="username"
                name="username"
              />
            </div>
            <div className="mb-10">
              <label className="block text-gray-400 text-sm font-bold" htmlFor="password">
                Senha:
              </label>
              <input
                className="w-11/12 p-3 border-b border-gray-300 outline-none"
                type="password"
                id="password"
                name="password"
              />
            </div>
            <div className="flex items-center justify-between mb-6">
              <button
                className="bg-green-500 hover:bg-green-800/95 text-white font-bold py-2 px-4 rounded shadow-md"
                type="submit"
              >
                Entrar
              </button>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-green-500"
                />
                <span className="ml-2 text-sm text-gray-600">Lembrar conta</span>
              </div>
            </div>
            <div className="mt-4 text-center">
              <Link href='/user'><h1>
              <p className="text-gray-800">
                Caso necessite, entrar em contato com sua coordenação para recuperar a senha.
              </p>
              teste!</h1></Link>
            </div>
          </form>

        </div>
      </div>
      <Footermain />
    </div>
  )
}
