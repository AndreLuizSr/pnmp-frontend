"use client"
import { Trash } from "lucide-react";
import Link from 'next/link';

export async function DeleteUser({ params }: { params: { email: string } }) {
    const email = params.email;

    const handleDelete = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/users/${email}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log("Resposta da API:", response);
            if (!response.ok) {
                throw new Error("Erro ao apagar usuário");
            }
            console.log("Usuário apagado com sucesso!");
        } catch (error: any) {
            console.error("Erro ao apagar usuário:", error.message);
        }
    };
    return (
        <div>
            <Link href='/user'>
        <button className="text-red-500 hover:underline ml-2"
    
            onClick={handleDelete}>
            <Trash />
        </button>
        </Link>
        </div>
    );
}