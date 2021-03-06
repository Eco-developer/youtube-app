import { CategoryMain } from '../../components/category-main/index';
import { Footer } from '../../components/footer/index';
import { NotFound } from "../../components/not-found/index";
import { PageContainer } from "../../global-styles/style";
import { CategoryPageContainer } from "./style";
import { 
    useNavigate, 
    useSearchParams 
} from "react-router-dom";
import { 
    useEffect, 
    useState 
} from "react";
import { request } from "../../services";
import { Category, Channel, Video } from "../../interfaces";
import * as API from '../../const/youtube-api';

interface SetVideos {
    items: Video[] | null, 
    nextPageToken?: string | null | undefined, 
}

export const CategoryPage = () => {
    const [queries] = useSearchParams();
    const [error, setError] = useState<boolean>(false);
    const [category, setCategory] = useState<Category | null>(null);
    const [videos, setVideos] = useState<SetVideos | null>(null);
    const [images, setImages] = useState<Video[] | null>(null);
    const categoryId = queries.get('categoryId');
    const navigate = useNavigate();

    useEffect(() => {
        if (!categoryId) {
            navigate('/');
        }
        let controller: AbortController | null = new AbortController();

        const fetchApi = async () => {
            try {
                const categoryResponse = await request.get('videoCategories',
					{
						params : {
							maxResults: API.PART.VIDEOS,
							part: API.PART.CATEGORIES,
                            id: categoryId,
							key: API.KEY,
						}
					}
				)

                const videosResponse = await request.get('videos',
                        { 
                            params : {
                                maxResults: API.MAXRESULTS.VIDEOS,
                                part: API.PART.VIDEOS,
                                videoCategoryId: categoryId,
                                chart: API.CHART,
                                regionCode: API.REGIONCODE,
                                key: API.KEY,
                            },
                            signal: controller?.signal
                        }
                    );
                if(videosResponse.data.items.length < 10) {
                    setError(true);
                    return;
                }

                const channelsId : (string | undefined)[] = Array.from(new Set(videosResponse.data.items.map((item:Video) => item.snippet?.channelId)))

                const channelsResponse = await request.get('channels',
                    { 
                        params : {
                            maxResults: API.MAXRESULTS.CHANNEL,
                            part: API.PART.CHANNEL,
                            id: channelsId.join(','),
                            key:API.KEY,
                            
                        },
                        signal: controller?.signal,
                    }
                );
                const videosItems : Video[] = videosResponse.data.items.map((itemVideo: Video) => {
				    const channel = channelsResponse.data.items.find((itemChannel: Channel) => itemChannel.id === itemVideo.snippet?.channelId)
					return {
						...itemVideo,
						channel,
					}
				})

                setImages(videosResponse.data.items.filter((item: Video) => !!item.snippet.thumbnails.maxres).slice(0,6));
                setCategory(categoryResponse.data.items[0]);
                setVideos({items: videosItems, nextPageToken: videosResponse.data.nextPageToken });
                
            } catch (errorRes: any) {

                if (errorRes) {
                    setError(true);
                } 
            }
            controller = null;
        }
        setError(false);
        setImages(null);
        setCategory(null);
        setVideos(null);
        fetchApi();
        return () => controller?.abort()
    }, [categoryId])
   
    return (
       <PageContainer>
           {!error ? 
                (   
                    <CategoryPageContainer>
                        <CategoryMain 
                            images={images} 
                            category={category} 
                            videos={videos?.items || null} 
                            nextPageToken={videos?.nextPageToken || null}  
                            categoryId={categoryId}
                            setVideos={setVideos} 
                        />
                        <Footer/>
                    </CategoryPageContainer>
                )
           : <NotFound/>}
       </PageContainer>
    )
}
