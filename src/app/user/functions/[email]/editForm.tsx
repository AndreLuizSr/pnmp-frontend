"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function EditeForm({ params }: { params: { email: string } }) {
    const router = useRouter()
    const emailUser = params.email

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            console.log("Editando dados:", { name, password, email, phone });

            const response = await fetch(`http://localhost:3000/users/${emailUser}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    password,
                    email,
                    phone,
                }),
            });
            console.log("Resposta da API:", response);
            if (!response.ok) {
                throw new Error("Erro ao editar usuário");
            }
            console.log("Usuário editado com sucesso!");
            router.push("/user");
        } catch (error: any) {
            console.error("Erro ao editar usuário:", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="w-1/2 mx-auto mt-8 p-6 bg-white rounded-md shadow-md"
            onSubmit={handleSubmit}>
            <label className="block mb-4">
                <span className="text-gray-700">Nome:</span>
                <input
                    type="text"
                    className="form-input mt-1 block w-full rounded-md border-gray-300"
                    required
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
            </label>
            <label className="block mb-4">
                <span className="text-gray-700">Senha:</span>
                <input
                    type="password"
                    className="form-input mt-1 block w-full rounded-md border-gray-300"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </label>
            <label className="block mb-4">
                <span className="text-gray-700">Email:</span>
                <input
                    type="email"
                    className="form-input mt-1 block w-full rounded-md border-gray-300"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </label>
            <label className="block mb-4">
                <span className="text-gray-700">Telefone:</span>
                <input
                    type="tel"
                    className="form-input mt-1 block w-full rounded-md border-gray-300"
                    required
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                />
            </label>
            <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-blue-500 text-white rounded-md py-2 ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
            >
                {isLoading ? "Editando..." : "Editar"}
            </button>
        </form>
    )
}