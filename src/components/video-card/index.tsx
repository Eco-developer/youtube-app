import TextTruncate from 'react-text-truncate';
import moment from 'moment';
import numeral from 'numeral';
import { Image } from "../image";
import { Stack } from "@mui/material";
import { 
    VideoCardContainer,
    Text,
} from "./style";
import { Video } from "../../interfaces";
import { logo } from "../../const/images";

interface VideoCardProps {
    video: Video,
}

export const VideoCard = ({video}: VideoCardProps) => {
    return (
        <VideoCardContainer>
            <Stack spacing={1} style={{maxWidth: "300px"}} width="100%">
                <Image 
                        width='100%' 
                        height={160} 
                        src={video.snippet.thumbnails.high?.url || video.snippet.thumbnails.default.url} 
                        alt="video-card"
                    />                   
                <Stack width="100%" flexDirection='row'>
                    <Image
                        width='40px' 
                        height={40} 
                        borderRadius='50%'
                        src={video.channel?.snippet.thumbnails.default.url || logo} 
                        alt="channel-profile"
                    />
                    <Stack flex={1} flexDirection='column' marginLeft={1}>
                        <Stack flex={1} marginBottom={1}>
                            <TextTruncate
                                line={2}
                                element="h5"
                                truncateText="…"
                                text={video.snippet.title}
                            />  
                        </Stack>
                        <Stack flex={1}>
                            <Text>
                                {video.channel?.snippet.title}
                            </Text>
                            <Text>
                                {numeral(video.statistics?.viewCount).format('0,0')} {moment(video.snippet.publishedAt, "YYYYMMDD").fromNow()}
                            </Text>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </VideoCardContainer>
    )
}