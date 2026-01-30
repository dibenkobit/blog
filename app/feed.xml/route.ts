import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/constants';
import { getAllPosts } from '@/lib/posts';

export function GET() {
    const posts = getAllPosts();

    const itemsXml = posts
        .map(
            (post) => `
    <item>
      <title><![CDATA[${post.titlePlain}]]></title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
      <description><![CDATA[${post.descriptionPlain}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`
        )
        .join('');

    const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>${itemsXml}
  </channel>
</rss>`;

    return new Response(rssFeed, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600'
        }
    });
}
