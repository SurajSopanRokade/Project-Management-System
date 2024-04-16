import { Role } from "./role";

export class User {
    id:number;
    username: string;
    contact: string;
    email: string;
    password: string;
    address: string;
    userRole:Role;



    constructor(
        id: number = 0,
        username: string = '',
        contact: string = '',
        email: string = '',
        password: string = '',
        address: string = '',
        userRole: Role = Role.user // Default role is user
    ) {
        this.id = id;
        this.username = username;
        this.contact = contact;
        this.email = email;
        this.password = password;
        this.address = address;
        this.userRole = userRole;
    }
}