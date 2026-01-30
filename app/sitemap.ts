import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';

export default function sitemap(): MetadataRoute.Sitemap {
    const posts = getAllPosts();

    const postEntries = posts.map((post) => ({
        url: `https://dibenko.com/blog/${post.slug}`,
        lastModified: new Date(post.date)
    }));

    return [
        {
            url: 'https://dibenko.com',
            lastModified: new Date()
        },
        ...postEntries
    ];
}
