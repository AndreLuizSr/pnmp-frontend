'use client'
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";

export default function LoginForm() {
    const[email, setEmail] = useState<string>('')
    const[password, setPassword] = useState<string>('')

    const router = useRouter();

    async function handleSubmit(event: SyntheticEvent) {
        event.preventDefault();

        const result = await signIn('credentials',{
            email: email,
            password: password,
            redirect:false
        })
        if(result?.error){
            console.log(result)
            return
        }
        console.log(result);
        router.replace('/user')
    }
    return (
        <form className="flex flex-col w-full max-w-sm" onSubmit={handleSubmit}>
            <div className="mb-5">
                <label className="block text-gray-400 text-sm font-bold" htmlFor="email">
                    E-mail:
                </label>
                <input
                    className="w-11/12 p-3 border-b border-gray-300 outline-none text-slate-950"
                    type="email"
                    id="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="mb-10">
                <label className="block text-gray-400 text-sm font-bold" htmlFor="password">
                    Senha:
                </label>
                <input
                    className="w-11/12 p-3 border-b border-gray-300 outline-none text-slate-950"
                    type="password"
                    id="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
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
                <h1>
                    <p className="text-gray-800">
                        Caso necessite, entrar em contato com sua coordenação para recuperar a senha.
                    </p>
                    teste!</h1>
            </div>
        </form>
    )
}
