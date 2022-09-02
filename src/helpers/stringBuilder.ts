export class StringBuilder {
    public constructor(private content: string = "") {}

    public append(content: string): StringBuilder {
        this.content += content;
        return this;
    }

    public appendLine(content: string): StringBuilder {
        return this.append(content).append("\n");
    }

    public appendLines(...lines: string[]): StringBuilder {
        return this.appendLine(lines.join("\n"));
    }

    public appendNewLines(count: number): StringBuilder {
        return this.append("\n".repeat(count));
    }

    public appendInTags(content: string, ...tags: string[]): StringBuilder {
        // opening tags
        for (const tag of tags) {
            this.append(`<${tag}>`);
        }

        // content
        this.append(content);

        // closing tags
        const reversedTags: string[] = tags.reverse();
        for (const tag of reversedTags) {
            this.append(`</${tag}>`);
        }

        return this;
    }

    public appendLineInTags(content: string, ...tags: string[]): StringBuilder {
        return this.appendInTags(content, ...tags).append("\n");
    }

    public getContent(): string {
        return this.content;
    }

    public trimEnd(): StringBuilder {
        this.content = this.content.trimEnd();
        return this;
    }
}
