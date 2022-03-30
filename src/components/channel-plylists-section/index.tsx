import { PlaylistMiniatur } from "../playlist-miniatur";
import { 
    PlaylistsWrapperContainer, 
    SectionContainer 
} from "./style";
import { v4 as uuid } from 'uuid';
import { Playlist } from "../../interfaces";
import { MoreBtnContainer } from "../more-btn/index";
import { 
    Dispatch, 
    SetStateAction, 
    useState 
} from "react";
import { request } from "../../services";
import { useSearchParams } from "react-router-dom";
import { 
    KEY, 
    PART 
} from "../../const/youtube-api";

interface Playlists {
    items: Playlist[],
    nextPageToken?: string | null | undefined,
}

interface Props {
    playlists: Playlist[],
    nextPageToken?: string | null | undefined,
    setPlaylists: Dispatch<SetStateAction<Playlists | null>>,
}

export const ChannelPlaylistsSection = ({playlists, nextPageToken, setPlaylists}: Props) => {
    const [pendingMore, setPendingMore] = useState<boolean>(false);
    const [queries] = useSearchParams()
    const channelId = queries.get('channelId');
    const fethMorePlaylists = async () => {

        if (!nextPageToken) {
            return;
        }
        setPendingMore(true);
        try {
            const playlistsSectionResponse = await request.get('playlists',
                { 
                    params : {
                        part: PART.PLAYLIST,
                        channelId,
                        maxResults: '50',
                        key: KEY,
                        ...(nextPageToken ? { pageToken: nextPageToken } : {}),
                    }
                }
            )
            
            setPlaylists((prevState: Playlists | null) => ({items: [...(prevState?.items ? prevState.items : []), ...playlistsSectionResponse.data.items.filter((item: Playlist) => item.contentDetails.itemCount > 1)], nextPageToken: playlistsSectionResponse.data.nextPageToken || null}))
        } catch (error) {
            console.log(error)
        }
        setPendingMore(false);
    } 
    return (
        <SectionContainer>
            <PlaylistsWrapperContainer>
                {playlists.length ?
                    playlists.map((playlist: Playlist) =>(
                        <PlaylistMiniatur playlist={playlist} key={uuid()}/>
                    ))
                : null}
            </PlaylistsWrapperContainer>
            <MoreBtnContainer 
                handleClick={fethMorePlaylists} 
                nextPageToken={nextPageToken} 
                pendingMore={pendingMore} 
                btnName='Load more Playlist'
            />
        </SectionContainer>
    )
}