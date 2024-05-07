import { getCommentsForPrompt } from "~/query/commentQuery";

async function handleGetPromptComments(req: Request){
    if(req.method === 'GET'){
        console.log('GET request to /api/comment/fetch', req.url)
        const promptId = new URLSearchParams(req.url.split('?')[1]).get('promptId');
        if(!promptId){
            return new Response('Bad request', {status: 400});
        }
        const comments = await getCommentsForPrompt(promptId);
        return new Response(JSON.stringify(comments), {status: 200});
    } else {
       return new Response('Method not allowed', {status: 405}); 
    }
}
export { handleGetPromptComments as GET };