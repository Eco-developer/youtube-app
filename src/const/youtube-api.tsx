export const KEY = process.env.REACT_APP_YOUTUBE_API;
export const PART = {
    SERACH: 'snippet',
    CHANNEL: 'snippet',
    VIDEOS: 'id,snippet,contentDetails,statistics,status,topicDetails',
};
export const MAXRESULTS = '40';
export const ORDER = 'relevance';
export const SAFE = 'strict';
export const BASE_URL = 'https://www.googleapis.com/youtube/v3/';
