"use client"
import { type Prompt } from '@prisma/client';
import { ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import * as React from 'react';
import { Button } from './ui/button';

export interface IPromptBoxProps {
    prompt: Prompt;
    openDetail: () => void;
    upvote: () => void;
    downvote: () => void;
}

export function PromptBox (props: IPromptBoxProps) {
  return (
    <div 
      className='border border-2 pt-4 pr-5 pl-4 rounded-xl flex flex-row hover:shadow-lg transition-all cursor-pointer' 
      onClick={(e) => {props.openDetail();}}
    >
        <div className='flex flex-col items-center mr-2 text-slate-400'>
          <Button 
            size="icon" 
            className='-mt-2 -mb-1 hover:text-slate-900'
            onClick={(e) => {props.upvote(); e.stopPropagation();}}
          >
            <ChevronUp size={24} className='pa-0'/>
          </Button>
          <span>542</span>
          <Button 
            size="icon" 
            className="-mt-1 hover:text-slate-900"
            onClick={(e) => {props.downvote(); e.stopPropagation();}}
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
                542
              </span> 
            </Button>
          </div>
        </div>
    </div>
  );
}
