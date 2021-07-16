export interface IUserRegister {
    userName: string;
    email: string;
    password: string;
}
export interface IUserResponseRegister{
    token: string;
    success: boolean;
    errors: string;
}
