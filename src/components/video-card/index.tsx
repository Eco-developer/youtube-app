import TextTruncate from 'react-text-truncate';
import moment from 'moment';
import numeral from 'numeral';
import { Image } from "../image";
import { Stack } from "@mui/material";
import { 
    VideoCardContainer,
    Text,
} from "./style";
import { 
    useNavigate, 
    useLocation, 
    useSearchParams 
} from 'react-router-dom';
import { Video } from "../../interfaces";

interface VideoCardProps {
    video: Video,
    flexDirection?: 'row' | 'column',
    width?: string | number
}

export const VideoCard = ({video, flexDirection='column', width='100%'}: VideoCardProps) => {
    const [queries, setQueries] = useSearchParams();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    
    const handleClick = () => {
        if (!pathname.includes('video')) {
            navigate(`video?videoId=${video.contentDetails?.videoId || video.id}`)
            return;
        }
        setQueries({videoId: video.contentDetails?.videoId || video.id})
    }
    return (
        <VideoCardContainer>
            <Stack spacing={1} style={{maxWidth: "400px"}} width={width} flexDirection={flexDirection} onClick={handleClick}>
                <Image 
                        width='100%' 
                        height={160} 
                        src={video.snippet.thumbnails.high?.url || video.snippet.thumbnails.default.url} 
                        alt="video-card"
                    />                   
                <Stack width="100%" flexDirection='row'>
                    {video.channel? 
                        <Image
                            width='40px' 
                            height={40} 
                            borderRadius='50%'
                            src={video.channel.snippet.thumbnails.default.url} 
                            alt="channel-profile"
                        />
                    : null}
                    
                    <Stack flex={1} flexDirection='column' marginLeft={1}>
                        <Stack marginBottom={1}>
                            <TextTruncate
                                line={2}
                                element="h5"
                                truncateText="…"
                                text={video.snippet.title}
                            />  
                        </Stack>
                        <Stack flex={1}>
                            <Text>
                                {video.snippet.channelTitle}
                            </Text>
                            <Stack flexDirection='row'>
                                {video.statistics?.viewCount ? 
                                    <Text>
                                        {numeral(video.statistics?.viewCount).format('0,0')} 
                                    </Text>
                                : null} 
                                <Text>
                                    {moment(video.snippet.publishedAt, "YYYYMMDD").fromNow()}
                                </Text>
                            </Stack>
                           
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </VideoCardContainer>
    )
}