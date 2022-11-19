import { isValidObjectId } from "mongoose";

export const isValidId = (id: string) => {
    return isValidObjectId(id);
}