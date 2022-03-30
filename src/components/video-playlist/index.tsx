import { PlaylistContainer } from "./style"
import { Playlist, Video } from "../../interfaces";
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
    const [queries] = useSearchParams()
    const channelId = queries.get('channelId');
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
        <PlaylistContainer>
            playlist
        </PlaylistContainer>
    )
}

export const VideoPlaylist = memo(VideoPlaylistBase);