import { db } from "~/server/db";

export async function getUserByEmail(email: string){
    // Get user by email
    return await db.user.findUnique({
        where: {
            email: email
        }
    });
}

export async function getUserById(id: string){
    // Get user by id
    return await db.user.findUnique({
        where: {
            id: id
        }
    });
}