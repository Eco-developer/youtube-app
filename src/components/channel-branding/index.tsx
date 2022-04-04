import numeral from 'numeral';
import { Image } from "../image/index";
import { MenuBar } from '../menu-bar';
import { 
    ChannelBrandingContainer,
    ChannelProfileContainer,
    ChannelNameContainer,
    Banner,
} from "./style";
import { 
    Dispatch, 
    SetStateAction, 
} from "react";
import { logo } from "../../const/images";
import TextTruncate from 'react-text-truncate';

interface Props {
    bannerExternalUrl?: string,
    title: string,
    channelAvatar: string,
    subscriberCount: string,
    setSection: Dispatch<SetStateAction<number>>,
}

export const ChannelBranding = ({bannerExternalUrl, channelAvatar, title, subscriberCount, setSection}: Props) => {
    return (
        <ChannelBrandingContainer>
            <Banner src={bannerExternalUrl || logo}/>
            <ChannelProfileContainer>
                <Image 
                    src={channelAvatar}
                    width='70px' 
                    height={70} 
                    alt='avatar' 
                    borderRadius="50%" 
                />
                <ChannelNameContainer>
                    <TextTruncate
                        line={1}
                        element="h1"
                        truncateText="…"
                        text={title}
                    /> 
                    <p>{numeral(subscriberCount).format('0.00a')} subscribers</p>
                </ChannelNameContainer>
            </ChannelProfileContainer>
            <MenuBar setSection={setSection}/>
        </ChannelBrandingContainer>
    )
}