import { VideoSkeleton } from '../video-card-skeleton/index';
import { VideoCard } from '../video-card';
import { VideosWrapperContainer } from './stlyle';
import { v4 as uuid } from 'uuid';
import { Video } from '../../interfaces';


interface VideosProps {
   videos: Video[] | null
}

export const VideosWrapper = ({videos}: VideosProps) =>{
    const skeletons = new Array(40).fill(null);
    console.log(skeletons)
    return (
        <VideosWrapperContainer>
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