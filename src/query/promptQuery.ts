import { type User } from "@prisma/client";
import { db } from "~/server/db";
import { type PromptWithInfo } from "~/types/types";

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

export async function getAllActivePrompts(): Promise<PromptWithInfo[]>{
    return await db.prompt.findMany({
        where: {
            pending: false
        },
        orderBy: {
            score: 'desc'
        },
    });
}

export async function incrementPromptCommentCount(promptId: string){
    await db.prompt.update({
        where: {
            id: promptId
        },
        data: {
            commentCount: {
                increment: 1
            }
        }
    });
}

export async function getAllActivePromptsWithUserInfo(userId: string): Promise<PromptWithInfo[]>{
    return await db.prompt.findMany({
        where: {
            pending: false
        },
        orderBy: {
            score: 'desc'
        },
        include: {
            // votes where user id is equal to the user id passed in
            votes: {
                where: {
                    userId: userId
                }
            },
        }
    });
}

export async function updatePromptVote(promptId: string, userId: string, vote: boolean){
    const result = await db.promptVote.upsert({
        where: {
            promptId_userId: {
                promptId: promptId,
                userId: userId
            }
        },
        create: {
            promptId: promptId,
            userId: userId,
            vote: vote
        },
        update: {
            vote: vote
        }
    });
    const newVote = (result.createdAt === result.updatedAt)
    const voteChange = newVote ? 1 : 2;
    const voteSign = vote ? 1 : -1;
    const voteTotal = voteChange * voteSign;
    await db.prompt.update({
        where: {
            id: promptId
        },
        data: {
            score: {
                increment: voteTotal,
            }
        }
    });
    return result;

}

