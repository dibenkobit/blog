import { fromMarkdown } from 'mdast-util-from-markdown';
import { gfmFromMarkdown } from 'mdast-util-gfm';
import { toString as mdastToString } from 'mdast-util-to-string';
import { micromark } from 'micromark';
import { gfm, gfmHtml } from 'micromark-extension-gfm';

/**
 * Strips markdown syntax and returns plain text.
 * Useful for SEO metadata where markdown should not appear.
 */
export function stripMarkdown(markdown: string): string {
    const tree = fromMarkdown(markdown, {
        extensions: [gfm()],
        mdastExtensions: [gfmFromMarkdown()]
    });

    return mdastToString(tree);
}

/**
 * Renders inline markdown to HTML, stripping the wrapping <p> tag.
 * Useful for rendering titles and short text with inline formatting.
 */
export function renderInlineMarkdown(markdown: string): string {
    const html = micromark(markdown, {
        extensions: [gfm()],
        htmlExtensions: [gfmHtml()]
    });

    // Strip wrapping <p> tags for inline usage
    return html.replace(/^<p>|<\/p>\n?$/g, '');
}
