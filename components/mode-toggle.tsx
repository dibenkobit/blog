'use client';

import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const themes = ['light', 'dark', 'system'] as const;
type Theme = (typeof themes)[number];

export function ModeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const cycleTheme = useCallback(() => {
        const currentIndex = themes.indexOf((theme as Theme) ?? 'system');
        const nextIndex = (currentIndex + 1) % themes.length;
        setTheme(themes[nextIndex]);
    }, [theme, setTheme]);

    if (!mounted) {
        return (
            <Button
                variant='ghost'
                size='icon'
                className='h-8 w-8 text-foreground/40 hover:text-foreground/70 hover:bg-transparent'
                aria-label='Toggle theme'
            >
                <Sun className='h-4 w-4' />
            </Button>
        );
    }

    return (
        <Button
            variant='ghost'
            size='icon'
            className='h-8 w-8 text-foreground/40 hover:text-foreground/70 hover:bg-transparent transition-colors duration-200'
            onClick={cycleTheme}
            aria-label={`Current theme: ${theme}. Click to cycle.`}
        >
            {theme === 'light' && <Sun className='h-4 w-4' />}
            {theme === 'dark' && <Moon className='h-4 w-4' />}
            {theme === 'system' && <Monitor className='h-4 w-4' />}
        </Button>
    );
}
