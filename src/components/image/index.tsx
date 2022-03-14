import {
    ImageWrapper,
    ImageContainer
} from './style';
import { ImageProps } from '../../interfaces';

export const Image = ({width, height, src, alt}: ImageProps) => (
    <ImageWrapper width={width} height={height}>
        <ImageContainer src={src} alt={alt}/>
    </ImageWrapper>
)