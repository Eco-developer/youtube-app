import { Thumbnails } from "./thumbnails";

export interface Snippet {
    publishedAt?: string,
    channelId?: string,
    title?: string,
    description?: string,
    thumbnails?: Thumbnails,
    channelTitle?: string,
    customUrl: string,
    tags?: string[],
    categoryId?: string,
    liveBroadcastContent?: string,
    defaultLanguage?: string,
    localized?: {
        title?: string,
        description?:  string,
    },
    defaultAudioLanguage?: string,
    publishTime?: string,
}
