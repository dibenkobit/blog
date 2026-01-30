import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/posts');

interface Post {
    slug: string;
    title: string;
    date: string;
    description: string;
    content: string;
}

interface PostMeta {
    slug: string;
    title: string;
    date: string;
    description: string;
}

/**
 * Normalizes a date value from frontmatter to ISO string (YYYY-MM-DD).
 * YAML can parse dates as either Date objects (unquoted) or strings (quoted).
 */
function normalizeDate(value: unknown): string {
    if (!value) return '';

    if (value instanceof Date) {
        if (Number.isNaN(value.getTime())) return '';
        return value.toISOString().split('T')[0];
    }

    if (typeof value === 'string') {
        const parsed = new Date(value);
        if (Number.isNaN(parsed.getTime())) return '';
        return parsed.toISOString().split('T')[0];
    }

    return '';
}

/**
 * Validates frontmatter and logs warnings for missing fields.
 */
function validateFrontmatter(data: Record<string, unknown>, slug: string): void {
    const missing: string[] = [];

    if (typeof data.title !== 'string' || !data.title.trim()) {
        missing.push('title');
    }
    if (!data.date) {
        missing.push('date');
    }
    if (typeof data.description !== 'string' || !data.description.trim()) {
        missing.push('description');
    }

    if (missing.length > 0 && process.env.NODE_ENV === 'development') {
        console.warn(`[posts] "${slug}.md" is missing frontmatter: ${missing.join(', ')}`);
    }
}

/**
 * Parses raw frontmatter data into typed PostMeta fields.
 */
function parseFrontmatter(data: Record<string, unknown>, slug: string): Omit<PostMeta, 'slug'> {
    validateFrontmatter(data, slug);

    return {
        title: typeof data.title === 'string' ? data.title : slug,
        date: normalizeDate(data.date),
        description: typeof data.description === 'string' ? data.description : ''
    };
}

export { formatDate } from './date.utils';

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
            const frontmatter = parseFrontmatter(data, slug);

            return { slug, ...frontmatter };
        })
        .sort((a, b) => {
            const dateA = a.date ? new Date(a.date).getTime() : 0;
            const dateB = b.date ? new Date(b.date).getTime() : 0;
            return dateB - dateA;
        });

    return posts;
}

export function getPostBySlug(slug: string): Post | null {
    const fullPath = path.join(postsDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const frontmatter = parseFrontmatter(data, slug);

    return { slug, ...frontmatter, content };
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
