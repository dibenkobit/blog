import Image from 'next/image';

interface ProjectCardProps {
    name: string;
    description: string;
    link: string;
    image?: string;
}

export function ProjectCard({ name, description, link, image }: ProjectCardProps) {
    return (
        <a
            href={link}
            target='_blank'
            rel='noopener noreferrer'
            className='group flex flex-col h-full rounded-lg border border-foreground/10 overflow-hidden transition-colors duration-200 hover:border-foreground/20 hover:bg-foreground/3'
        >
            {image && (
                <div className='aspect-square relative bg-foreground/5'>
                    <Image src={image} alt={name} fill className='object-cover' />
                </div>
            )}
            <div className='p-3 flex-1'>
                <h2 className='text-[14px] text-foreground/80 group-hover:text-foreground transition-colors duration-200'>
                    {name}
                </h2>
                <p className='text-[12px] text-foreground/40 mt-0.5 line-clamp-2'>{description}</p>
            </div>
        </a>
    );
}
