import { User } from './user';

export class UserManager{
    // Public class properties
    public users: { [userId:string]: User; } = {};
    public messages: string[] = [];

    // Creates a new instance of the user manager class
    constructor(){}

    // Adds a user to the list
    public addUser(connId: string): User{
        this.users[connId] = new User(connId);
        return this.users[connId];
    }

    // Removes a user from the list
    public removeUser(connId: string): void{
        delete this.users[connId];
    }

    // Sets the user's name
    public setUserName(connId: string, name: string){
        this.users[connId].name = name;
    }

    // Gets a list of user names in a dictionary format that the front end can use
    public getUserNames(){
        let userNames = []
        for(let userId in this.users){
            userNames.push({"name": this.users[userId].name, "id": userId});
        }
        return userNames;
    }

    // Adds a message to the array; should be ordered
    public addMessage(message: string){
        this.messages.push(message);
    }

    // Clears messages from the array to start over
    public clearMessages(){
        this.messages = [];
    }
}