import * as React from 'react';

export interface ICommentProps {
   comment: string,
   username: string, 
   date: Date,
}

export function Comment (props: ICommentProps) {
  return (
    <div>
        <div className='flex flex-row gap-4'>
            <div className='flex flex-col'>
            <div className='text-sm font-semibold text-slate-900'>{props.username}</div>
            <div className='text-sm text-slate-500'>{props.comment}</div>
            <div className='text-xs text-slate-500'>{props.date.toDateString()}</div>
            </div>
        </div>
    </div>
  );
}
