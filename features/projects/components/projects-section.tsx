import { projects } from '@/features/projects/projects';
import { ProjectCard } from './project-card';

export function ProjectsSection() {
    if (projects.length === 0) {
        return (
            <section className='mb-6'>
                <h1 className='text-[13px] text-foreground/40 mb-1'>Projects</h1>
                <p className='text-foreground/40'>No projects yet.</p>
            </section>
        );
    }

    return (
        <section className='mb-6'>
            <h1 className='text-[13px] text-foreground/40 mb-1'>Projects</h1>
            <ul className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
                {projects.map((project) => (
                    <li key={project.name}>
                        <ProjectCard
                            name={project.name}
                            description={project.description}
                            link={project.link}
                            image={project.image}
                        />
                    </li>
                ))}
            </ul>
        </section>
    );
}
