"use client"
import { type Prompt } from '@prisma/client';
import * as React from 'react';
import { PromptBox } from '../promptbox';
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { ChevronUp, Copy, CopyCheck, SendHorizonal } from 'lucide-react';
import { Separator } from '../ui/separator';
import { Comments } from './comments';
import { Textarea } from '../ui/textarea';
import { useToast } from '../ui/use-toast';

export interface IPromptsAreaProps {
    prompts: Prompt[];
    userId?: string | undefined;
}

export function PromptsArea (props: IPromptsAreaProps) {
  const [showDetail, setShowDetail] = React.useState<boolean>(false);
  const [activePrompt, setActivePrompt] = React.useState<Prompt | null>(null);
  const [activeCommentPrompt, setActiveCommentPrompt] = React.useState<Prompt | null>(null);
  const [copied, setCopied] = React.useState<boolean>(false);
  const [commentText, setCommentText] = React.useState<string>('');
  const [commentLoading, setCommentLoading] = React.useState<boolean>(false);
  const [commentRefreshState, setCommentRefreshState] = React.useState<number>(0);
  const { toast } = useToast();

  React.useEffect(() => {
    setActiveCommentPrompt(activePrompt);
  }, [activePrompt]);

  const submitComment = async () => {
    if(!activePrompt || !commentText || !props.userId) return;
    setCommentLoading(true);
    // make request to create comment
    const res = await fetch('/api/comment/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({comment: commentText, promptId: activePrompt.id})
    });
    if(res.ok){
      // fetch comments again
      setCommentRefreshState(commentRefreshState + 1);
    }else{
      // show error message
      toast({
        title: 'Error',
        description: 'Failed to add comment',
        variant: 'destructive'
      })
    }
    setCommentLoading(false);
  }

  return (
    <>
      <div className='flex flex-col gap-4'>
          {props.prompts.map((prompt) => (
              <PromptBox 
                key={prompt.id} 
                prompt={prompt}
                openDetail={() => {setActivePrompt(prompt); setShowDetail(true); console.log('showdeetail')}}
                upvote={() => {console.log('upvote request')}}
                downvote={() => {console.log('downvote request')}}
              >
              </PromptBox>
          ))}
      </div>
      <Dialog open={showDetail} onOpenChange={() => setShowDetail(false)}>
        <DialogContent>
          <DialogTitle className='text-lg font-bold'>{activePrompt?.name}</DialogTitle>
          <div className='text-slate-500'>
            <p>{activePrompt?.prompt}</p>
            <Button 
              size="icon" 
              className=' -mb-1 -ml-2 hover:text-slate-900'
            // copy prompt text to clipboard
              onClick={async (e) => {
                await navigator.clipboard.writeText(activePrompt?.prompt ?? '');
                //wait for 1 second before setting copied to false
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 900);
              }}
            >
              {!copied ? (
                <Copy size={24} className='pa-0'/>
              ): (
                <CopyCheck size={24} className='pa-0 text-green-500'/>
              )}
            </Button>
            <Separator className='bg-slate-400 my-4'/>
            <div className='text-md text-slate-900 font-bold mb-2 -mt-2'>Comments</div>
            {(props.userId && activePrompt) && (
              <div className='relative mb-3'>
                  <Textarea 
                    placeholder='Add a comment' 
                    className='w-full border border-slate-400 relative min-h-16' 
                    value={commentText} 
                    onChange={(e) => {setCommentText(e.target.value)}}
                  />
                  <Button 
                      className='text-slate-500 rounded-md p-2 absolute bottom-0 right-0 hover:text-slate-900'
                      onClick={submitComment}
                      disabled={commentLoading}
                  >
                      <SendHorizonal size={24}/>
                  </Button>
              </div>
            )}
            <Comments promptId={activeCommentPrompt?.id} refreshState={commentRefreshState}/>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
