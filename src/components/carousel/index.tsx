import { Image } from '../image';
import { 
    CarouselContainer,
    CarouselInfo,
    InfoContainer, 
    TitleWrapper, 
    TitleContainer,
    DitailsContainer,
    WatchBtn   
} from './style';
import { Carousel } from 'react-responsive-carousel';
import { Video } from '../../interfaces';
import { v4 as uuid } from 'uuid';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useNavigate } from 'react-router-dom';
import { VIDEO } from '../../const/routes';


interface Props {
    images: Video[];
}

export const CarouselComponent = ({images}: Props) => {
    const navigate = useNavigate();
    return (
        <CarouselContainer>
            <Carousel
                showArrows={false}
                showStatus={false}
                showIndicators={true}
                infiniteLoop={true}
                showThumbs={false}
                useKeyboardArrows={false}
                autoPlay={true}
                stopOnHover={true}
                swipeable={true}
                dynamicHeight={true}
                emulateTouch={true}
                autoFocus={false}
                interval={3000}
            >
                {images.map((item: Video) => {
                    const handleClick = () => {
                        navigate(`${VIDEO}?videoId=${item.contentDetails?.videoId || item.id}`)
                    }
                    return ( 
                        <div key={uuid()}>
                            <Image 
                                width="100%" 
                                height={300} 
                                src={item.snippet.thumbnails.maxres?.url || item.snippet.thumbnails.default.url} 
                                alt='slider-thumnail' 
                                objectFit='cover' 
                                heightMid={400} 
                                heightHigh={460}
                            />  
                            <CarouselInfo onClick={handleClick} >
                                <InfoContainer>
                                    <TitleWrapper>
                                        <TitleContainer>
                                            <h3>
                                                {item.snippet.title}
                                            </h3>
                                        </TitleContainer>
                                        <DitailsContainer>
                                            <p>
                                                {item.snippet.channelTitle}
                                            </p>
                                        </DitailsContainer>
                                    </TitleWrapper>
                                    <WatchBtn>
                                        Watch
                                    </WatchBtn>
                                </InfoContainer>
                            </CarouselInfo>
                        </div>
                    )
                })
               }
                
            </Carousel>
        </CarouselContainer>
    )
}
