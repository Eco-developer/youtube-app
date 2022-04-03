import { VideoInfoContainer } from '../video-info-container/index';
import { VideoInfoSkeleton } from '../video-info-skeleton/index';
import { Skeleton } from '@mui/material';
import { 
    VideoWrapperContainer, 
    VideoWrapper,
} from "./style";
import { Video } from "../../interfaces/index";
import { icon } from '../../const/images';

interface Props {
    video: Video | null
} 

export const VideoContainer = ({video}: Props) => {
    return (
        <VideoWrapperContainer>
            {video ?
                (<>
                    <VideoWrapper>
                        <iframe
                            src={`https://www.youtube.com/embed/${video.id}`}
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                        >
                        </iframe>
                    </VideoWrapper>
                    <VideoInfoContainer
                        viewCount={video.statistics?.viewCount} 
                        videoTitle={video.snippet.title} 
                        likeCount={video.statistics?.likeCount} 
                        description={video.snippet.description} 
                        channelTitle={video.channel?.snippet.channelTitle || video.channel?.snippet.title} 
                        channelProfile={video.channel?.snippet.thumbnails.default.url || icon} 
                        channelId={video?.channel?.id}
                        subscriberCount={video.channel?.statistics.subscriberCount}
                    />
                </>)

            : (
                <>
                    <VideoWrapper>
                        <Skeleton  animation="wave"/>
                    </VideoWrapper>
                    <VideoInfoSkeleton/>
                </>
            )}
        </VideoWrapperContainer>
    )
}