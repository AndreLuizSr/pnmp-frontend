"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { fetcher } from '@/app/libs';
import User from '@/app/components/User';
import { UserModel } from '../types';


export default function UsersManage() {
  
  const [users, setUsers] = useState<UserModel[]>([]);
  const { data, error, isLoading } = useSWR(process.env.NEXT_PUBLIC_BASE_URL + `/users`, fetcher, )
  
  useEffect(() => {
    if (data) {
      console.log("Dados recebidos:", data);
      setUsers(data);
    }
  }, [data, isLoading])
  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;

  let delete_User: UserModel['deleteUser'] = async (email: string) => {
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL +`/users/${email}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
        });
        console.log("Resposta da API:", res);
        if (!res.ok) {
            throw new Error("Erro ao apagar usuário");
        }
        console.log("Usuário apagado com sucesso!");
        setUsers(users.filter(user => user.email !== email));
    } catch (error: any) {
        console.error("Erro ao apagar usuário:", error.message);
    }
};
  return (
    <div className="flex flex-col flex-grow w-full bg-slate-200/40 font-sans">
      <div className="container mx-auto my-8 p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold mb-8">Gerenciar Usuários</h1>

        <div className="mb-4">
          <Link className="bg-green-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded" href={'/user/create'}>
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
              {
                users && users.map((item: UserModel) => <User key={item.email} {...item} deleteUser={delete_User} />)
              }
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );

}

