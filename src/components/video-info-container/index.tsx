import TextTruncate from 'react-text-truncate';
import numeral from 'numeral';
import { Image } from '../image/index';
import { 
    StatsInfo,
    MoreContainer
} from "./style";
import { 
    IconButton, 
    Stack, 
    Tooltip 
} from "@mui/material";
import { 
    Visibility, 
    ThumbUpOffAlt, 
    Share, 
    LibraryAdd, 
    ArrowCircleDownSharp, 
    ArrowCircleUpSharp 
} from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { CHANNEL } from '../../const/routes';

interface Props {
    viewCount?: string, 
    videoTitle?: string, 
    likeCount?: string, 
    description?: string, 
    channelTitle?: string, 
    channelProfile: string, 
    subscriberCount?: string,
    channelId?: string,
}

export const VideoInfoContainer = ({viewCount, videoTitle, likeCount, description, channelTitle, channelProfile, subscriberCount, channelId}: Props) => {
    const [more, setMore] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleMore = () => {
        setMore((prevState: boolean) => !prevState);
    }

    const handleGoToChannel = () => {
        navigate(`${CHANNEL}?channelId=${channelId}`);
    }
    console.log(channelId)
    return (
        <Stack flexDirection='column' width="100%" spacing={1} marginTop={1} borderBottom={1} paddingBottom={1} borderColor='#e5e5e5'>
            <Stack>
                <TextTruncate
                    line={1}
                    element="h3"
                    truncateText="…"
                    text={videoTitle}
                /> 
            </Stack>
            <StatsInfo>
                <p>
                    {numeral(viewCount).format('0,0')}
                </p>
                <Tooltip title={numeral(viewCount).format('0,0')} placement="top">
                    <Visibility/>
                </Tooltip>
                <p>
                    {numeral(likeCount).format('0,0a')}
                </p>
                <Tooltip title={numeral(likeCount).format('0,0a')} placement="top">
                    <ThumbUpOffAlt/>
                </Tooltip>
                <p>
                    Share
                </p>
                <Tooltip title='Share' placement="top">
                    <Share/>
                </Tooltip>
                <p>
                    Save
                </p>
                <Tooltip title='Save' placement="top">
                    <LibraryAdd/>
                </Tooltip>
            </StatsInfo>
            <Stack flexDirection='row' spacing={1} alignItems='flex-start' maxHeight={more ? 'none' : 250} overflow="hidden">
                <Stack marginRight={2}>
                    <Image 
                        src={channelProfile} 
                        width="50px" 
                        height={50} 
                        alt="channel-profile"
                        borderRadius="50%"
                        onClick={handleGoToChannel}
                    />
                </Stack>
                <Stack spacing={1} width="calc(100% - 66px);">
                    <h4>
                        {channelTitle}
                    </h4>
                    <p>
                        {numeral(subscriberCount).format('0.00a')}
                    </p>    
                    {description?.split('\n').map((text:string)=> (
                        <h5 key={uuid()}>
                            {text}
                        </h5>                                        
                    ))}
                </Stack>
            </Stack>
            <Stack justifyContent='center' width='100%'>
                <MoreContainer>
                    <IconButton onClick={handleMore}>
                        {!more ? 
                            <ArrowCircleDownSharp/>
                        : <ArrowCircleUpSharp/>}
                    </IconButton>
                </MoreContainer>
                
            </Stack>
        </Stack>
    )
}