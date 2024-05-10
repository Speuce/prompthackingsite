"use client"
import { type PromptVote, type Prompt } from '@prisma/client';
import { ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import * as React from 'react';
import { Button } from './ui/button';

export interface IPromptBoxProps {
    prompt: Prompt;
    currentVote?: PromptVote | undefined;
    openDetail: () => void;
    changeVote: (oromptId: string, value: boolean) => void;
}

export function PromptBox (props: IPromptBoxProps) {
  const currentVote = props.currentVote?.vote;
  return (
    <div 
      className='border border-2 pt-4 pr-5 pl-4 rounded-xl flex flex-row hover:shadow-lg transition-all cursor-pointer' 
      onClick={(e) => {props.openDetail();}}
    >
        <div className='flex flex-col items-center mr-2 text-slate-400'>
          <Button 
            size="icon" 
            className={`-mt-2 -mb-1 hover:text-slate-900 ${currentVote === true ? 'text-slate-900' : ''}`}
            onClick={(e) => {
              if(currentVote !== true){
                props.changeVote(props.prompt.id, true);
              }
              e.stopPropagation();
            }}
          >
            <ChevronUp size={24} className='pa-0'/>
          </Button>
          <span>{ props.prompt.score }</span>
          <Button 
            size="icon" 
            className={`-mt-2 -mb-1 hover:text-slate-900 ${currentVote === false ? 'text-slate-900' : ''}`}
            onClick={(e) => {
              if(currentVote !== false){
                props.changeVote(props.prompt.id, false);
              }
              e.stopPropagation();
            }}
          >
            <ChevronDown size={24} />
          </Button>
        </div>
        <div>
          <h2 className='text-lg font-semibold'>{props.prompt.name}</h2>
          <p className='text-sm'>{props.prompt.prompt}</p>
          <div className='text-slate-400 flex flex-row items-center'>
            <Button 
              className="-mt-1 -ml-4 hover:text-slate-900"
            >
              <MessageCircle size={18} className='mr-1'/>
              <span>
              {props.prompt.commentCount}
              </span> 
            </Button>
          </div>
        </div>
    </div>
  );
}
