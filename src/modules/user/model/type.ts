import { ObjectId } from "mongodb";
export type User = {
    id?: ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt?: Date;
}

export interface RawUser {
    _id: ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt?: Date;
}