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
import { icon } from "../../const/images";
import { VideoPlaylistSkeleton } from "../video-playlist-skeleton";

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

    const prevPosition: number | null = playlist ? (parseInt(currentPosition) === 0 ? null : parseInt(currentPosition) - 1) : null; 
    const nextPosition: number | null = playlist ? (parseInt(currentPosition) === playlist.length - 1 ? null : parseInt(currentPosition) + 1) : null;  

    const prevVideoId: string | null | undefined = playlist ? (prevPosition !== null ? playlist[prevPosition].snippet.resourceId?.videoId : null) : null;  
    const nextVideoId: string | null | undefined = playlist ? (nextPosition ? playlist[nextPosition].snippet.resourceId?.videoId : null) : null; 

    console.log(prevVideoId);
    console.log(nextVideoId)

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
                    prevPosition={prevPosition}
                    prevVideoId={prevVideoId}
                    nextPosition={nextPosition}
                    nextVideoId={nextVideoId}                    
                >
                    {playlist.map((item: Video) =>(
                        <PlaylistItem 
                            key={uuid()}
                            position={item.snippet.position  || 0}
                            thumbnail={item.snippet.thumbnails.high?.url || item.snippet.thumbnails?.default?.url || icon}
                            title={item.snippet.title}
                            channelTitle={item.snippet.channelTitle}  
                            currentPosition={currentPosition}
                            playlistId={playlistId}
                            videoId={item.snippet.resourceId?.videoId}
                        />
                    ))}
                </PlaylistContainer>
                : <VideoPlaylistSkeleton/>
            }
        </PlaylistWrapper>
    )
}

export const VideoPlaylist = memo(VideoPlaylistBase);