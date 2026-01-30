import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface InlineMarkdownProps {
    children: string;
}

export function InlineMarkdown({ children }: InlineMarkdownProps) {
    return (
        <Markdown
            remarkPlugins={[remarkGfm]}
            components={{
                p: ({ children }) => <>{children}</>
            }}
        >
            {children}
        </Markdown>
    );
}
