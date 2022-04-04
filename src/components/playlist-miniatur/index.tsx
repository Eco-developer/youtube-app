import TextTruncate from "react-text-truncate";
import { Image } from "../image";
import { Stack } from "@mui/material";
import { PlaylistPlay } from '@mui/icons-material';
import { 
    CountContainer,
    PlaylistMiniaturContainer,
} from "./style";
import { useNavigate } from 'react-router-dom';
import { request } from "../../services";
import { Playlist } from "../../interfaces";
import { VIDEO } from '../../const/routes';
import { 
    KEY, 
    PART 
} from "../../const/youtube-api";

interface VideoCardProps {
    playlist: Playlist,
}

export const PlaylistMiniatur = ({playlist}: VideoCardProps) => {
    const navigate = useNavigate();

    const onClick = async () => {
        try {
            const playlistsItems = await request.get('playlistItems',
                { 
                    params : {
                        part: PART.PLAYLISTITEMS,
                        playlistId: playlist.id,
                        maxResults: '1',
                        key:KEY,
                    }
                }
            );
            navigate(`${VIDEO}?videoId=${playlistsItems.data.items[0].contentDetails.videoId}&playlistId=${playlist.id}&position=0`)
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <PlaylistMiniaturContainer onClick={onClick}>
            <Stack 
                spacing={1} 
                style={{maxWidth: "400px"}} 
                width='100%' 
                height={200}
            >
                <Stack position='relative'>
                    <Image 
                        width='100%' 
                        height={160} 
                        src={playlist.snippet.thumbnails.medium?.url || playlist.snippet.thumbnails.default.url} 
                        alt="video-card"
                    />   
                    <CountContainer>
                        <Stack marginBottom={1}>
                            <p>
                                {playlist.contentDetails.itemCount}
                            </p>
                        </Stack>
                        <Stack>
                            <PlaylistPlay/>
                        </Stack>
                    </CountContainer>                
                </Stack>
                <Stack width="100%" marginTop={1}>
                    <TextTruncate
                        line={1}
                        element="h4"
                        truncateText="…"
                        text={playlist.snippet.title}
                    />   
                </Stack>
            </Stack>
        </PlaylistMiniaturContainer>
    )
}