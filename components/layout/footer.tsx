import { AUTHOR_NAME } from '@/config/site';

const socialLinks = [
    { href: '/feed.xml', label: 'RSS', external: false },
    { href: 'https://github.com/dibenkobit', label: 'GitHub', external: true },
    { href: 'https://www.linkedin.com/in/snetkov-nikita/', label: 'LinkedIn', external: true },
    { href: 'https://x.com/dibenkobit', label: 'X', external: true }
] as const;

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className='max-w-xl mx-auto px-5 pb-8 w-full flex items-center text-[13px] text-foreground/20'>
            <span>
                &copy; {currentYear} {AUTHOR_NAME}
            </span>
            <nav className='ml-auto flex items-center'>
                {socialLinks.map((link, index) => (
                    <span key={link.href} className='contents'>
                        {index > 0 && <span className='mx-2'>&middot;</span>}
                        <a
                            href={link.href}
                            className='transition-colors hover:text-foreground/40'
                            {...(link.external && { target: '_blank', rel: 'noopener noreferrer' })}
                        >
                            {link.label}
                        </a>
                    </span>
                ))}
            </nav>
        </footer>
    );
}
