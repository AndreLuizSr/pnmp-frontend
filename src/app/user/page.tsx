import { Key } from 'react';
import { Edit } from 'lucide-react';
import Link from 'next/link';
import { getData } from './functions/get/getUsers';
import { DeleteUser } from './functions/delet/delet';
import { revalidatePath } from 'next/cache';


export default async function UsersManage() {
  const data = await getData();
  revalidatePath('/', 'layout')

  return (
    <div className="flex flex-col flex-grow w-full bg-slate-200/40 font-sans">
      <div className="container mx-auto my-8 p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold mb-8">Gerenciar Usuários</h1>

        <div className="mb-4">
          <Link className="bg-green-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded" href='/user/functions/add'>
            adicionar
          </Link>

        </div>
        <form>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Nome</th>
                <th className="py-2 px-4 border-b text-left">Email</th>
                <th className="py-2 px-4 border-b text-left">Numero</th>
                <th className="py-2 px-4 border-b text-left">Ações</th>
              </tr>
            </thead>
            <tbody>
              {data.map((data: { name: string; email: string; phone: string; institution: string; }, users: Key) => (
                <tr key={users} className="border-b">
                  <td className="py-3 px-4">{data.name}</td>
                  <td className="py-3 px-4">{data.email}</td>
                  <td className="py-3 px-4">{data.phone}</td>
                  <td className="py-3 px-4">
                    <Link className="text-blue-500 hover:underline" href={`/user/functions/${encodeURIComponent(data.email)}`}>
                      <Edit />
                    </Link>
                    <DeleteUser params={{
                      email: data.email
                    }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
  
}

