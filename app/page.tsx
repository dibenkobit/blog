import Image from 'next/image';
import Link from 'next/link';
import { InlineMarkdown } from '@/components/inline-markdown';
import { formatDate } from '@/lib/date.utils';
import { getAllPosts } from '@/lib/posts';
import { projects } from '@/lib/projects';

export default function Home() {
    const posts = getAllPosts();

    return (
        <section>
            <h1 className='text-[13px] text-foreground/40 mb-1'>Projects</h1>
            {projects.length === 0 ? (
                <p className='text-foreground/40 mb-6'>No projects yet.</p>
            ) : (
                <ul className='grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6'>
                    {projects.map((project) => (
                        <li key={project.name}>
                            <a
                                href={project.link}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='group flex flex-col h-full rounded-lg border border-foreground/10 overflow-hidden transition-colors duration-200 hover:border-foreground/20 hover:bg-foreground/3'
                            >
                                {project.image && (
                                    <div className='aspect-square relative bg-foreground/5'>
                                        <Image src={project.image} alt={project.name} fill className='object-cover' />
                                    </div>
                                )}
                                <div className='p-3 flex-1'>
                                    <h2 className='text-[14px] text-foreground/80 group-hover:text-foreground transition-colors duration-200'>
                                        {project.name}
                                    </h2>
                                    <p className='text-[12px] text-foreground/40 mt-0.5 line-clamp-2'>
                                        {project.description}
                                    </p>
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>
            )}
            <h1 className='text-[13px] text-foreground/40 mb-1'>Posts</h1>
            {posts.length === 0 ? (
                <p className='text-foreground/40'>No posts yet.</p>
            ) : (
                <ul className='flex flex-col'>
                    {posts.map((post) => (
                        <li key={post.slug}>
                            <Link
                                href={`/blog/${post.slug}`}
                                className='group flex items-baseline gap-4 py-2.5 -mx-2 px-2 rounded transition-colors duration-200 hover:bg-foreground/3'
                            >
                                <time className='text-[13px] tabular-nums text-foreground/30 shrink-0'>
                                    {formatDate(post.date)}
                                </time>
                                <span className='text-[15px] text-foreground/80 group-hover:text-foreground transition-colors duration-200'>
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
