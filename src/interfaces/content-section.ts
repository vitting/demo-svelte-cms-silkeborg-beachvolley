import type { ContentItem } from "./content-item";
import type { ContentParagraph } from "./content-paragraph";

export interface ContentSection {
    id: string;
    date: Date;
    title: string;
    image: string;
    text: string;
    paragraphs: ContentParagraph[];
    items: ContentItem[];
}