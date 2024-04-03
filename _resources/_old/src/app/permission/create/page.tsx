"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Checkbox from "@/app/components/checkboxRoles"

export default function CreateForm() {

    const router = useRouter();
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        try {
            setIsLoading(true);

            const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL+`/permission`, {
                method: "POST",
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
                throw new Error("Erro ao adicionar permissão");
            }
            console.log("Permisão adicionada com sucesso!");
            router.push("/permission");
        } catch (error: any) {
            console.error("Erro ao adicionar permissão:", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h1>Adicionar Nova Permissão</h1>
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
                    {isLoading ? "Adicionando..." : "Adicionar"}
                </button>
            </form>
        </div>
    )
}