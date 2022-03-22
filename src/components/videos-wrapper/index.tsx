import { VideoSkeleton } from '../video-card-skeleton/index';
import { VideoCard } from '../video-card';
import { VideosWrapperContainer } from './stlyle';
import { v4 as uuid } from 'uuid';
import { Video } from '../../interfaces';


interface Props {
   videos: Video[] | null,
   display?: string;
}

export const VideosWrapper = ({videos, display='grid'}: Props) =>{
    const skeletons = new Array(40).fill(null);
    console.log(skeletons)
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