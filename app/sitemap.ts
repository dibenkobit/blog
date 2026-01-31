import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';
import { getAllPosts } from '@/lib/posts';

export default function sitemap(): MetadataRoute.Sitemap {
    const posts = getAllPosts();

    const postEntries = posts.map((post) => ({
        url: `${SITE_URL}/blog/${post.slug}`,
        lastModified: new Date(post.date)
    }));

    return [
        {
            url: SITE_URL,
            lastModified: new Date()
        },
        ...postEntries
    ];
}
