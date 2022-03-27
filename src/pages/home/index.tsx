import { VideosWrapper } from '../../components/videos-wrapper/index';
import { PageContainer } from "../../global-styles/style";
import { useAppSelector } from "../../hooks";
import { selectvideos } from "../../features/videos/videosSlice";


export const Home = () => {
    const videos = useAppSelector(selectvideos);
    return (
       <PageContainer>
           <VideosWrapper videos={videos}/>
       </PageContainer>
    )
}
