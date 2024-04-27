import { type User } from "@prisma/client";
import { db } from "~/server/db";

export async function createPendingPrompt(promptName: string, prompt: string, author: User){
    await db.prompt.create({
        data: {
            name: promptName,
            prompt: prompt,
            author: {
                connect: {
                    id: author.id
                }
            },
            pending: true
        }
    });
}

export async function getAllActivePrompts(){
    return await db.prompt.findMany({
        where: {
            pending: false
        }
    });
}