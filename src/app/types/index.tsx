import { Dispatch, SetStateAction } from "react";

export interface UserModel {
    name: string,
    password: string,
    email: string,
    phone: string,
    institution: string,
    roles: RolesModel[],
    permission: PermissionModel[],
    deleteUser(email: string): void;
}

export interface PermissionModel{
    name: string,
    roles: RolesModel[],
    deletePermission(name: string): void;
}

export interface RolesModel {
    _id: string,
    name: string,
}

export interface CheckboxRolesProps {
    selectedRoles: string[];
    setSelectedRoles: Dispatch<SetStateAction<string[]>>;
}

export interface CheckboxPermitProps{
    selectedPermission: string[];
    setSelectedPermission: Dispatch<SetStateAction<string[]>>;
}
