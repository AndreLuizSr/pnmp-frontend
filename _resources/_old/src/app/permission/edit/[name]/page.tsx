"use client"
import { fetcher } from "@/app/libs"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import useSWR from 'swr'
import Checkbox from "@/app/components/checkboxRoles"

export default function EditeForm({ params }: { params: { name: string } }) {
    const router = useRouter()
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
    const [name, setName] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { data: permission, isLoading: Loading } = useSWR(process.env.NEXT_PUBLIC_BASE_URL + `/permission/${params.name}`, fetcher)

    useEffect(() => {
        if (permission) {
            console.log(permission)
            setName(permission.name)
            setSelectedRoles(permission.roles);
        }
    }, [permission, Loading])
    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/permission/${params.name}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    roles: selectedRoles
                }),
            });
            console.log("Resposta da API:", response);
            if (!response.ok) {
                throw new Error("Erro ao editar permissão");
            }
            console.log("Permissão editada com sucesso!");
            router.push("/permission");
        } catch (error: any) {
            console.error("Erro ao editar permissão:", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (Loading) return <div><span>Loading...</span></div>
    if (!permission) return null;
    return (
        <div>
            <h1>Atualizando</h1>
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
                <Checkbox selectedRoles={selectedRoles} setSelectedRoles={setSelectedRoles} />
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full bg-blue-500 text-white rounded-md py-2 ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                >
                    {isLoading ? "Editando..." : "Editar"}
                </button>
            </form>
        </div>
    )
}