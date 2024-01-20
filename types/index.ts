
// Create a separate interface for the user data sent to clients
export interface UserForClientProp {
    createdAt: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    _id: string;
}