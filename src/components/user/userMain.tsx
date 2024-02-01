import { Edit, Trash } from "lucide-react";
import { Footermain } from "../footer/footer";

export function UsersManage() {
  return (
      <div className="flex flex-col flex-grow w-full bg-slate-200/40 font-sans">
        <div className="container mx-auto my-8 p-8 bg-white shadow-md rounded-lg">
          <h1 className="text-3xl font-bold mb-8">Gerenciar Usuários</h1>

          <div className="mb-4">
            <button className="bg-green-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded">
              Adicionar
            </button>
          </div>

          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Nome</th>
                <th className="py-2 px-4 border-b text-left">Email</th>
                <th className="py-2 px-4 border-b text-left">Numero</th>
                <th className="py-2 px-4 border-b text-left">Instituição</th>
                <th className="py-2 px-4 border-b text-left">Ações</th>
                
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 px-4">Habel Victor</td>
                <td className="py-2 px-4">Habel@example.com</td>
                <td className="py-2 px-4">(83)40028922</td>
                <td className="py-2 px-4">Teste</td>
                <td className="py-2 px-4">
                  <button className="text-blue-500 hover:underline"><Edit/></button>
                  <button className="text-red-500 hover:underline ml-2"><Trash/></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    
  );
}