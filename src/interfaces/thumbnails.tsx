export interface Thumbnails {
    default: ThumbnailsProps,
    medium?: ThumbnailsProps,
    high?: ThumbnailsProps,
    maxres?: ThumbnailsProps,
    standard?: ThumbnailsProps,
} 
 interface ThumbnailsProps { 
    url: string,
    width: number,
    height: number,
}