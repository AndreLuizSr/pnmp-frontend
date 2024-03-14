import { ArrowLeftCircle } from "lucide-react";
import Image from "next/image";
//import { useState } from "react";

export function Sidebar(){
    //const [open, setOpen] = useState(true);
    //${open ? "w-64" : "w-20"}
    //${!open && "rotate-180"}
    
    return (
        <aside className="flex">
            <div className="bg-gradient-to-r from-green-500 to-cyan-700 min-h-screen p-5 pt-8 w-64
            relative">
                 <a href="" className="flex items-center pl-7 pb-4 border-b border-b-gray-950">
                 <Image src="/images/tbdarkicon.png" width={140} height={140} alt='logo' />
                 </a>
                <ArrowLeftCircle
                    className="bg-white text-slate-950 text-3xl rounded-full absolute
                    -right-2.5 top-9 border cursor-pointer"
                     />
            </div>
        </aside>
    );
}
  