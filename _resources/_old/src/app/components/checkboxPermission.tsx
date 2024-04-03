import { useState, useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "../libs";
import { CheckboxPermitProps, PermissionModel } from "../types";

export default function Checkbox({ selectedPermission, setSelectedPermission }: CheckboxPermitProps) {
    const [permission, setPermission] = useState<PermissionModel[]>([]);
    const { data, error, isLoading } = useSWR(
        process.env.NEXT_PUBLIC_BASE_URL + `/permission`, fetcher
    );

    useEffect(() => {
        if (data) {
            console.log("Dados recebidos:", data);
            setPermission(data);
        }
    }, [data]);

    if (error) return <div>Failed to load</div>;
    if (isLoading) return <div>Loading...</div>;
    if (!data) return null;

    const handleCheckboxChange = (event: { target: { value: any; checked: any; }; }) => {
        const permitName = event.target.value;

        if (selectedPermission.includes(permitName)) {
            setSelectedPermission([]);
        } else {
            setSelectedPermission([permitName]);
        }
    };

    return (
        <div>
            <h2>Permissão:</h2>
            {permission.map((permit) => (
                <label key={permit.name} className="block mb-2">
                    <input
                        type="checkbox"
                        className="form-checkbox mr-2"
                        value={permit.name}
                        onChange={handleCheckboxChange}
                        checked={selectedPermission.includes(permit.name)}
                    />
                    {permit.name}
                </label>
            ))}
        </div>
    );
}
