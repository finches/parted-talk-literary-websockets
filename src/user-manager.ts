import { User } from './user';

export class UserManager{
    public users: { [userId:string]: User; } = {};

    constructor(){}

    public addUser(connId: string): void{
        this.users[connId] = new User(connId);
    }

    public removeUser(connId: string): void{
        delete this.users[connId];
    }
}