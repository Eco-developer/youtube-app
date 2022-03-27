import { VideoSkeleton } from '../video-card-skeleton/index';
import { VideoCard } from '../video-card';
import { VideosWrapperContainer } from './stlyle';
import { v4 as uuid } from 'uuid';
import { Video } from '../../interfaces';
import { memo  } from 'react';


interface Props {
   videos: Video[] | null,
   display?: string;
   skeletonAmount?: number
}

const VideosWrapperBase = ({videos, display='grid', skeletonAmount=50}: Props) =>{
    const skeletons = new Array(skeletonAmount).fill(null);
    return (
        <VideosWrapperContainer display={display}>
            {videos?.length ?
                videos.map((video: Video) => (
                    <VideoCard video={video} key={uuid()}/>
                ))
            : skeletons.map((_:any) => (
                <VideoSkeleton key={uuid()}/>
            ))} 
            
        </VideosWrapperContainer>
    )
}

export const VideosWrapper = memo(VideosWrapperBase);