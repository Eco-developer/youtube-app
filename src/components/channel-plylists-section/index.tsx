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
import { KEY } from "../../const/youtube-api";
import { useSearchParams } from "react-router-dom";

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
                            part: 'id,snippet,status,contentDetails',
                            channelId,
                            maxResults: '50',
                            key: KEY,
                            ...(nextPageToken ? { pageToken: nextPageToken } : {}),
                        }
                    }
                )
            
            setPlaylists((prevState: Playlists | null) => ({items: [...(prevState?.items ? prevState.items : []), ...playlistsSectionResponse .data.items], nextPageToken: playlistsSectionResponse .data.nextPageToken || null}))
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