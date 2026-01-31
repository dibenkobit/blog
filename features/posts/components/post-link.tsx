import Link from 'next/link';
import { InlineMarkdown } from '@/features/posts/components/inline-markdown';
import { formatDate } from '@/lib/date.utils';

interface PostLinkProps {
    slug: string;
    title: string;
    date: string;
}

export function PostLink({ slug, title, date }: PostLinkProps) {
    return (
        <Link
            href={`/blog/${slug}`}
            className='group flex items-baseline gap-4 py-2.5 -mx-2 px-2 rounded transition-colors duration-200 hover:bg-foreground/3'
        >
            <time className='text-[13px] tabular-nums text-foreground/30 shrink-0'>{formatDate(date)}</time>
            <span className='text-[15px] text-foreground/80 group-hover:text-foreground transition-colors duration-200'>
                <InlineMarkdown>{title}</InlineMarkdown>
            </span>
        </Link>
    );
}
