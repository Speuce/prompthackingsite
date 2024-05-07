"use client"
import { type Prompt } from '@prisma/client';
import * as React from 'react';
import { PromptBox } from '../promptbox';

export interface IPromptsAreaProps {
    prompts: Prompt[];
}

export function PromptsArea (props: IPromptsAreaProps) {


  return (
    <div className='flex flex-col gap-4'>
        {props.prompts.map((prompt) => (
            <PromptBox 
              key={prompt.id} 
              prompt={prompt}
              openDetail={() => {console.log('detail open request')}}
              upvote={() => {console.log('upvote request')}}
              downvote={() => {console.log('downvote request')}}
            >
            </PromptBox>
        ))}
    </div>
  );
}
