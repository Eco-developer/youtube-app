import TextTruncate from 'react-text-truncate';
import {
    PlaylistWrapper, 
    PlaylistItem, 
    ItemContainer, 
    InfoContainer, 
    PlaylistTittle
} from "./style";
import { PlaylistContainer } from "../playlist-container";
import { 
    Dispatch, 
    SetStateAction, 
    memo, 
    useState
} from "react";
import { useSearchParams } from "react-router-dom";
import { request } from "../../services";
import { 
    Playlist, 
    Video 
} from "../../interfaces";
import { Image } from "../image";
import { 
    KEY, 
    MAXRESULTS, 
    PART 
} from "../../const/youtube-api";
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
    const position : string = queries.get('position') || '0';
    console.log(position);
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
                <PlaylistContainer playlistData={playlistData} position={position}>
                    {playlist.map((item: Video) =>(
                        <PlaylistItem>
                            {item.snippet.position}
                            <ItemContainer>
                                <Image src={item.snippet.thumbnails?.default.url} alt='item' height={90} width='120px' />
                                <InfoContainer>
                                    <PlaylistTittle>
                                        <TextTruncate
                                            line={2}
                                            element="h4"
                                            truncateText="…"
                                            text={item.snippet.title}
                                        /> 
                                    </PlaylistTittle>
                                    <PlaylistTittle>
                                        <TextTruncate
                                            line={1}
                                            element="p"
                                            truncateText="…"
                                            text={item.snippet.channelTitle}
                                        /> 
                                    </PlaylistTittle>
                                </InfoContainer>
                            </ItemContainer>
                        </PlaylistItem>
                    ))}
                </PlaylistContainer>
                : 'cargando'
            }
        </PlaylistWrapper>
    )
}

export const VideoPlaylist = memo(VideoPlaylistBase);