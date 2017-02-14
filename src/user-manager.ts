import { User } from './user';

export class UserManager{
    public users: { [userId:string]: User; } = {};

    constructor(){}

    public addUser(connId: string): User{
        this.users[connId] = new User(connId);
        return this.users[connId];
    }

    public removeUser(connId: string): void{
        delete this.users[connId];
    }

    public setUserName(connId: string, name: string){
        this.users[connId].name = name;
    }

    public getUserNames(){
        let userNames = []
        for(let userId in this.users){
            userNames.push({"name": this.users[userId].name, "id": userId});
        }
        return userNames;
    }
}