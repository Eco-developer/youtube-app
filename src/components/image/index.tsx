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
    objectFit?: string;
    objectPosition?: string;
    heightMid?: number;
    heightHigh?: number;
    onClick?: () => void,
}

export const Image = ({width, height, src, alt, borderRadius='0', objectFit='cover', objectPosition='center', heightMid, heightHigh, onClick}: ImageProps) => (
    <ImageWrapper 
        width={width} 
        height={height} 
        borderRadius={borderRadius} 
        objectFit={objectFit} 
        objectPosition={objectPosition} 
        heightMid={heightMid || height} 
        heightHigh={heightHigh || height}
    >
        <ImageContainer src={src} alt={alt} 
            onError={({ currentTarget }) => {
            currentTarget.onerror = null; 
            currentTarget.src=icon;
            }}
            onClick={onClick}
        />
    </ImageWrapper>
)