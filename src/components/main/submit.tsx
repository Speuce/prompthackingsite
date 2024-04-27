"use client"
import { type Session } from 'next-auth';
import * as React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Edit, Loader2 } from 'lucide-react';

export interface ISubmitProps {
    session: Session;
}

export default function SubmitArea(props: ISubmitProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [promptName, setPromptName] = React.useState('');
    const [prompt, setPrompt] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    const submitPrompt = async () => {
        const res = await fetch('/api/prompt/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                promptName,
                prompt,
                userEmail: props.session.user.email
            })
        });
        if(res.ok){
            setSuccess(true);
            setIsOpen(false);
        }
    }

    return ((!isOpen) ? (
        <div className='flex flex-col'>
            { (success) && (<span className='text-slate-500'>Thanks for submitting your prompt!</span>)}
            <Button
                className='hover:underline text-slate-400 text-xl p-0 self-start'
                onClick={() => setIsOpen(true)}
            >
                <Edit className='inline-block mr-2 mb-1' size={18} />
                Submit {(success) && "Another "}Prompt
            </Button> 
        </div>
        ) : (
        <div>
            <div className="flex flex-col gap-2">
                <Input placeholder='Prompt Name' className="" value={promptName} onChange={(e) => setPromptName(e.target.value)}></Input>
                <Textarea placeholder='Prompt' className="mt-4 resize-none" value={prompt} onChange={(e) => setPrompt(e.target.value)}></Textarea>
                <Button 
                    variant="outline" 
                    className='mt-4 bg-slate-800 text-slate-100 self-end w-20'
                    onClick={async () => {
                        setIsLoading(true);
                        await submitPrompt();
                    }}
                >
                    {(isLoading) ? (<Loader2 className={`inline-block animate-spin`} size={18} />) : "Submit"}
                </Button>
            </div>
        </div>
        
        )
    );
}
