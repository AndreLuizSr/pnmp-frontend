import { fetcher } from "@/app/libs";
import { CheckboxRolesProps, RolesModel } from "@/app/types";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function Checkbox({ selectedRoles, setSelectedRoles }: CheckboxRolesProps) {
    const [roles, setRoles] = useState<RolesModel[]>([]);
    const { data, error, isLoading } = useSWR(
        process.env.NEXT_PUBLIC_BASE_URL + `/roles`, fetcher
    );

    useEffect(() => {
        if (data) {
            console.log("Dados recebidos:", data);
            setRoles(data);
        }
    }, [data]);

    if (error) return <div>Failed to load</div>;
    if (isLoading) return <div>Loading...</div>;
    if (!data) return null;

    const handleCheckboxChange = (event: { target: { value: any; checked: any; }; }) => {
        const roleId = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedRoles((prevSelectedRoles) => [...prevSelectedRoles, roleId]);
        } else {
            setSelectedRoles((prevSelectedRoles) =>
                prevSelectedRoles.filter((id) => id !== roleId)
            );
        }
    };

    return (
        <div>
            <h2>Cargo:</h2>
            {roles.map((role) => (
                <label key={role._id} className="block mb-2">
                    <input
                        type="checkbox"
                        className="form-checkbox mr-2"
                        value={role._id}
                        onChange={handleCheckboxChange}
                        checked={selectedRoles.includes(role._id)}
                    />
                    {role.name}
                </label>
            ))}
        </div>
    );
}