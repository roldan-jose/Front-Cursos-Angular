export interface IUser{
    email: string;
    password: string;
}

export interface IUserResponse{
    token: string;
    success: boolean;
    errors: string;
}
