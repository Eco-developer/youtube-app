import { VideoContainer } from '../../components/video-container';
import { CommentsSection } from '../../components/comments-section';
import { 
    VideoPageConatiner, 
    VideoMainSection,
    VideoSideSection
} from './style';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
    useEffect, 
    useState 
} from 'react';
import { request } from '../../services/index';
import {
    Video, 
} from '../../interfaces/index';
import * as API from '../../const/youtube-api';

export const VideoPage = () => {
    const [queries] = useSearchParams();
    const [video, setVideo] = useState<Video | null>(null);
    const navigate = useNavigate();
    const videoId = queries.get('videoId');
    
    console.log(videoId);

    useEffect(() => {
        if (!videoId) {
            navigate('/');
        }
        let controller: AbortController | null = new AbortController();

        const fetchApi = async () => {
            try {
                const videoResponse = await request.get('videos',
                        { 
                            params : {
                                maxResults: API.MAXRESULTS.VIDEOS,
                                part: API.PART.VIDEOS,
                                id: videoId,
                                key: API.KEY,
                            },
                            signal: controller?.signal
                        }
                    );
                const channelsResponse = await request.get('channels',
                    { 
                        params : {
                            maxResults: API.MAXRESULTS.CHANNEL,
                            part: API.PART.CHANNEL,
                            id: videoResponse.data.items[0].snippet.channelId,
                            key:API.KEY,
                            
                        },
                        signal: controller?.signal,
                    }
                );
    
               /* const playlists = await request.get('playlists',
                { 
                    params : {
                    part: 'id,snippet,status',
                    channelId: videoResponse.data.items[0].snippet.channelId,
                    maxResults: '50',
                    key:API.KEY,
                }});
    
                const playlistsItems = await request.get('playlistItems',
                { 
                    params : {
                    part: 'id,snippet,status,contentDetails',
                    playlistId: channelsResponse.data.items[0].contentDetails.relatedPlaylists.uploads,
                    maxResults: '50',
                    key:API.KEY,
                }});
                
                console.log(playlists.data);
                console.log(playlistsItems.data)*/
    
                const currentVideo: Video = {
                    ...videoResponse.data.items[0],
                    channel: channelsResponse.data.items[0]
                }
    
                setVideo(currentVideo);
                
            } catch (error) {
                console.log(error);
            }
            controller = null;
        }

        fetchApi();
        return () => controller?.abort()
    }, [videoId])
    return (
        <VideoPageConatiner>
            <VideoMainSection>
                <VideoContainer video={video}/>
                <CommentsSection 
                    commentCount={video?.statistics?.commentCount}
                    videoId={videoId}
                />
            </VideoMainSection>
            <VideoSideSection>
                
            </VideoSideSection>
        </VideoPageConatiner>
    )
}

