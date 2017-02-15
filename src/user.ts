export class User{
    // The name of the user
    public name:string = "";

    // Creates a new user when a connection id is given
    // Note that the "public" declaration in the constructor automatically
    // makes it a public property of the class
    constructor(public connectionId: string){}
}