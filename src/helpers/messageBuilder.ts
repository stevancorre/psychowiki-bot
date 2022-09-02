import { MessageCategoryBuilder } from "./messageCategoryBuilder";
import { StringBuilder } from "./stringBuilder";

export class MessageBuilder extends StringBuilder {
    private categoriesSpaceCount = 2;

    public setCategoriesSpacing(count: number) {
        this.categoriesSpaceCount = count;

        return this;
    }

    public appendTitle(title: string, link?: string): MessageBuilder {
        if (link) {
            title = `<a href="${link}">${title}</a>`;
        }

        this.appendLineInTags(title, "b");
        this.appendNewLines(1);

        return this;
    }

    public appendCategory(category: MessageCategoryBuilder): MessageBuilder {
        let content: string = category.getContent();
        while (!content.endsWith("\n".repeat(this.categoriesSpaceCount))) {
            content += "\n";
        }

        this.appendLine(content);
        return this;
    }
}
