import { VideosWrapper } from "../videos-wrapper";
import { 
    VideosSideWrapper, 
    MoreBtn 
} from "./style";
import { CircularProgress, Stack } from "@mui/material";
import { 
    Dispatch, 
    SetStateAction, 
    useState, 
    memo  
} from "react";
import { request } from "../../services";
import { Video } from "../../interfaces";
import * as API from '../../const/youtube-api';

interface Videos {
    items: Video[]; 
    nextPageToken: string | null | undefined; 
    playlistId: string | null | undefined; 
}

interface Props {
    videoId: string | undefined | null,
    videos: Video[] | null,
    nextPageToken?: string | null | undefined,
    setVideos: Dispatch<SetStateAction<Videos | null>>,
    playlistId?: string | undefined | null
}


export const VideosSideContainerBase = ({videoId, videos, nextPageToken, setVideos, playlistId}: Props) => {
    const [pendingMore, setPendingMore] = useState(false);

    const fethMoreVideos = async () => {
        if (!nextPageToken) {
            return;
        }
        setPendingMore(true);
        try {
            const playlistsItems = await request.get('playlistItems',
                    { 
                        params : {
                            part: 'id,snippet,status,contentDetails',
                            playlistId,
                            maxResults: '50',
                            ...(nextPageToken ? { pageToken: nextPageToken } : {}),
                            key:API.KEY,
                        }
                    }
                );
            setVideos((prevState: Videos | null) => ({items: [...(prevState ? prevState.items : []), ...playlistsItems.data.items], nextPageToken: playlistsItems.data.nextPageToken || null, playlistId}))
        } catch (error) {
            console.log(error)
        }
        setPendingMore(false);
    } 
    return (
       <>
            <VideosSideWrapper>
                <VideosWrapper videos={videos} display='flex' skeletonAmount={5}/>
            </VideosSideWrapper>
            {nextPageToken ?
                <Stack justifyContent="center" alignItems="center">
                    <MoreBtn onClick={fethMoreVideos}>
                        { pendingMore ? 
                            <CircularProgress size={20}/>
                            : "Load More Videos" }
                    </MoreBtn>
                </Stack>
            : null}
       </> 
        
    )
}

export const VideosSideContainer = memo(VideosSideContainerBase);