import { VideosWrapper } from '../../components/videos-wrapper/index';
import { Footer } from '../../components/footer';
import { NotFound } from '../../components/not-found';
import { HomePageConatiner } from './style';
import { useAppSelector } from "../../hooks";
import { selectvideos } from "../../features/videos/videosSlice";
import { selectError } from '../../features/errorHomeSlice/errorHomeSlice';

export const Home = () => {
    const videos = useAppSelector(selectvideos);
    const error = useAppSelector(selectError);
    return (
       <HomePageConatiner>
           {!error ?
                <>
                    <VideosWrapper videos={videos}/>
                        <Footer/>
                </>
            : <NotFound/>}
       </HomePageConatiner>
    )
}
