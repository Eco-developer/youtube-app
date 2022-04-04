import { VideosWrapper } from "../videos-wrapper";
import { MoreBtnContainer } from "../more-btn/index";
import { ChannelSectionContainer } from "./style";
import { Video } from "../../interfaces";
import { Dispatch, SetStateAction, useState } from "react";
import * as API from '../../const/youtube-api';
import { request } from "../../services";

interface Videos {
    items: Video[], 
    nextPageToken?: string | null | undefined, 
    uploads: string | null | undefined,
}

interface Props {
    videos: Video[], 
    nextPageToken?: string | null | undefined, 
    uploads: string | null | undefined,
    setVideos: Dispatch<SetStateAction<Videos | null>>,
}

export const ChannelVideosSection = ({videos, nextPageToken, uploads, setVideos}: Props) => {
    const [pendingMore, setPendingMore] = useState<boolean>(false);

    const fethMoreVideos = async () => {
        if (!uploads) {
            return;
        } 
        if (!nextPageToken) {
            return;
        }
        setPendingMore(true);
        try {
            const videosResponse = await request.get('playlistItems',
                    { 
                        params : {
                            part: 'id,snippet,status,contentDetails',
                            playlistId: uploads ,
                            maxResults: '50',
                            key:API.KEY,
                            ...(nextPageToken ? { pageToken: nextPageToken } : {}),
                        }
                    }
                );
            setVideos((prevState: Videos | null) => ({items: [...(prevState?.items ? prevState.items : []), ...videosResponse.data.items], nextPageToken: videosResponse.data.nextPageToken || null, uploads}))
        } catch (error) {
            console.error(error)
        }
        setPendingMore(false);
    } 
    return (
        <ChannelSectionContainer>
            <VideosWrapper videos={videos}/>
            <MoreBtnContainer nextPageToken={nextPageToken} pendingMore={pendingMore} handleClick={fethMoreVideos}/>
        </ChannelSectionContainer>
        
    )
}