import { Thumbnails } from "./thumbnails"

export interface Playlist {
    kind: string,
    etag: string,
    id: string,
    contentDetails: {
        itemCount: number,
    },
    snippet: {
        publishedAt: string,
        channelId: string,
        title: string,
        description: string,
        thumbnails: Thumbnails
        channelTitle: string
        localized: {
            title: string,
            description: string,
        }
    },
    status: {
        privacyStatus: string,
    }

}