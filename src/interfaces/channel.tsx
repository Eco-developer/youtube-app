import { Snippet } from "./snippet";

export interface Channel {
    kind: string,
    etag: string,
    id: string,
    snippet: Snippet,
}