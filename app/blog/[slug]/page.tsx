import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import { CodeBlock } from '@/components/code-block';
import { InlineMarkdown } from '@/components/inline-markdown';
import { AUTHOR_NAME, SITE_URL } from '@/lib/constants';
import { formatDate } from '@/lib/date.utils';
import { getAllSlugs, getPostBySlug } from '@/lib/posts';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
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
        title: post.titlePlain,
        description: post.descriptionPlain,
        openGraph: {
            title: post.titlePlain,
            description: post.descriptionPlain,
            url: `${SITE_URL}/blog/${slug}`,
            type: 'article',
            publishedTime: post.date,
            authors: [AUTHOR_NAME]
        },
        twitter: {
            card: 'summary',
            title: post.titlePlain,
            description: post.descriptionPlain
        },
        alternates: {
            canonical: `${SITE_URL}/blog/${slug}`
        }
    };
}

export default async function PostPage({ params }: Props) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.titlePlain,
        description: post.descriptionPlain,
        datePublished: post.date,
        url: `${SITE_URL}/blog/${slug}`,
        author: {
            '@type': 'Person',
            name: AUTHOR_NAME
        }
    };

    return (
        <>
            <script
                type='application/ld+json'
                // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data requires innerHTML
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <article>
                <header className='mb-0'>
                    <Link
                        href='/'
                        className='text-[13px] text-foreground/40 transition-colors duration-200 hover:text-foreground/70'
                    >
                        ← Back
                    </Link>
                    <time className='block text-[13px] text-foreground/30 mt-8 tabular-nums'>
                        {formatDate(post.date)}
                    </time>
                    <h1 className='text-2xl font-medium tracking-tight text-foreground/90 mt-1.5'>
                        <InlineMarkdown>{post.title}</InlineMarkdown>
                    </h1>
                </header>
                <div className='prose prose-neutral dark:prose-invert max-w-none prose-p:text-foreground/70 prose-p:leading-relaxed prose-headings:font-medium prose-headings:tracking-tight prose-headings:text-foreground/90 prose-a:text-foreground/90 prose-a:underline prose-a:underline-offset-2 prose-a:decoration-foreground/20 hover:prose-a:decoration-foreground/50 prose-strong:text-foreground/90 prose-strong:font-medium prose-code:text-foreground/80 prose-code:font-normal prose-code:bg-foreground/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-transparent'>
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
        </>
    );
}
