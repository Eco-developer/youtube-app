export interface CommentSnippet {
    videoId: string,
    textDisplay: string,
    textOriginal: string,
    authorDisplayName: string,
    authorProfileImageUrl: string,
    authorChannelUrl: string,
    authorChannelId: {
        value: string
    },
    canRate: true,
    viewerRating: string,
    likeCount: number,
    publishedAt: string,
    updatedAt: string,
}