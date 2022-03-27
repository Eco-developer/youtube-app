import { NotFound } from "../../components/not-found/index";
import { VideosWrapper } from '../../components/videos-wrapper/index';
import { CarouselComponent } from "../../components/carousel/index";
import { PageContainer } from "../../global-styles/style";
import { 
    CategoryTittle, 
    CategoryContainer, 
    CarouselSkeleton
} from "./style";
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
import { Image } from "../../components/image";
import { icon } from "../../const/images";
import { Stack, Skeleton } from "@mui/material";

interface SetVideos {
    items: Video[] | null, 
}

export const CategoryPage = () => {
    const [queries] = useSearchParams();
    const [error, setError] = useState<boolean>(false);
    const [category, setCategory] = useState<Category | null>(null);
    const [videos, setVideos] = useState<SetVideos | null>(null);
    const [images, setImages] = useState<Video[] | null>(null);
    const categoryId = queries.get('categoryId');
    const navigate = useNavigate();
    console.log(category)
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
                console.log(videosResponse.data)
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
                setVideos({items: videosItems });
                
            } catch (error: any) {

                if (error.response.data.error.code) {
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
                    <CategoryContainer>
                        {   
                            images?.length ? 
                                <CarouselComponent images={images}/> 
                            :   <CarouselSkeleton width="100%" height={{xs: 300, sm: 400, md: 460}}>
                                    <Skeleton animation="wave" width='100%' variant="rectangular" />
                                </CarouselSkeleton>
                        }
                        { 
                            category ?
                                <CategoryTittle>
                                    <Image src={icon} borderRadius='50%' width='50px' height={50} alt='category-title'/>
                                    <h1>
                                        {category?.snippet.title}
                                    </h1>
                                </CategoryTittle>
                            :   <CategoryTittle>
                                    <Skeleton animation="wave" variant="circular" height={50} width={50} />
                                    <Skeleton animation="wave" width={200} height={30} />
                                </CategoryTittle>
                        }
                        <VideosWrapper videos={videos?.items || null}/>
                    </CategoryContainer>
                )
           : <NotFound/>}
       </PageContainer>
    )
}
