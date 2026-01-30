import Link from 'next/link';
import { formatDate } from '@/lib/date.utils';
import { getAllPosts } from '@/lib/posts';

export default function Home() {
    const posts = getAllPosts();

    return (
        <section>
            <h1 className='text-[13px] text-foreground/40 mb-8'>Writing</h1>
            {posts.length === 0 ? (
                <p className='text-foreground/40'>No posts yet.</p>
            ) : (
                <ul className='flex flex-col'>
                    {posts.map((post) => (
                        <li key={post.slug}>
                            <Link
                                href={`/blog/${post.slug}`}
                                className='group flex items-baseline gap-4 py-2.5 -mx-2 px-2 rounded transition-colors duration-200 hover:bg-foreground/[0.03]'
                            >
                                <time className='text-[13px] tabular-nums text-foreground/30 shrink-0'>
                                    {formatDate(post.date)}
                                </time>
                                <span
                                    className='text-[15px] text-foreground/80 group-hover:text-foreground transition-colors duration-200'
                                    // biome-ignore lint/security/noDangerouslySetInnerHtml: Pre-rendered from trusted local markdown
                                    dangerouslySetInnerHTML={{ __html: post.titleHtml }}
                                />
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
