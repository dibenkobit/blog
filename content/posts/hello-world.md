---
title: "Hello World"
date: "2026-01-30"
description: "A comprehensive markdown demo showcasing all supported features"
---

This post demonstrates all the markdown features supported by this blog.

## Headers

Headers from h2 to h6 are supported (h1 is reserved for the post title):

### This is h3

#### This is h4

##### This is h5

###### This is h6

## Text Formatting

Regular text can include **bold**, *italic*, and ~~strikethrough~~ formatting. You can also combine them: ***bold and italic***, **bold with ~~strikethrough~~**, or even ***~~all three~~***.

## Lists

### Unordered List

- First item
- Second item
- Third item with nested items:
  - Nested item one
  - Nested item two
    - Even deeper nesting
- Fourth item

### Ordered List

1. First step
2. Second step
3. Third step with sub-steps:
   1. Sub-step one
   2. Sub-step two
4. Fourth step

### Task List

- [x] Completed task
- [x] Another completed task
- [ ] Pending task
- [ ] One more pending task

## Links

Here's an [inline link](https://example.com) and here's a [link with title](https://example.com "Example Website").

Autolinks work too: https://example.com

## Blockquotes

> This is a simple blockquote.
> It can span multiple lines.

Nested blockquotes:

> First level quote
>
> > Nested quote
> >
> > > Even deeper nesting

Blockquote with other elements:

> ### Blockquote with heading
>
> - List item in blockquote
> - Another item
>
> **Bold text** and *italic* work inside quotes.

## Code

Inline code looks like `const x = 42` or `npm install`.

### Code Blocks

JavaScript:

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

const message = greet('World');
console.log(message);
```

TypeScript:

```typescript
interface User {
  id: number;
  name: string;
  email?: string;
}

function getUser(id: number): User | null {
  return { id, name: 'John Doe' };
}
```

Python:

```python
def fibonacci(n: int) -> list[int]:
    if n <= 0:
        return []
    sequence = [0, 1]
    while len(sequence) < n:
        sequence.append(sequence[-1] + sequence[-2])
    return sequence[:n]

print(fibonacci(10))
```

Rust:

```rust
fn main() {
    let numbers: Vec<i32> = (1..=5).collect();
    let doubled: Vec<i32> = numbers.iter().map(|x| x * 2).collect();
    println!("{:?}", doubled);
}
```

CSS:

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

@media (prefers-color-scheme: dark) {
  body {
    background: #0a0a0a;
    color: #ededed;
  }
}
```

Shell:

```bash
#!/bin/bash
for file in *.md; do
  echo "Processing: $file"
  wc -w "$file"
done
```

JSON:

```json
{
  "name": "example",
  "version": "1.0.0",
  "dependencies": {
    "react": "^19.0.0"
  }
}
```

Plain text (no highlighting):

```
This is plain text without syntax highlighting.
It preserves    spacing and
line breaks exactly as written.
```

## Tables

| Feature       | Supported | Notes                    |
|---------------|-----------|--------------------------|
| Headers       | Yes       | h2 through h6            |
| Bold/Italic   | Yes       | Can be combined          |
| Strikethrough | Yes       | GFM extension            |
| Tables        | Yes       | With alignment           |
| Task Lists    | Yes       | Checkboxes               |

Table with alignment:

| Left-aligned | Center-aligned | Right-aligned |
|:-------------|:--------------:|--------------:|
| Left         | Center         | Right         |
| Text         | Text           | Text          |
| Aligned      | Aligned        | Aligned       |

## Horizontal Rules

Content above the rule.

---

Content below the rule.

***

Another section after a different rule syntax.

## Images

![Placeholder image](https://placehold.co/600x400/1a1a1a/ededed?text=Placeholder)

## Escaping Characters

Use backslashes to display literal characters:

\*This is not italic\*

\`This is not code\`

\# This is not a heading

## Conclusion

This post covers most markdown features supported through GitHub Flavored Markdown. Use these elements to create well-structured and readable content.