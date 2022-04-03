import { VideosWrapper } from '../../components/videos-wrapper/index';
import { Footer } from '../../components/footer';
import { HomePageConatiner } from './style';
import { useAppSelector } from "../../hooks";
import { selectvideos } from "../../features/videos/videosSlice";

export const Home = () => {
    const videos = useAppSelector(selectvideos);
    return (
       <HomePageConatiner>
           <VideosWrapper videos={videos}/>
           <Footer/>
       </HomePageConatiner>
    )
}
