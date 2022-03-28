import numeral from 'numeral';
import { Image } from "../image/index";
import { MenuBar } from '../menu-bar';
import { 
    ChannelBrandingContainer,
    ChannelProfileContainer,
    ChannelNameContainer,
} from "./style";
import { 
    Dispatch, 
    SetStateAction, 
} from "react";
import { logo } from "../../const/images";

interface Props {
    bannerExternalUrl?: string,
    tittle: string,
    channelAvatar: string,
    subscriberCount: string,
    setSection: Dispatch<SetStateAction<number>>,
}

export const ChannelBranding = ({bannerExternalUrl, channelAvatar, tittle, subscriberCount, setSection}: Props) => {
    return (
        <ChannelBrandingContainer>
            <Image src={bannerExternalUrl || logo} width='100%' height={300} alt='branding'/>
            <ChannelProfileContainer>
                <Image src={channelAvatar} width='70px' height={70} alt='avatar' borderRadius="50%"/>
                <ChannelNameContainer>
                    <h1>{tittle}</h1>
                    <p>{numeral(subscriberCount).format('0.00a')} subscribers</p>
                </ChannelNameContainer>
            </ChannelProfileContainer>
            <MenuBar setSection={setSection}/>
        </ChannelBrandingContainer>
    )
}