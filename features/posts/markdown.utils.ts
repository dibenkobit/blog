import { fromMarkdown } from 'mdast-util-from-markdown';
import { gfmFromMarkdown } from 'mdast-util-gfm';
import { toString as mdastToString } from 'mdast-util-to-string';
import { gfm } from 'micromark-extension-gfm';

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
