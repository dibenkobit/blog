import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface Post {
    slug: string;
    title: string;
    date: string;
    description: string;
    content: string;
}

export interface PostMeta {
    slug: string;
    title: string;
    date: string;
    description: string;
}

export function getAllPosts(): PostMeta[] {
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const posts = fileNames
        .filter((name) => name.endsWith('.md'))
        .map((fileName) => {
            const slug = fileName.replace(/\.md$/, '');
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data } = matter(fileContents);

            return {
                slug,
                title: data.title || slug,
                date: data.date || '',
                description: data.description || ''
            };
        })
        .sort((a, b) => (a.date > b.date ? -1 : 1));

    return posts;
}

export function getPostBySlug(slug: string): Post | null {
    const fullPath = path.join(postsDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        slug,
        title: data.title || slug,
        date: data.date || '',
        description: data.description || '',
        content
    };
}

export function getAllSlugs(): string[] {
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    return fs
        .readdirSync(postsDirectory)
        .filter((name) => name.endsWith('.md'))
        .map((name) => name.replace(/\.md$/, ''));
}
