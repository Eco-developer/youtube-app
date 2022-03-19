export interface Thumbnails {
    default: ThumbnailsProps,
    medium?: ThumbnailsProps,
    high?: ThumbnailsProps
} 

interface ThumbnailsProps { 
    url: string,
    width: number,
    height: number,
}