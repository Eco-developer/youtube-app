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
    Comments,
    Playlist
} from '../../interfaces/index';
import * as API from '../../const/youtube-api';
import { VideoPlaylist } from '../../components/video-playlist';

export const VideoPage = () => {
    const [queries] = useSearchParams();
    const [video, setVideo] = useState<Video | null>(null);
    const [videos, setVideos] = useState<{items: Video[], nextPageToken: string | undefined | null, playlistId: string | undefined | null} | null>(null);
    const [comments, setComments] = useState<{items: Comments[], nextPageToken: string | undefined | null} | null>(null);
    const [playlistItems, setPlaylistItems] = useState<{items: Video[], nextPageToken: string | undefined | null, playlistId: string | undefined | null, playlistData: Playlist | undefined } | null>(null);
    const [error, setError] = useState<boolean>(false);
    const navigate = useNavigate();
    const videoId = queries.get('videoId');
    const playlistId = queries.get('playlistId');

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
                
                const relatedVideosResponse = await request.get('playlistItems',
                    { 
                        params : {
                            part: API.PART.PLAYLISTITEMS,
                            playlistId: channelsResponse.data.items[0].contentDetails.relatedPlaylists.uploads,
                            maxResults: API.MAXRESULTS.PLAYLISTITEMS,
                            key:API.KEY,
                           
                        }, 
                        signal: controller?.signal,
                    }
                );

                if (playlistId && !playlistItems) {
                    const playlistItemsResponse = await request.get('playlistItems',
                        { 
                            params : {
                                part: API.PART.PLAYLISTITEMS,
                                playlistId,
                                maxResults: API.MAXRESULTS.PLAYLISTITEMS,
                                key:API.KEY,
                                
                            },
                            signal: controller?.signal,
                        }
                    );
                    const playlistResponse = await request.get('playlists',
                        { 
                            params : {
                                part: API.PART.PLAYLIST,
                                id: playlistId,
                                maxResults: '1',
                                key: API.KEY,
                            }
                        }
                    )

                    setPlaylistItems({items: playlistItemsResponse.data.items, nextPageToken: playlistItemsResponse.data.nextPageToken, playlistId, playlistData: playlistResponse.data.items[0]});
                }

                const currentVideo: Video = {
                    ...videoResponse.data.items[0],
                    channel: channelsResponse.data.items[0]
                }
                setVideo(currentVideo);
                setComments({items: commetsRespose.data.items, nextPageToken: commetsRespose.data.nextPageToken});
                setVideos({items: relatedVideosResponse.data.items, nextPageToken: relatedVideosResponse.data.nextPageToken, playlistId: channelsResponse.data.items[0].contentDetails.relatedPlaylists.uploads});
                
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
        setPlaylistItems(null);
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
                            {playlistId ?
                                <VideoPlaylist
                                    playlist={playlistItems?.items || null}
                                    nextPageToken={playlistItems?.nextPageToken}
                                    setPlaylistItems={setPlaylistItems}
                                    playlistId={playlistId}
                                    playlistData={playlistItems?.playlistData}
                                />
                            : null}
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

