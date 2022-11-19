import { isValidObjectId } from "mongoose";

export const successResponse = (res:any) => {
    return {
        isError: false,
        data: res,
    };
}
export const errorResponse = (res:any) => {
    return {
        isError: true,
        message: res,
    };
}
export const isValidId = (id: string) => {
    return isValidObjectId(id);
}

