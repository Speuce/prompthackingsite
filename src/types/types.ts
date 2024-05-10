import { type PromptVote, type Prompt, type PromptComment } from "@prisma/client";

export type CommentWithUser = PromptComment & { author: { name: string | null}}

export type PromptWithInfo = Prompt & { votes?: PromptVote[] | undefined }