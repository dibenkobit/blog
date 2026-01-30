import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import { CodeBlock } from '@/components/code-block';
import { InlineMarkdown } from '@/components/inline-markdown';
import { formatDate } from '@/lib/date.utils';
import { getAllSlugs, getPostBySlug } from '@/lib/posts';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const slugs = getAllSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return { title: 'Post not found' };
    }

    return {
        title: post.title,
        description: post.description,
        openGraph: {
            title: post.title,
            description: post.description,
            type: 'article',
            publishedTime: post.date
        },
        twitter: {
            card: 'summary',
            title: post.title,
            description: post.description
        }
    };
}

export default async function PostPage({ params }: Props) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <article>
            <header className='mb-8'>
                <Link href='/' className='text-sm text-muted-foreground hover:underline'>
                    &larr; Back
                </Link>
                <time className='block text-sm text-muted-foreground mt-4'>{formatDate(post.date)}</time>
                <h1 className='text-3xl font-bold mt-2'>
                    <InlineMarkdown>{post.title}</InlineMarkdown>
                </h1>
            </header>
            <div className='prose prose-neutral dark:prose-invert max-w-none'>
                <Markdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                    components={{
                        pre: ({ children, className }) => <CodeBlock className={className}>{children}</CodeBlock>
                    }}
                >
                    {post.content}
                </Markdown>
            </div>
        </article>
    );
}
