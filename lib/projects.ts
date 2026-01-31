export interface Project {
    name: string;
    description: string;
    image?: string;
    link: string;
}

export const projects: Project[] = [
    {
        name: 'Konductor',
        description: 'Multi-agent IDE',
        image: '/images/projects/konductor.png',
        link: 'https://konductor.exoform.ai'
    },
    {
        name: 'ExoForm',
        description: 'Technical mock interviews but with AI',
        image: '/images/projects/exoform.png',
        link: 'https://exoform.ai'
    },
    {
        name: 'babygit',
        description: 'CLI tool that will generate git commit messages for you based on your preferences',
        image: '/images/projects/babygit.png',
        link: 'https://babygit.dev'
    }
];
