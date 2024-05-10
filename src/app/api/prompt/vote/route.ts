import { updatePromptVote } from "~/query/promptQuery";
import { getServerAuthSession } from "~/server/auth";

async function handlePromptVote(req: Request){
    if(req.method === 'POST'){
        const session = await getServerAuthSession();
        const { promptId, vote } = await req.json() as { promptId: string, vote: boolean };
        const user = session?.user;
        // Add prompt to database
        if(!session || !user){
            return new Response('Unauthorized', {status: 401});
        }
        await updatePromptVote(promptId, user.id, vote);
        return Response.json({success: true});
    } else {
       return new Response('Method not allowed', {status: 405}); 
    }
}
export { handlePromptVote as POST };