"use client"
import * as React from 'react';
import { Comment } from './comment';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { SendHorizonal } from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ICommentsProps {
    promptId?: string | undefined;    
}

export function Comments (props: ICommentsProps) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [comments, setComments] = React.useState<Comment[]>([]);

  React.useEffect(() => {
    setLoading(true);
    // fetch comments from server
    // setComments(response.comments)
    setLoading(false);
  });
  return (
    <div>
        <div className='text-md text-slate-900 font-bold mb-2 -mt-2'>Comments</div>
        {/* comment submission */}
        <div className='relative mb-3'>
            <Textarea placeholder='Add a comment' className='w-full border border-slate-400 relative min-h-16'/>
            <Button 
                className='text-slate-500 rounded-md p-2 absolute bottom-0 right-0 hover:text-slate-900'
            >
                <SendHorizonal size={24}/>
            </Button>
        </div>
        <Comment username='user1' comment='This is a comment' date={new Date()}/>
    </div>
  );
}
