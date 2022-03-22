import { useEffect, useState } from "react";
import { request } from "../../services";
import { VideosSideWrapper } from "./style";
import { VideosWrapper } from "../videos-wrapper";
import { Video } from "../../interfaces";
import * as API from '../../const/youtube-api';

interface Props {
    videoId: string | undefined | null,
    videos: Video[] | null,
}


export const VideosSideContainer = ({videoId, videos}: Props) => {
    console.log(videos)
    return (
        <VideosSideWrapper>
            <VideosWrapper videos={videos} display='flex'/>
        </VideosSideWrapper>
    )
}