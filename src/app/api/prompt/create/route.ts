import { createPendingPrompt } from "~/query/promptQuery";
import { getUserByEmail } from "~/query/userQuery";
import { getServerAuthSession } from "~/server/auth";

async function handleCreatePrompt(req: Request){
    if(req.method === 'POST'){
        const session = await getServerAuthSession();
        const { promptName, prompt, userEmail } = await req.json() as { promptName: string, prompt: string, userEmail: string};
        // Add prompt to database
        const user = await getUserByEmail(userEmail);
        if(!session || !user || user.email !== session.user.email){
            return new Response('Unauthorized', {status: 401});
        }
        await createPendingPrompt(promptName, prompt, user);
        return Response.json({success: true});
    } else {
       return new Response('Method not allowed', {status: 405}); 
    }
}
export { handleCreatePrompt as POST };