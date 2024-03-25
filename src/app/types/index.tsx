import { Dispatch, SetStateAction } from "react";

export interface UserModel {
    name: string,
    password: string,
    email: string,
    phone: string,
    institution: string,
    roles: RolesModel[],
    deleteUser(email: string): void;
}

export interface RolesModel {
    _id: string,
    name: string,
}

export interface CheckboxProps {
    selectedRoles: string[];
    setSelectedRoles: Dispatch<SetStateAction<string[]>>;
}