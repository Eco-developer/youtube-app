import { VideosWrapper } from "../videos-wrapper/index";
import { MoreBtnContainer } from "../more-btn";
import { 
    Dispatch, 
    SetStateAction, 
    useState 
} from "react";
import { 
    Channel, 
    Video 
} from "../../interfaces";
import * as API from "../../const/youtube-api";
import { request } from "../../services";

interface Props {
    videos?: Video[]| null,
    nextPageToken?: string | null | undefined,
    q: string | null,
    setVideos: Dispatch<SetStateAction<SetVideos | null>>,
}

interface SetVideos {
    items: Video[] | null, 
    nextPageToken?: string | null | undefined, 
}

interface SearchItem {
    etag: string
    id: {
      kind: string, 
      videoId: string
    }
    kind: string
}

export const ResulstMain = ({videos, nextPageToken, q, setVideos}: Props) => {
    const [pendingMore, setPendingMore] = useState(false);

    const fethMoreVideos = async () => {
        if (!q) {
            return;
        } 
        if (!nextPageToken) {
            return;
        }
        setPendingMore(true);
        try {
            const searchResponse = await request.get('search',
                {
                params : {
                    maxResults: API.MAXRESULTS.SERACH,
                    part: API.PART.SERACH,
                    q,
                    safeSearch: API.SAFE,
                    order: API.ORDER,
                    type: API.TYPE,
                    key: API.KEY,
                    regionCode: API.REGIONCODE,
                    ...(nextPageToken ? { pageToken: nextPageToken } : {}),
                },
                }
            )
        
            const videosIds = searchResponse.data.items.map((item: SearchItem) => item.id.videoId);
            
            const videosResponse = await request.get('videos',
                { 
                    params : {
                        maxResults: API.MAXRESULTS.VIDEOS,
                        part: API.PART.VIDEOS,
                        id: videosIds.join(','),
                        key: API.KEY,
                    }
                }
            );

            const channelsId : (string | undefined)[] = Array.from(new Set(videosResponse.data.items.map((item:Video) => item.snippet?.channelId)))

            const channelsResponse = await request.get('channels',
                { 
                    params : {
                        maxResults: API.MAXRESULTS.CHANNEL,
                        part: API.PART.CHANNEL,
                        id: channelsId.join(','),
                        key:API.KEY,
                    }
                }
            );  
            const videosItems : Video[] = videosResponse.data.items.map((itemVideo: Video) => {
            const channel = channelsResponse.data.items.find((itemChannel: Channel) => itemChannel.id === itemVideo.snippet?.channelId)
                        return {
                ...itemVideo,
                channel,
                        }
                    })
            setVideos((prevState: SetVideos | null) => ({items: [...(prevState?.items ? prevState.items : []), ...videosItems], nextPageToken: searchResponse.data.nextPageToken || null}))
        } catch (error) {
            console.log(error)
        }
        setPendingMore(false);
    } 
    return (
        <>
            <VideosWrapper videos={videos || null}/> 
            <MoreBtnContainer 
                nextPageToken={nextPageToken} 
                pendingMore={pendingMore} 
                handleClick={fethMoreVideos}
            />
        </>
    )
}