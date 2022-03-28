import { VideoContainer } from '../../components/video-container';
import { CommentsSection } from '../../components/comments-section';
import { VideosSideContainer } from '../../components/videos-side-container';
import { Footer } from '../../components/footer';
import { NotFound } from '../../components/not-found';
import { 
    VideoPageConatiner, 
    VideoMainSection,
    VideoSideSection,
    VideoPageWrapper
} from './style';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
    useEffect, 
    useState 
} from 'react';
import { request } from '../../services/index';
import {
    Video, 
    Comments 
} from '../../interfaces/index';
import * as API from '../../const/youtube-api';

export const VideoPage = () => {
    const [queries] = useSearchParams();
    const [video, setVideo] = useState<Video | null>(null);
    const [videos, setVideos] = useState<{items: Video[], nextPageToken: string | undefined | null, playlistId: string | undefined | null} | null>(null);
    const [comments, setComments] = useState<{items: Comments[], nextPageToken: string | undefined | null} | null>(null);
    const [error, setError] = useState<boolean>(false);
    const navigate = useNavigate();
    const videoId = queries.get('videoId');
    

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
                if (!videoResponse.data.items.length) {
                    setError(true);
                    return;
                }
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
                    
                const commetsRespose = await request.get('commentThreads',
                    { 
                        params : {
                            maxResults: API.MAXRESULTS.COMMENTS,
                            part: API.PART.COMMENTS,
                            videoId,
                            order: API.ORDER,
                            textFormat: API.TEXTFORMAT,
                            key: API.KEY,

                        },
                        signal: controller?.signal
                    }
                )
                
                const playlistsItems = await request.get('playlistItems',
                    { 
                        params : {
                            part: 'id,snippet,status,contentDetails',
                            playlistId: channelsResponse.data.items[0].contentDetails.relatedPlaylists.uploads,
                            maxResults: '50',
                            key:API.KEY,
                            signal: controller?.signal,
                        }
                    }
                );

                const currentVideo: Video = {
                    ...videoResponse.data.items[0],
                    channel: channelsResponse.data.items[0]
                }
                
                setVideo(currentVideo);
                setComments({items: commetsRespose.data.items, nextPageToken: commetsRespose.data.nextPageToken});
                setVideos({items: playlistsItems.data.items, nextPageToken: playlistsItems.data.nextPageToken, playlistId: channelsResponse.data.items[0].contentDetails.relatedPlaylists.uploads});
                
            } catch (errorRes : any) {
                if (errorRes) {
                    setError(true);
                } 
            }
            controller = null;
        }
        setError(false);
        setVideo(null);
        setComments(null);
        setVideos(null);
        fetchApi();
        return () => controller?.abort()
    }, [videoId])
    return (
        <VideoPageConatiner>
            {!error ?
                <>
                    <VideoPageWrapper>
                        <VideoMainSection>
                            <VideoContainer video={video}/>
                            <CommentsSection 
                                commentCount={video?.statistics?.commentCount}
                                videoId={videoId}
                                comments={comments?.items}
                                nextPageToken={comments?.nextPageToken}
                                setComments={setComments}
                            />
                        </VideoMainSection>
                        <VideoSideSection>
                            <VideosSideContainer 
                                videoId={videoId} 
                                videos={videos?.items || null}
                                nextPageToken={videos?.nextPageToken}
                                setVideos={setVideos}
                                playlistId={videos?.playlistId || null}
                            />
                        </VideoSideSection>
                    </VideoPageWrapper>
                    <Footer/>
                </>
                : <NotFound/>
            }
        </VideoPageConatiner>
    )
}

