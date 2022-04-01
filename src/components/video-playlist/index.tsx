import { PlaylistContainer } from "../playlist-container";
import { PlaylistItem } from '../playlist-item';
import { PlaylistWrapper } from "./style";
import { 
    Dispatch, 
    SetStateAction, 
    memo, 
    useState
} from "react";
import { useSearchParams } from "react-router-dom";
import { 
    KEY, 
    MAXRESULTS, 
    PART 
} from "../../const/youtube-api";
import { request } from "../../services";
import { 
    Playlist, 
    Video 
} from "../../interfaces";
import { v4 as uuid } from 'uuid';

interface Playlists {
    items: Video[]; 
    nextPageToken: string | null | undefined,
    playlistId: string | null | undefined,
    playlistData: Playlist | undefined,
}

interface Props {
    playlist: Video[] | null,
    nextPageToken?: string | null | undefined,
    setPlaylistItems: Dispatch<SetStateAction<Playlists | null>>,
    playlistId: string,
    playlistData: Playlist | undefined,
}

export const VideoPlaylistBase = ({playlist, nextPageToken, setPlaylistItems, playlistId, playlistData}: Props) => {
    console.log(playlist)
    const [pendingMore, setPendingMore] = useState<boolean>(false);
    const [queries] = useSearchParams();
    const currentPosition : string = queries.get('position') || '0';
    console.log(currentPosition);

    const fethMorePlaylistItems = async () => {

        if (!nextPageToken) {
            return;
        }
        setPendingMore(true);
        try {
            const playlistsItemsResponse = await request.get('playlistItems',
                    { 
                        params : {
                            part: PART.PLAYLISTITEMS,
                            playlistId: playlistId,
                            maxResults: MAXRESULTS.PLAYLISTITEMS,
                            key: KEY,
                            ...(nextPageToken ? { pageToken: nextPageToken } : {}),
                        }
                    }
                )
            
                setPlaylistItems((prevState: Playlists | null) => ({items: [...(prevState?.items ? prevState.items : []), ...playlistsItemsResponse.data.items], nextPageToken: playlistsItemsResponse.data.nextPageToken || null, playlistId, playlistData}))
        } catch (error) {
            console.log(error)
        }
        setPendingMore(false);
    } 
    return (
        <PlaylistWrapper>
            {playlist ?
                <PlaylistContainer 
                    playlistData={playlistData} 
                    position={currentPosition} 
                    pendingMore={pendingMore}
                    fethMorePlaylistItems={fethMorePlaylistItems}
                    nextPageToken={nextPageToken}
                >
                    {playlist.map((item: Video) =>(
                        <PlaylistItem 
                            key={uuid()}
                            position={item.snippet.position  || 0}
                            thumbnail={item.snippet.thumbnails.high?.url || item.snippet.thumbnails?.default.url}
                            title={item.snippet.title}
                            channelTitle={item.snippet.channelTitle}  
                            currentPosition={currentPosition}
                            playlistId={playlistId}
                            videoId={item.snippet.resourceId?.videoId}
                        />
                    ))}
                </PlaylistContainer>
                : 'cargando'
            }
        </PlaylistWrapper>
    )
}

export const VideoPlaylist = memo(VideoPlaylistBase);