import { VideosWrapper } from '../../components/videos-wrapper/index';
import { HomePageConatiner } from './style';
import { useAppSelector } from "../../hooks";
import { selectvideos } from "../../features/videos/videosSlice";


export const Home = () => {
    const videos = useAppSelector(selectvideos);
    console.log(videos);
    return (
       <HomePageConatiner>
           <VideosWrapper videos={videos}/>
       </HomePageConatiner>
    )
}
