import { StringBuilder } from "./stringBuilder";

/**
 * Message builder implementation
 */
export class MessageCategoryBuilder extends StringBuilder {
    private startLength: number;

    public constructor(icon: string, private name: string) {
        super();

        this.appendLineInTags(`${icon} ${name}`, "b", "u");
        this.startLength = super.getContent().length;
    }

    public appendField(key: string, value: string | null | undefined): MessageCategoryBuilder {
        if (!value) {
            return this;
        }

        this.appendInTags(key, "b");
        this.appendLine(`: ${value}`);

        return this;
    }

    public override getContent(): string {
        // if the content's length is the same as the title length, then no more content was added,
        // so we display a special message
        if (super.getContent().length === this.startLength) {
            this.appendLineInTags(`No ${this.name.toLocaleLowerCase()} information`, "i");
            this.appendNewLines(1);
        }

        const content: string = super.getContent();
        this.startLength = content.length;
        return content;
    }
}
