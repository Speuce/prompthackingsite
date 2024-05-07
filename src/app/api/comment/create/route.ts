import { createPromptComment } from "~/query/commentQuery";
import { getServerAuthSession } from "~/server/auth";

async function handleCreateComment(req: Request){
    if(req.method === 'POST'){
        const session = await getServerAuthSession();
        const { comment, promptId } = await req.json() as { comment: string, promptId: string };
        const user = session?.user;
        // Add prompt to database
        if(!session || !user ){
            return new Response('Unauthorized', {status: 401});
        }
        if(comment.length < 1 || comment.length > 500){
            return new Response('Comment must be between 1 and 500 characters', {status: 400});
        }
        await createPromptComment(promptId, user.id, comment);
        return Response.json({success: true});
    } else {
       return new Response('Method not allowed', {status: 405}); 
    }
}
export { handleCreateComment as POST };