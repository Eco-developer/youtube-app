import {
    ImageWrapper,
    ImageContainer
} from './style';
import { icon } from '../../const/images';
export interface ImageProps {
    width: string;
    height: number;
    borderRadius?: string;
    src: string; 
    alt: string;
    onClick?: () => void,
}

export const Image = ({width, height, src, alt, borderRadius='0', onClick}: ImageProps) => (
    <ImageWrapper width={width} height={height} borderRadius={borderRadius}>
        <ImageContainer src={src} alt={alt} 
            onError={({ currentTarget }) => {
            currentTarget.onerror = null; 
            currentTarget.src=icon;
            }}
            onClick={onClick}
        />
    </ImageWrapper>
)