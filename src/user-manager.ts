import { User } from './user';

export class UserManager{
    public users: { [userId:string]: User; } = {};
    public messages: string[] = [];

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

    public addMessage(message: string){
        this.messages.push(message);
    }

    public clearMessages(){
        this.messages = [];
    }
}