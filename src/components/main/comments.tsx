"use client"
import * as React from 'react';
import { Comment } from './comment';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { SendHorizonal } from 'lucide-react';
import { useToast } from '../ui/use-toast';
import { PromptComment } from '@prisma/client';
import { type CommentWithUser } from '~/types/types';
import { Spinner } from '../ui/Spinner';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ICommentsProps {
    promptId?: string | undefined;    
    refreshState: number;
}

export function Comments (props: ICommentsProps) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [comments, setComments] = React.useState<CommentWithUser[]>([]);
  const { toast } = useToast();

  React.useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      // fetch comments from server
      if(!props.promptId) return;

      const response = await fetch(`/api/comment/fetch?promptId=${props.promptId}`);
      if(!response.ok){
        toast({
          title: 'Error',
          description: 'Failed to get comments',
          variant: 'destructive'
        })
      }
      const comments = await response.json() as CommentWithUser[];
      setComments(comments);
      setLoading(false);
    }

    setLoading(true);
    if(props.promptId){
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      fetchComments();
    }
  }, [props.promptId, toast, props.refreshState]);
  return (
    <div>
        <div className='flex flex-col gap-2'>
        {(loading) ? 
          <Spinner />
          : 
          comments.map((comment) => (
              <Comment 
                key={comment.id} 
                username={comment.author.name ?? "unknown"} 
                comment={comment.comment} 
                date={new Date(comment.createdAt)}
              />
          ))
        }
        </div>
    </div>
  );
}
