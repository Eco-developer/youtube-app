export interface BrandingSettings {
    channel: {
        title: string,
        description: string,
        keywords: string,
        trackingAnalyticsAccountId: string,
        moderateComments: boolean,
        country: string,
    },
    image: {
        bannerExternalUrl: string,
    }
}