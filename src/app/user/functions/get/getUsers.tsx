import { revalidatePath } from "next/cache"

export async function getData() {
    const res = await fetch(`http://localhost:3000/users`,{
        method: "GET",
        headers: {
        "Content-Type": "application/json",
    }}
    )
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}


