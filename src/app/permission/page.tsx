"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { fetcher } from '@/app/libs';
import { PermissionModel } from '../types';
import Permit from '../components/Permit';

export default function Permission() {
  
  const [permission, setPermission] = useState<PermissionModel[]>([]);
  const { data, error, isLoading } = useSWR(process.env.NEXT_PUBLIC_BASE_URL + `/permission`, fetcher, )
  
  useEffect(() => {
    if (data) {
      console.log("Dados recebidos:", data);
      setPermission(data);
    }
  }, [data, isLoading])
  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;

  let delete_Permission: PermissionModel['deletePermission'] = async (name: string) => {
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL +`/permission/${name}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
        });
        console.log("Resposta da API:", res);
        if (!res.ok) {
            throw new Error("Erro ao apagar permissão");
        }
        console.log("Permissão apagada com sucesso!");
        setPermission(permission.filter(permit => permit.name !== name));
    } catch (error: any) {
        console.error("Erro ao apagar permissão:", error.message);
    }
};
  return (
    <div className="flex flex-col flex-grow w-full bg-slate-200/40 font-sans">
      <div className="container mx-auto my-8 p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold mb-8">Gerenciar Permissões</h1>
        <div className="mb-4">
          <Link className="bg-green-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded" href={'/permission/create'}>
            adicionar
          </Link>
        </div>
        <form>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Nome</th>
              </tr>
            </thead>
            <tbody>
              {
                permission && permission.map((item: PermissionModel) => <Permit key={item.name} {...item} deletePermission={delete_Permission} />)
              }
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );

}

