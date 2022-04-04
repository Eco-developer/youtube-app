import { BrandingSettings } from "./branding-settings";
import { ChannelStatistics } from "./channel-statistics";
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

interface ChannelTopicDetails {
    topicIds: string[],
    topicCategories: string[],
}
    