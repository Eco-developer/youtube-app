import { PageContainer } from '../../global-styles/style';
import { useSearchParams } from 'react-router-dom';

export const VideoPage = () => {
    const [queries]= useSearchParams();
    console.log(queries.get('videoId'));
    return (
        <PageContainer>
            video
        </PageContainer>
    )
}