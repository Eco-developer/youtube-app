import { 
    InfoContainer, 
    SectionContainer,
    SectionLeftContainer, 
    SectionRightContainer 
} from "./style";
import { 
    ChannelStatistics, 
    BrandingSettings, 
} from "../../interfaces";

interface Props {
    statistics: ChannelStatistics,
    brandingSettings: BrandingSettings,
}

export const ChannelInfoSection = ({statistics, brandingSettings}: Props) => {
    return (
        <SectionContainer>
            <SectionLeftContainer>
                <InfoContainer>
                    <h4>
                        Description
                    </h4>
                    <p>
                        {brandingSettings.channel.description}
                    </p>
                </InfoContainer>
            </SectionLeftContainer>
            <SectionRightContainer>
            <InfoContainer>
                    <h4>
                        Statistics
                    </h4>
                    <p>
                        {statistics.subscriberCount} subscribers
                    </p>
                    <p>
                        {statistics.viewCount} views
                    </p>
                    <p>
                        {statistics.videoCount} videos
                    </p>
                </InfoContainer>
            </SectionRightContainer>
            
        </SectionContainer>
    )
}