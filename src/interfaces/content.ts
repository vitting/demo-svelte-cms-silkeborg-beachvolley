import type { ContentSection } from "./content-section";

export interface Content {
    id: string;
    date: Date;
    sections: ContentSection[];
}