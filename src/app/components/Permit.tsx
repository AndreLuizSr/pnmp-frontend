import Link from "next/link";
import { Edit, Trash } from "lucide-react";
import { PermissionModel } from "../types";

export default function Permit(params: PermissionModel) {
  
    return (
      <tr className="border-b"> 
              <td className='w-10 border border-slate-300'>{params.name}</td>
              <td className='w-52 border border-slate-300'>
                <Link href="/permission" onClick={()=>params.deletePermission(params.name)} className='bg-red-500 p-2 inline-block text-white text-sm'><Trash/></Link>
                <Link href={`/permission/edit/${params.name}`} className='bg-yellow-500 p-2 inline-block ml-3 text-white text-sm'><Edit/></Link>
              </td>
      </tr>
    )
  }