"use client"
import { type Prompt } from '@prisma/client';
import * as React from 'react';
import { PromptBox } from '../promptbox';
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { ChevronUp, Copy, CopyCheck } from 'lucide-react';
import { Separator } from '../ui/separator';
import { Comments } from './comments';

export interface IPromptsAreaProps {
    prompts: Prompt[];
}

export function PromptsArea (props: IPromptsAreaProps) {
  const [showDetail, setShowDetail] = React.useState<boolean>(false);
  const [activePrompt, setActivePrompt] = React.useState<Prompt | null>(null);
  const [copied, setCopied] = React.useState<boolean>(false);

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
            <Comments promptId={activePrompt?.id}/>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
