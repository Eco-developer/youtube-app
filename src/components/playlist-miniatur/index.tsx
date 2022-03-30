import { Image } from "../image";
import { Stack } from "@mui/material";
import { PlaylistPlay } from '@mui/icons-material';
import { 
    CountContainer,
    PlaylistMiniaturContainer,
} from "./style";
import { 
    useNavigate, 
    useSearchParams 
} from 'react-router-dom';
import { request } from "../../services";
import { Playlist } from "../../interfaces";
import { VIDEO } from '../../const/routes';
import { KEY, PART } from "../../const/youtube-api";

interface VideoCardProps {
    playlist: Playlist,
}

export const PlaylistMiniatur = ({playlist}: VideoCardProps) => {
   const [queries, setQueries] = useSearchParams();
    const navigate = useNavigate();
     /*const { pathname } = useLocation();
    
    const handleClick = () => {
        if (!pathname.includes('video')) {
            navigate(`${VIDEO}?videoId=${video.contentDetails?.videoId || video.id}`)
            return;
        }
        setQueries({videoId: video.contentDetails?.videoId || video.id})
    }*/
    const onClick = async () => {
        console.log(playlist)
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
            console.log()
            navigate(`${VIDEO}?videoId=${playlistsItems.data.items[0].contentDetails.videoId}&playlistId=${playlist.id}`)
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <PlaylistMiniaturContainer onClick={onClick}>
            <Stack spacing={1} style={{maxWidth: "400px"}} width='100%' height={200}>
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
                    <h4>
                        {playlist.snippet.title}
                    </h4>
                </Stack>
            </Stack>
        </PlaylistMiniaturContainer>
    )
}