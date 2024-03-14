export interface UserModel {
    name: string,
    password: string,
    email: string,
    phone: string,
    institution: string,
    roles: string[],
    deleteUser(email: string): void;
}