import { Image } from '../image';
import { Footer } from '../footer';
import { Button } from '../button';
import { 
    Container, 
    Info, 
    Main, 
    MainContainer 
} from './style';
import { useNavigate } from 'react-router-dom';
import { notFound } from '../../const/images';
import { HOME } from '../../const/routes';

export const NotFound = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(HOME);
    }
  return (
    <Container>
        <MainContainer>
            <Main>
                <Image src={notFound} alt="notfound" width='270px' height={300} objectFit='contain'/>
                <Info>
                    <h2>Sorry this is not what you are looking for</h2>
                    <p>The page you are looking for might be removed or is temporarily unavailable</p>
                    <Button onClick={handleClick}>BACK TO HOMEPAGE</Button>
                </Info>
            </Main>
        </MainContainer>
        <Footer/>
    </Container>
  );
}

        
        
      