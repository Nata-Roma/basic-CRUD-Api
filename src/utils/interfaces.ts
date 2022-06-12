export interface IUser {
    id: string;
    username: string;
    age: number;
    hobbies: Array<string>;
}

export interface IUserUpdate {
    id: string;
    username?: string;
    age?: number;
    hobbies?: Array<string>;
}
