import { 
    useEffect, 
    useState 
} from "react";
import { 
    useNavigate, 
    useSearchParams 
} from "react-router-dom";
import { request } from "../../services";
import * as API from '../../const/youtube-api';
import { NotFound } from "../../components/not-found";
import { ChannelMain } from "../../components/channel-main";
import { 
    Channel, 
    Playlist, 
    Video 
} from "../../interfaces";
import { ChannelPageConatiner } from "./style";
import { Footer } from "../../components/footer";
import { ChannelMainSkeleton } from "../../components/channel-main-skeleton";
interface Videos {
    items: Video[], 
    nextPageToken?: string | null | undefined, 
    uploads: string | null | undefined,
}

interface Playlists {
    items: Playlist[],
    nextPageToken?: string | null | undefined,
}

export const ChannelPage = () => {
    const [error, setError] = useState<boolean>(false);
    const [videos, setVideos] = useState<Videos | null>(null);
    const [playlists, setPlaylists] = useState<Playlists | null>(null);
    const [channel, setChannel] = useState<Channel | null>(null);
    const [queries] = useSearchParams();
    const navigate = useNavigate();
    const channelId = queries.get('channelId');

    useEffect(() => {
        if (!channelId) {
            navigate('/');
        }
        let controller: AbortController | null = new AbortController();
    
        const fetchApi = async () => {
            try {
               
                const channelResponse = await request.get('channels',
                    { 
                    params : {
                        maxResults: API.MAXRESULTS.CHANNEL,
                        part: API.PART.CHANNEL,
                        id: channelId,
                        key:API.KEY,
                    },
                    signal: controller?.signal,
                    }
                );  

                const playlistsSectionResponse = await request.get('playlists',
                    { 
                        params : {
                            part: 'id,snippet,status,contentDetails',
                            channelId,
                            maxResults: '50',
                            key:API.KEY,
                        }
                    }
                )
                
                const videosSectionResponse = await request.get('playlistItems',
                    { 
                        params : {
                            part: 'id,snippet,status,contentDetails',
                            playlistId: channelResponse.data.items[0].contentDetails.relatedPlaylists.uploads ,
                            maxResults: '50',
                            key:API.KEY,
                            signal: controller?.signal,
                        }
                    }
                );
               

                const videosItems : Video[] = videosSectionResponse.data.items.map((itemVideo: Video) => {
				    
					return {
						...itemVideo,
						channel: channelResponse.data.items[0],
					}
				})
                setChannel(channelResponse.data.items[0]);
                setVideos({items: videosItems, nextPageToken: videosSectionResponse.data.nextPageToken, uploads: channelResponse.data.items[0].contentDetails.relatedPlaylists.uploads});
                setPlaylists({items: playlistsSectionResponse.data.items, nextPageToken: playlistsSectionResponse.data.nextPageToken})

                } catch (error: any) {
                    if (error) {
                        setError(true);
                    } 
                }
                controller = null;
            }
            setError(false);
            setVideos(null);
            setPlaylists(null);
            setChannel(null);
            fetchApi();
            return () => controller?.abort()
    }, [channelId])

    return (
       <ChannelPageConatiner>
            {   
                !error ? 
                    (<>
                    
                        {(channel && videos && playlists) ?
                        <ChannelMain 
                            channel={channel} 
                            videos={videos} 
                            playlists={playlists}
                            setVideos={setVideos}
                            setPlaylists={setPlaylists}
                        />
                        : <ChannelMainSkeleton/>}
                       <Footer/> 
                    </>)
                : <NotFound/>
            }
       </ChannelPageConatiner>
    )
}