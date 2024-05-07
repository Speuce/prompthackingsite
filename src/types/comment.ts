import { type PromptComment } from "@prisma/client";

export type CommentWithUser = PromptComment & { author: { name: string | null}}