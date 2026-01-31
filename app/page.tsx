import { PostsSection } from '@/features/posts/components/posts-section';
import { ProjectsSection } from '@/features/projects/components/projects-section';

export default function Home() {
    return (
        <>
            <ProjectsSection />
            <PostsSection />
        </>
    );
}
