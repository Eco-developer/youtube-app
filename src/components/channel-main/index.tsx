import { ChannelBranding } from "../channel-branding";
import { ChannelVideosSection } from "../channel-videos-section";
import { ChannelPlaylistsSection } from "../channel-plylists-section";
import { ChannelMainContainer } from "./style";
import { 
    Dispatch, 
    SetStateAction, 
    useState 
} from "react";
import { 
    Channel, 
    Playlist, 
    Video 
} from "../../interfaces";

interface Videos {
    items: Video[], 
    nextPageToken?: string | null | undefined, 
    uploads: string | null | undefined,
}

interface Playlists {
    items: Playlist[],
    nextPageToken?: string | null | undefined,
}

interface Props {
    channel: Channel,
    videos: Videos,
    playlists: Playlists,
    setVideos: Dispatch<SetStateAction<Videos | null>>,
    setPlaylists:  Dispatch<SetStateAction<Playlists | null>>
}

export const ChannelMain = ({channel, videos, playlists, setVideos, setPlaylists}: Props) => {
    const [section, setSection] = useState<number>(0);
    const handleSections = () => {
        switch (section) {
            case 0:
                return (<div>inicio</div>);
            case 1:
                return (
                    <ChannelVideosSection 
                        videos={videos.items} 
                        nextPageToken={videos.nextPageToken} 
                        uploads={videos.uploads} 
                        setVideos={setVideos}
                    />
                );
            case 2: 
                return (
                    <ChannelPlaylistsSection 
                        playlists={playlists.items} 
                        nextPageToken={playlists.nextPageToken}
                        setPlaylists={setPlaylists}
                    />
                );
            case 3:
                return (<div>info</div>);
            default:
                return (<div>inicion</div>);
        }
    }
    return (
        <ChannelMainContainer>
            
            <ChannelBranding 
                bannerExternalUrl={channel.brandingSettings.image?.bannerExternalUrl} 
                tittle={channel.brandingSettings.channel.title}
                channelAvatar={channel.snippet.thumbnails.default.url}
                subscriberCount={channel.statistics.subscriberCount}
                setSection={setSection}
            />
            {handleSections()}
        </ChannelMainContainer>
    )
}