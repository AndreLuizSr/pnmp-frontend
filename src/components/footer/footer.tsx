import Image from "next/image";

export function Footermain(){
    return(
        <footer className="bg-white border-t p-3 flex items-center justify-between shadow-xl fixed bottom-0 left-0 right-0">
        <div className='ml-2'>
          <Image src="/images/pulmaotb.png" width={140} height={140} alt='Capa footer' />
        </div>
        <div className="mr-2">
          <Image src="/images/logofooter.png" width={400} height={400} alt='Capa footer' />
        </div>
      </footer>
    )
}