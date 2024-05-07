import { db } from "~/server/db";
import { type CommentWithUser } from "~/types/comment";

export async function getCommentsForPrompt(promptId: string): Promise<CommentWithUser[]>{
    // Get comments for prompt
    const result = await db.promptComment.findMany({
        where: {
            promptId: promptId
        },
        include: {
            author: {
                select: {
                    name: true
                }
            }
        },
        orderBy: {
            createdAt: 'asc'
        }
    });
    return result;
}

export async function createPromptComment(promptId: string, userId: string, comment: string){
    // Create a comment for a prompt
    return await db.promptComment.create({
        data: {
            promptId: promptId,
            userId: userId,
            comment: comment
        }
    });
}