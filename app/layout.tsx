import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import { ModeToggle } from '@/components/mode-toggle';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin']
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin']
});

export const metadata: Metadata = {
    metadataBase: new URL('https://dibenko.com'),
    title: {
        default: 'dibenko',
        template: '%s | dibenko'
    },
    description: 'Thoughts on software engineering, technology, and building products.',
    authors: [{ name: 'Nikita Snetkov' }],
    openGraph: {
        title: 'dibenko',
        description: 'Thoughts on software engineering, technology, and building products.',
        url: 'https://dibenko.com',
        type: 'website',
        locale: 'en_US',
        siteName: 'dibenko'
    },
    twitter: {
        card: 'summary',
        title: 'dibenko',
        description: 'Thoughts on software engineering, technology, and building products.'
    },
    alternates: {
        canonical: 'https://dibenko.com'
    }
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en' suppressHydrationWarning>
            <head>
                <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
                <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
                <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
                <link rel='manifest' href='/site.webmanifest' />
            </head>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
                    <div className='min-h-screen flex flex-col'>
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
                        <main className='flex-1 max-w-xl mx-auto px-5 pt-12 pb-24 w-full'>{children}</main>
                        <footer className='max-w-xl mx-auto px-5 pb-8 w-full'>
                            <p className='text-[13px] text-foreground/20'>© {new Date().getFullYear()}</p>
                        </footer>
                    </div>
                </ThemeProvider>
                <Analytics />
            </body>
        </html>
    );
}
