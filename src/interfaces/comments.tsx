import { Comment } from './comment';
import { Replies } from './replies';

export interface Comments {
    kind: string,
    etag: string
    id: string,
    snippet: {
        videoId: string,
        topLevelComment: Comment,
        canReply: boolean,
        totalReplyCount: number,
        isPublic: boolean,
    },
    replies?: Replies,
}