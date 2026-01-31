import { getAllPosts } from '@/features/posts/posts';
import { PostLink } from './post-link';

export function PostsSection() {
    const posts = getAllPosts();

    if (posts.length === 0) {
        return (
            <section>
                <h1 className='text-[13px] text-foreground/40 mb-1'>Posts</h1>
                <p className='text-foreground/40'>No posts yet.</p>
            </section>
        );
    }

    return (
        <section>
            <h1 className='text-[13px] text-foreground/40 mb-1'>Posts</h1>
            <ul className='flex flex-col'>
                {posts.map((post) => (
                    <li key={post.slug}>
                        <PostLink slug={post.slug} title={post.title} date={post.date} />
                    </li>
                ))}
            </ul>
        </section>
    );
}
