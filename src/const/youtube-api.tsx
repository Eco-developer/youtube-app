export const KEY: string | undefined = process.env.REACT_APP_YOUTUBE_API;
export const PART = {
    SERACH: 'snippet',
    CHANNEL: 'snippet,statistics,brandingSettings,contentDetails,topicDetails',
    VIDEOS: 'id,snippet,contentDetails,statistics,status,topicDetails',
    COMMENTS: 'id,replies,snippet',
    PLAYLIST: 'id,snippet,status',
    PLAYLISTITEMS: 'id,snippet,status,contentDetail',
    CATEGORIES: 'id,snippet',
};
export const MAXRESULTS = {
    SERACH: '50',
    CHANNEL: '50',
    VIDEOS: '50',
    COMMENTS: '100',
    PLAYLIST: '50',
    PLAYLISTITEMS: '50',
};

export const CHART: string= 'mostPopular';
export const REGIONCODE = 'US';
export const ORDER: string = 'relevance';
export const TEXTFORMAT: string = 'plainText';
export const SAFE: string = 'strict';
export const BASE_URL: string = 'https://www.googleapis.com/youtube/v3/';
