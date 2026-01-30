import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
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
    title: 'dibenko',
    description: 'Personal blog'
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
                <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
                    <div className='min-h-screen flex flex-col'>
                        <header className='border-b border-border'>
                            <div className='max-w-2xl mx-auto px-4 py-4 flex justify-between items-center'>
                                <a href='/' className='font-medium text-lg'>
                                    dibenko
                                </a>
                                <ModeToggle />
                            </div>
                        </header>
                        <main className='flex-1 max-w-2xl mx-auto px-4 py-8 w-full'>{children}</main>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
