import Link from 'next/link';
import { formatDate, getAllPosts } from '@/lib/posts';

export default function Home() {
    const posts = getAllPosts();

    return (
        <div>
            {posts.length === 0 ? (
                <p className='text-muted-foreground'>No posts yet.</p>
            ) : (
                <ul className='space-y-8'>
                    {posts.map((post) => (
                        <li key={post.slug}>
                            <Link href={`/blog/${post.slug}`} className='group block'>
                                <article>
                                    <time className='text-sm text-muted-foreground'>{formatDate(post.date)}</time>
                                    <h2 className='text-xl font-medium mt-1 group-hover:underline'>{post.title}</h2>
                                    {post.description && (
                                        <p className='text-muted-foreground mt-2'>{post.description}</p>
                                    )}
                                </article>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
