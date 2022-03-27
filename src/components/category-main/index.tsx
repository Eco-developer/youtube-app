import { VideosWrapper } from '../../components/videos-wrapper/index';
import { Image } from '../image';
import { CarouselComponent } from '../carousel';
import { CircularProgress, Skeleton, Stack } from "@mui/material";
import {
    CategoryTittle, 
    CarouselSkeleton,
    MoreBtn
} from './style';
import { 
    Category, 
    Video 
} from "../../interfaces";
import { icon } from '../../const/images';
import * as API from '../../const/youtube-api';
import { Dispatch, SetStateAction, useState } from 'react';
import { request } from '../../services';

interface SetVideos {
    items: Video[] | null, 
    nextPageToken?: string | null | undefined, 
}

interface Props {
    images: Video[] | null,
    category: Category | null,
    videos: Video[] | null,
    nextPageToken: string | null,
    categoryId: string | null,
    setVideos: Dispatch<SetStateAction<SetVideos | null>>,
}

interface Videos {
    items: Video[]; 
    nextPageToken: string | null | undefined; 
    playlistId: string | null | undefined; 
}

export const CategoryMain = ({images, category, videos, nextPageToken, categoryId, setVideos}: Props) => {
    const [pendingMore, setPendingMore] = useState(false);

    const fethMoreVideos = async () => {
        if (!categoryId) {
            return;
        } 
        if (!nextPageToken) {
            return;
        }
        setPendingMore(true);
        try {
            const videosResponse = await request.get('videos',
                    { 
                        params : {
                            maxResults: API.MAXRESULTS.VIDEOS,
                            part: API.PART.VIDEOS,
                            videoCategoryId: categoryId,
                            chart: API.CHART,
                            regionCode: API.REGIONCODE,
                            key: API.KEY,
                            ...(nextPageToken ? { pageToken: nextPageToken } : {}),
                        }
                    }
                );
            setVideos((prevState: SetVideos | null) => ({items: [...(prevState?.items ? prevState.items : []), ...videosResponse.data.items], nextPageToken: videosResponse.data.nextPageToken || null, categoryId}))
        } catch (error) {
            console.log(error)
        }
        setPendingMore(false);
    } 
    return (
        <>
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
            <VideosWrapper videos={videos}/>
            {nextPageToken ?
                <Stack justifyContent="center" alignItems="center">
                    <MoreBtn onClick={fethMoreVideos}>
                        { pendingMore ? 
                            <CircularProgress size={20}/>
                            : "Load More Videos" }
                    </MoreBtn>
                </Stack>
            : null}
        </>
    )
}