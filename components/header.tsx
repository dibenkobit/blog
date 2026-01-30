import Link from 'next/link';
import { ModeToggle } from '@/components/mode-toggle';

export function Header() {
    return (
        <header>
            <nav className='max-w-xl mx-auto px-5 py-6 flex justify-between items-center'>
                <Link
                    href='/'
                    className='text-[15px] font-medium text-foreground/90 transition-opacity duration-200 hover:opacity-60'
                >
                    dibenko
                </Link>
                <ModeToggle />
            </nav>
        </header>
    );
}
