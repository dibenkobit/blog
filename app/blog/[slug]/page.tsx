import rehypeShiki from '@shikijs/rehype';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { formatDate, getAllSlugs, getPostBySlug } from '@/lib/posts';

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
        title: `${post.title} | dibenko`,
        description: post.description
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
                <h1 className='text-3xl font-bold mt-2'>{post.title}</h1>
            </header>
            <div className='prose prose-neutral dark:prose-invert max-w-none'>
                <Markdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[
                        [
                            rehypeShiki,
                            {
                                themes: {
                                    light: 'github-light',
                                    dark: 'github-dark'
                                },
                                defaultColor: false
                            }
                        ]
                    ]}
                >
                    {post.content}
                </Markdown>
            </div>
        </article>
    );
}
