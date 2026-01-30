'use client';

import { Check, Copy } from 'lucide-react';
import { type ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
    children: ReactNode;
    className?: string;
}

export function CodeBlock({ children, className }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);
    const preRef = useRef<HTMLPreElement>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    const handleCopy = useCallback(async () => {
        const text = preRef.current?.textContent ?? '';
        if (!text) return;

        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy code:', err);
        }
    }, []);

    return (
        <div className='relative group'>
            <pre ref={preRef} className={className}>
                {children}
            </pre>
            <Button
                type='button'
                variant='ghost'
                size='icon-xs'
                className={cn(
                    'absolute top-3 right-3',
                    'opacity-0 group-hover:opacity-100',
                    'transition-opacity duration-200',
                    'text-foreground/40 hover:text-foreground/70',
                    'hover:bg-foreground/5'
                )}
                onClick={handleCopy}
                aria-label={copied ? 'Copied' : 'Copy code'}
            >
                {copied ? <Check className='size-3 text-green-500' /> : <Copy className='size-3' />}
            </Button>
        </div>
    );
}
