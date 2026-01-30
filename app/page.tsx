import Link from 'next/link';
import { InlineMarkdown } from '@/components/inline-markdown';
import { formatDate } from '@/lib/date.utils';
import { getAllPosts } from '@/lib/posts';

export default function Home() {
    const posts = getAllPosts();

    return (
        <section>
            {posts.length === 0 ? (
                <p className='text-foreground/40'>No posts yet.</p>
            ) : (
                <ul className='flex flex-col gap-1'>
                    {posts.map((post) => (
                        <li key={post.slug}>
                            <Link
                                href={`/blog/${post.slug}`}
                                className='group flex items-baseline gap-4 py-2 -mx-2 px-2 rounded transition-colors duration-200 hover:bg-foreground/[0.03]'
                            >
                                <time className='text-[13px] tabular-nums text-foreground/30 shrink-0'>
                                    {formatDate(post.date)}
                                </time>
                                <span className='text-[15px] text-foreground/90 group-hover:text-foreground transition-colors duration-200'>
                                    <InlineMarkdown>{post.title}</InlineMarkdown>
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
