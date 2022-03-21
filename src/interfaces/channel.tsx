import { Snippet } from "./snippet";

export interface Channel {
    kind: string,
    etag: string,
    id: string,
    snippet: Snippet,
    contentDetails: ChannelContentDetails,
    statistics: ChannelStatistics,
    topicDetails: ChannelTopicDetails,
    brandingSettings: BrandingSettings,
}

interface ChannelContentDetails {
    relatedPlaylists: {
        likes: string,
        uploads: string,
    }
}

interface ChannelStatistics {
    viewCount: string,
    subscriberCount: string,
    hiddenSubscriberCount: boolean,
    videoCount: string,
}

interface ChannelTopicDetails {
    topicIds: string[],
    topicCategories: string[],
}
interface BrandingSettings {
    channel: {
        title: string,
        description: string,
        keywords: string,
        trackingAnalyticsAccountId: string,
        moderateComments: boolean,
        country: string,
    },
    image: {
        bannerExternalUrl: string,
    }
}
    