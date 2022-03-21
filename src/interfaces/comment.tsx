import { CommentSnippet } from './comment-snippet';

export interface Comment {
    kind: string,
    etag: string,
    id: string,
    snippet: CommentSnippet,
}