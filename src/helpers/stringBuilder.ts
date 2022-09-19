export class StringBuilder {
    private notContentLength = 0;
    private categoryTitle?: string;

    public constructor(private content: string = "") {
        this.notContentLength += content.length;
    }

    public appendTitle(title: string, link?: string): StringBuilder {
        if (link) {
            title = `<a href="${link}">${title}</a>`;
        }

        this.appendLineInTags(title, "b");
        this.appendNewLines(1);

        return this;
    }

    public appendCategoryTitle(icon: string, title: string): StringBuilder {
        this.categoryTitle = title;

        const before = this.content.length;
        this.appendLineInTags(`${icon} ${title}`, "b", "u");
        this.notContentLength += this.content.length - before;

        return this;
    }

    public append(content: string): StringBuilder {
        this.content += content;
        return this;
    }

    public appendLine(content: string): StringBuilder {
        return this.append(content).append("\n");
    }

    public appendIf(condition: boolean, func: (builder: StringBuilder) => void): StringBuilder {
        if (condition) {
            func(this);
        }

        return this;
    }

    public appendLineInTags(content: string, ...tags: string[]): StringBuilder {
        return this.appendInTags(content, ...tags).append("\n");
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

    public appendField(key: string, value: string | null | undefined): StringBuilder {
        if (!value) {
            return this;
        }

        this.appendInTags(key, "b");
        this.appendLine(`: ${value}`);

        return this;
    }

    public appendFor<T>(
        iterator: ReadonlyArray<T>,
        func: (builder: StringBuilder, value: T) => void,
    ): StringBuilder {
        for (const value of iterator ?? []) {
            func(this, value);
        }

        return this;
    }

    public trimEnd(): StringBuilder {
        this.content = this.content.trimEnd();
        return this;
    }

    public getContent(): string {
        if (this.categoryTitle && this.notContentLength === this.content.length)
            this.appendLineInTags(`No ${this.categoryTitle?.toLowerCase()} infos`, "i");

        return this.content;
    }
}
