const CURRENT_YEAR = new Date().getFullYear();

const socialLinks = [
    { href: '/feed.xml', label: 'RSS', external: false },
    { href: 'https://github.com/dibenkobit', label: 'GitHub', external: true },
    { href: 'https://x.com/dibenkobit', label: 'X', external: true }
] as const;

export function Footer() {
    return (
        <footer className='max-w-xl mx-auto px-5 pb-8 w-full flex items-center text-[13px] text-foreground/20'>
            <span>&copy; {CURRENT_YEAR} Nikita Snetkov</span>
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
