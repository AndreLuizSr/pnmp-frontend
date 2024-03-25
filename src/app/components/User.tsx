import Link from "next/link";
import { UserModel } from "../types";
import { Edit, Trash } from "lucide-react";

export default function User(params: UserModel) {
  
    return (
      <tr className="border-b"> 
              <td className='w-10 border border-slate-300'>{params.name}</td>
              <td className='border border-slate-300'>{params.email}</td>
              <td className='border border-slate-300'>{params.phone}</td>
              <td className='w-52 border border-slate-300'>
                <Link href="/user" onClick={()=>params.deleteUser(params.email)} className='bg-red-500 p-2 inline-block text-white text-sm'><Trash/></Link>
                <Link href={`/user/edite/${params.email}`} className='bg-yellow-500 p-2 inline-block ml-3 text-white text-sm'><Edit/></Link>
              </td>
      </tr>
    )
  }